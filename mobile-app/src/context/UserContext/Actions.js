import AsyncStorage from "@react-native-async-storage/async-storage";
import nepcorteServer from "../../api/nepcorteServer";
import Toast from "react-native-toast-message";
import { RegisterEndPoint, ApiUserTokenEndPoint, SendEmailEndPoint, ResetPasswordEndPoint, UserEndpoint } from "../../api/nepcorteServer";

const Register = (dispatch) => {
    return async (username, email, password, navigation) => {
        try {

            dispatch({type: 'SET_LOADING', payload: true}) 
            // Requisição de registro de usuário
            const { data: user } = await nepcorteServer.post(RegisterEndPoint, {
                name: username,
                email: email,
                password: password
            });

            dispatch({type: 'SET_LOADING', payload: false}) 

            // Alerta de sucesso
            Toast.show({
                type: 'success',
                text1: `Usuário ${user.name} cadastrado`,
                text2: 'Você já pode entrar na sua conta!',
            });

            // Navega pra tela de login em caso de sucesso
            if (navigation) {
                navigation.navigate('Login');
            }
          
        } catch (error) {
            dispatch({type: 'SET_LOADING', payload: false}) 
            // Verifica e avisa se o erro é relacionado ao e-mail já registrado 
            if (error.response && error.response.data.email) {

              Toast.show({
                type: 'error',
                text1: 'Erro no cadastro',
                text2: 'este e-mail ja foi cadastrado', 
              });
        
            } else {
                dispatch({type: 'SET_LOADING', payload: false}) 
                // Avisa outro erro não relacionado ao e-mail
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao criar a conta',
                    text2: 'Ocorreu um erro. Tente novamente mais tarde.',
                });
            }
        }
    };
};


const Login = (dispatch) => {
    return async (email, password) => {
        try {
            //requisição para obter o token e refresh token apartir do email e senha
            dispatch({type: 'SET_LOADING', payload: true}) 
            const res = await nepcorteServer.post(ApiUserTokenEndPoint, {
                email,
                password,
            });
            dispatch({type: 'SET_LOADING', payload: false}) 
            //colocando ambos no async storage
            await AsyncStorage.setItem('accessToken', res.data.access);
            await AsyncStorage.setItem('refreshToken', res.data.refresh);

            //definindo que o usuario agora esta autenticado (sai da tela de login e entra no app)
            dispatch({ type: 'IS_AUTHENTICATED', payload: true });

        } catch (e) {
            dispatch({type: 'SET_LOADING', payload: false}) 
            //avisa do erro na tentativa de login ao usuario
            Toast.show({
                type: 'error',
                text1: `Ocorreu um problema`,
                text2: 'verifique os caracteres e tente novamente!',
            });
        }
    };
};

const Logout = (dispatch) => {
    return async () => {
        try {
            //remover o token de autenticação do AsyncStorage
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');

            //atualizamos o estado de autenticado (usuario vai para tela de login)
            dispatch({ type: 'IS_AUTHENTICATED', payload: false });
            
        } catch (e) {
            dispatch({type: 'SET_LOADING', payload: false}) 
            //avisamos de um possivel erro ao sair da conta
            console.log("Erro ao tentar sair da conta", e);
            Toast.show({
                type: 'error',
                text1: `Tivemos um problema`,
                text2: 'tente novamente mais tarde.'
            });
        }
    };
};

//action para settar se o usuario ta autenticado (importante pra "FirstScreen")
const SetAuthenticated = (dispatch) => {
    return (auth) => {
        dispatch({ type: 'IS_AUTHENTICATED', payload: auth });
    };
};

