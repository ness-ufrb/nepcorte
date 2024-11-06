import nepcorteServer, { ReviewEndPoint, UploadFileEndPoint } from "../../api/nepcorteServer";
import { useContext } from "react";
import { Context as AuthContext } from "../UserContext/Context";

// Ações para manipular o estado do contexto
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

const SetAnimalCode = dispatch => {
    return (animalCode) => {
        dispatch({ type: 'SET_ANIMAL_CODE', payload: animalCode });
    };
};

const CreateAssess = dispatch => {
    const { state } = useContext(AuthContext); 
    const { token } = state; 

    return async(assess, navigation, goodScreen, wrongScreen) => {
        try {
            const { animal_id, file, type_result } = assess;

            //criação da análise
            analysis = await nepcorteServer.post(
                ReviewEndPoint,
                { animal_id, type_result },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            //preparando o arquivo de imagem
            const formData = new FormData();
            formData.append('analysis_id', analysis.data.id);

            const fileBlob = {
                uri: file, 
                type: file.type || 'image/jpeg', 
                name: `photo-${animal_id}-analise_${analysis.data.id}.jpg`, 
            };
            
            formData.append('file', fileBlob); 

            //enviando o arquivo de imagem para o banco de dados
            await nepcorteServer.post(
                UploadFileEndPoint,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data', 
                    },
                }
            );
            
            //navega pra tela de sucesso
            if (navigation) {
                navigation.navigate(goodScreen);
            }

        } catch (e) {
            
            //navega pra tela de erro
            if (navigation) {
                navigation.navigate(wrongScreen);
            }
        }
    };
};

export { SetAnimalId, SetType, SetFile, CreateAssess, SetAnimalCode };
