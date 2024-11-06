import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import nepcorteServer from "../../api/nepcorteServer";
import Toast from "react-native-toast-message";


const SetEmail = (dispatch) => {
    return (email) => {
        dispatch({ type: 'SET_EMAIL', payload: email });
    };
};

const Register = () => {
    return async (username, email, password, navigation) => {
        try {
            const { data: user } = await nepcorteServer.post('/api/user/', {
                name: username,
                email: email,
                password: password
            });

            Toast.show({
                type: 'success',
                text1: `Usuário ${user.name} cadastrado`,
                text2: 'Você já pode entrar na sua conta!',
               
            });

           
            if (navigation) {
                navigation.navigate('Login');
            }
          
        } catch (error) {
            if (error.response && error.response.data.email) {
              // Verifica se o erro é relacionado ao e-mail já registrado
              Toast.show({
                type: 'error',
                text1: 'Erro no cadastro',
                text2: 'este e-mail ja foi cadastrado', 
              });
            } else {
              // Outro erro não relacionado ao e-mail
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

            const res = await nepcorteServer.post(`/api/user/token/`, {
                email,
                password,
            });
            
            await AsyncStorage.setItem('accessToken', res.data.access);
            await AsyncStorage.setItem('refreshToken', res.data.refresh);

            dispatch({ type: 'IS_AUTHENTICATED', payload: true });

        } catch (e) {
            
            Toast.show({
                type: 'error',
                text1: `Ocorreu um problema`,
                text2: 'verifique os caracteres e tente novamente!',
                
            });

            console.log(e);
        }
    };
};

const Logout = (dispatch) => {
    return async () => {
        try {
            // Remover o token de autenticação do AsyncStorage
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');

            // Atualizar o estado global
            dispatch({ type: 'IS_AUTHENTICATED', payload: false });
            Toast.show({
                type: 'success',
                text1: `Logout realizado`,
                text2: 'agora você pode entrar em outra conta...'
            });
        } catch (e) {
            console.log("Erro ao tentar deslogar", e);
        }
    };
};

const SetAuthenticated = (dispatch) => {
    return (auth) => {
        dispatch({ type: 'IS_AUTHENTICATED', payload: auth });
    };
};

const SendEmailToken = dispatch => {
    return async (email, navigation) => {
        try{

            await nepcorteServer.post('/api/user/send_email/', { email })

            if(navigation){
                navigation.navigate('ChangePassword')
            }
            Toast.show({
                type: 'success',
                text1: `E-mail enviado.`,
                text2: 'cheque sua caixa de entrada para obter o código'
            });
        }
        catch(e){
         
            Toast.show({
                type: 'error',
                text1: `E-mail não enviado.`,
                text2: `${email} ainda não foi cadastrado`
            });
        }
    }
}

const ChangePassword = dispatch => {
    return async (token, new_password, confirm_password, navigation) => {
        try {
            await nepcorteServer.post('/api/user/reset_password/', { token, new_password, confirm_password });
            Toast.show({
                type: 'success',
                text1: 'Senha alterada com sucesso.',
                text2: 'Você já pode entrar na sua conta com a nova senha.'
            });
            if (navigation) {
                navigation.navigate('Login');
            }
        } catch (e) {
            const errorMessage = e.response?.data?.non_field_errors?.[0] || 'Tivemos um problema ao alterar sua senha';
            console.log(e);
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
            const token = await AsyncStorage.getItem('accessToken');
            
            if (!token) {
                console.log("Token não encontrado, usuário precisa fazer login.");
                dispatch({ type: 'SET_USER', payload: null }); // Remove o usuário do contexto se não houver token
                return;
            }
            console.log('TOKEN DO USUARIO NO ASYNCSTORAGE: ', token)
            // Obtem as informações do usuário
            const userRes = await nepcorteServer.get('/api/user/me/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Define o usuário no contexto
            dispatch({ type: 'SET_USER', payload: userRes.data });

        } catch (error) {
            console.error("Erro ao inicializar usuário:", error);
            dispatch({ type: 'SET_USER', payload: null }); // Se houver erro, garante que o estado de usuário seja resetado
        }
    };
}

export { SetEmail, Login, Logout, SetAuthenticated, Register, SendEmailToken, ChangePassword, GetUser };
