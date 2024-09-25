import nepcorteServer, { ReviewEndPoint } from "../../api/nepcorteServer";
import { useContext } from "react";
import { Context as AuthContext } from "../UserContext/Context";
import { readAsStringAsync, EncodingType } from 'expo-file-system';

// Funções para manipular o estado do contexto
const SetAnimalId = dispatch => {
    return (animal_id) => {
        dispatch({ type: 'SET_ANIMAL_ID', payload: animal_id });
    };
};

const SetType = dispatch => {
    return (type) => {
        dispatch({ type: 'SET_TYPE', payload: type });
    };
};

const SetFile = dispatch => {
    return (file) => {
        dispatch({ type: 'SET_FILE', payload: file });
    };
};

// Função principal CreateAssess
const convertImageToBase64 = async (imageUri) => {
    const base64 = await readAsStringAsync(imageUri, {
        encoding: EncodingType.Base64,
    });
    return `data:image/png;base64,${base64}`; // Prefixo necessário para o backend reconhecer como imagem
};

const CreateAssess = dispatch => {
    const { state } = useContext(AuthContext); 
    const { token } = state; 

    return async(assess, navigation, goodScreen, wrongScreen) => {
        try {
            const { animal_id, type_result, file } = assess;

            const base64Image = await convertImageToBase64(file);
            console.log("\n\n\nNavigation", navigation, "\nScreens:", goodScreen, " ",wrongScreen)
            // Envio da imagem como Base64
            await nepcorteServer.post(
                '/api/review/upload-file/',
                {
                    animal_id,
                    file: base64Image, // Enviando a imagem como Base64
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json', // Use JSON para Base64
                    },
                }
            );

            const response = await nepcorteServer.post(
                ReviewEndPoint,
                { animal_id, type_result },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (navigation) {
                navigation.navigate(goodScreen);
            }

        } catch (e) {
            console.error('Error details:', e.response ? e.response.data : e.message);
            if (navigation) {
                navigation.navigate(wrongScreen);
            }
        }
    };
};

export { SetAnimalId, SetType, SetFile, CreateAssess };