const SendEmailToken = dispatch => {
    return async (email, navigation) => {
        try{
            //requisição pra envio de email
            dispatch({type: 'SET_LOADING', payload: true}) 
            await nepcorteServer.post(SendEmailEndPoint, { email })
            dispatch({type: 'SET_LOADING', payload: false}) 

            //caso o email esteja cadastrado passa pra proxima tela
            if(navigation){
                navigation.navigate('ChangePassword')
            }
            //aviso de sucesso ao enviar o email
            Toast.show({
                type: 'success',
                text1: `E-mail enviado.`,
                text2: 'cheque sua caixa de entrada para obter o código'
            });
        }
        catch(e){
            dispatch({type: 'SET_LOADING', payload: false}) 
            //erro ao enviar o email
            console.log('REPONSE DATA: ', e.response?.data)
            const erro = e.response?.data?.email || 'Tivemos um problema'
            Toast.show({
                type: 'error',
                text1: `E-mail não enviado.`,
                text2: `${erro}`
            });
        }
    }
}

const ChangePassword = dispatch => {
    return async (token, new_password, confirm_password, navigation) => {
        try {
            //requisiçao pra mudar de senha
            dispatch({type: 'SET_LOADING', payload: true}) 
            await nepcorteServer.post(ResetPasswordEndPoint, { token, new_password, confirm_password });
            dispatch({type: 'SET_LOADING', payload: false}) 

            //informa o sucesso e navega pra tela de login
            Toast.show({
                type: 'success',
                text1: 'Senha alterada com sucesso.',
                text2: 'Você já pode entrar na sua conta com a nova senha.'
            });
            if (navigation) {
                navigation.navigate('Login');
            }

        } catch (e) {
            dispatch({type: 'SET_LOADING', payload: false}) 
            //define se o erro é especifico ou generico e mostra ao usuário.
            const errorMessage = e.response?.data?.non_field_errors?.[0] || 'Tivemos um problema ao alterar sua senha';
            
            Toast.show({
                type: 'error',
                text1: 'Ocorreu um problema.',
                text2: errorMessage
            });
        }
    }
}

const GetUser = dispatch => {
    return async () => {
        try {
            //requisição pra obter as informações do usuario.
            const token = await AsyncStorage.getItem('accessToken');
            
            // remove o usuário do contexto se não houver token
            if (!token) {
                dispatch({ type: 'SET_USER', payload: null }); 
                return;
            }
            
            // obtem as informações do usuário
            const userRes = await nepcorteServer.get(UserEndpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // define o usuário no contexto
            dispatch({ type: 'SET_USER', payload: userRes.data });

        } catch (error) {
           
            console.error("Erro ao inicializar usuário:", error);
            dispatch({ type: 'SET_USER', payload: null }); 
        }
    };
}

const UserEdit = dispatch => {
    return async (name, email, password, currentEmail) => {

        // Envia para a requisição apenas as variaveis com valores
        const newData = {};
        if (name) newData.name = name;
        if (email && email !== currentEmail) newData.email = email;
        if (password) newData.password = password;

        try{
            const token = await AsyncStorage.getItem('accessToken');

            //requisição pra editar o usuario
            dispatch({type: 'SET_LOADING', payload: true}) 
            const response = await nepcorteServer.patch('/api/user/me/', newData, {headers: {Authorization: `Bearer ${token}`}})  
            dispatch({type: 'SET_LOADING', payload: false}) 

            dispatch({ type: 'SET_USER', payload: response.data });

            // Atualiza o estado do usuário no contexto com os dados retornados
            Toast.show({
                type: 'success',
                text1: 'Usuário atualizado.',
                text2: 'suas credênciais foram alteradas!'
            });

        }catch(e){
            dispatch({type: 'SET_LOADING', payload: false}) 
            console.log("Erro ao atualizar usuário:", e.response?.data || e.message);
            console.log('mensagem ', e.message)
            Toast.show({
                type: 'error',
                text1: 'Ocorreu um problema.',
                text2: `${e.response.data.email ? 'este e-mail já está em uso' : 'verifique os caracteres e tente novamente'}`
            });
        }
    }
}

export { 
    Login, Logout, SetAuthenticated, 
    Register, SendEmailToken, ChangePassword, 
    GetUser, UserEdit
};
