import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Endpoints
const AnimalEndPoint = '/api/animal/';
const ReviewEndPoint = '/api/review/analysis_result/';

// Configuração do servidor com base no sistema operacional
const server = Platform.OS === 'ios'
    ? 'http://192.168.1.102:8000' : 'http://172.30.80.1:8000';

// Criar instância do Axios
const nepcorteServer = axios.create({
    baseURL: server
});

// Função para obter o token de acesso e refresh token do AsyncStorage
const getTokens = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    return { accessToken, refreshToken };
};

// Função para salvar os tokens no AsyncStorage
const saveTokens = async (accessToken, refreshToken) => {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
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

// Interceptor de resposta: Tenta fazer o refresh token ao receber um erro 401
nepcorteServer.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const { refreshToken } = await getTokens();
            // Fazer requisição para obter novo token usando o refresh token
            const response = await nepcorteServer.post('/api/user/token/refresh/', {
                refresh: refreshToken
            });
            const newAccessToken = response.data.access;
            const newRefreshToken = response.data.refresh;
            // Salvar os novos tokens
            await saveTokens(newAccessToken, newRefreshToken);
            // Atualizar a requisição original com o novo token e refazê-la
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return nepcorteServer(originalRequest); // Refaz a requisição original
        } catch (refreshError) {
            console.log("Erro ao fazer refresh token", refreshError);
            // Aqui você pode redirecionar o usuário para a tela de login ou deslogá-lo
        }
    }
    return Promise.reject(error);
});

export default nepcorteServer;
export { AnimalEndPoint, ReviewEndPoint };
