import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import nepcorteServer, { saveToken } from "../../api/nepcorteServer";

const SetEmail = (dispatch) => {
    return (email) => {
        dispatch({ type: 'SET_EMAIL', payload: email });
    };
};

const SetPassword = (dispatch) => {
    return (password) => {
        dispatch({ type: 'SET_PASSWORD', payload: password });
    };
};

const Login = (dispatch) => {
    return async (email, password, navigation) => {
        try {
            const res = await nepcorteServer.post(`/api/user/token/`, {
                email,
                password,
            });

            // Salvar o token de acesso e refresh token no AsyncStorage
            
            await AsyncStorage.setItem('accessToken', res.data.access);
            await AsyncStorage.setItem('refreshToken', res.data.refresh);

            // Atualizar o estado global
            dispatch({ type: 'IS_AUTHENTICATED', payload: true });
            dispatch({ type: 'SET_TOKEN', payload: res.data.access });
            dispatch({ type: 'SET_USER', payload: email });

            // Alerta de sucesso
            Alert.alert('Parabéns', 'Você logou com sucesso', [{ text: 'OK' }]);
            
        } catch (e) {
            Alert.alert('Erro', 'Credenciais inválidas', [{ text: 'OK' }]);
            console.log(e);
        }
    };
};


const Logout = (dispatch) => {
    return async (navigation) => {
        try {
            // Remover o token de autenticação do AsyncStorage
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');

            // Atualizar o estado global
            dispatch({ type: 'IS_AUTHENTICATED', payload: false });

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


export { SetEmail, SetPassword, Login, Logout, SetAuthenticated };
