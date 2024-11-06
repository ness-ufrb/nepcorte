import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Endpoints
const AnimalEndPoint = '/api/animal/';
const ReviewEndPoint = '/api/review/analysis_result/';
const UploadFileEndPoint = '/api/review/upload-file/';

// Criar instância do Axios
const nepcorteServer = axios.create({
    baseURL: 'http://192.168.1.117:8000',  // Use a variável `server` para maior flexibilidade
});

// Função para obter o token de acesso e refresh token do AsyncStorage
const getTokens = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    console.log("Tokens obtidos:", { accessToken, refreshToken }); 
    return { accessToken, refreshToken };
};


// Função para salvar os tokens no AsyncStorage
const saveTokens = async (accessToken, refreshToken = null) => {
    if (accessToken) {
        await AsyncStorage.setItem('accessToken', accessToken);
    }
    if (refreshToken) {  // Salva apenas se o refreshToken estiver presente
        await AsyncStorage.setItem('refreshToken', refreshToken);
    }
};

// Lista para manter as requisições que aguardam o refresh do token
const refreshAndRetryQueue = [];

// Flag para evitar múltiplas requisições de refresh simultâneas
let isRefreshing = false;

// Função para fazer o refresh do access token
const refreshAccessToken = async () => {
    const { refreshToken } = await getTokens(); // Buscar o refreshToken do AsyncStorage
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    // Fazer a requisição para obter um novo accessToken usando o refreshToken
    const response = await nepcorteServer.post('/api/user/token/refresh/', {
        refresh: refreshToken
    });

    const newAccessToken = response.data.access;

    // Atualiza apenas o accessToken; refreshToken só será atualizado se o backend fornecer um novo
    await saveTokens(newAccessToken);

    return newAccessToken;
};

// Interceptor de requisição: Adiciona o token de acesso a cada requisição
nepcorteServer.interceptors.request.use(async (config) => {
    const { accessToken } = await getTokens();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

nepcorteServer.interceptors.response.use((response) => {
    return response; // Retorna a resposta se for bem-sucedida
}, async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;  // Define que a requisição já foi tentada

        if (!isRefreshing) {
            isRefreshing = true;
            try {
                const newAccessToken = await refreshAccessToken();
                console.log('Novo token obtido:', newAccessToken);

                // Atualiza o header da requisição original com o novo token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Tenta novamente todas as requisições na fila com o novo token
                refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
                    nepcorteServer.request(config)
                        .then((response) => resolve(response))
                        .catch((err) => reject(err));
                });

                refreshAndRetryQueue.length = 0; // Limpa a fila de requisições pendentes

                return nepcorteServer(originalRequest); // Reenvia a requisição original
            } catch (refreshError) {
                console.error("Erro ao fazer refresh token", refreshError);
                throw refreshError;
            } finally {
                isRefreshing = false;
            }
        }

        // Adiciona a requisição original à fila de espera
        return new Promise((resolve, reject) => {
            refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
        });
    }

    // Se o erro não for 401 ou não puder ser resolvido, retorna a rejeição original
    return Promise.reject(error);
});


export default nepcorteServer;
export { AnimalEndPoint, ReviewEndPoint, UploadFileEndPoint, saveTokens, getTokens };
