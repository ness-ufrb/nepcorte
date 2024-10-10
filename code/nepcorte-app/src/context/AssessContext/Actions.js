import nepcorteServer, { ReviewEndPoint } from "../../api/nepcorteServer";
import { useContext } from "react";
import { Context as AuthContext } from "../UserContext/Context";

// Funções para manipular o estado do contexto
const SetAnimalId = dispatch => {
    return (animal_id) => {
        dispatch({ type: 'SET_ANIMAL_ID', payload: animal_id });
    };
};

const SetAnalysisId = dispatch => {
    return (analysis_id) => {
        dispatch({ type: 'SET_ANALYSIS_ID', payload: analysis_id });
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

            analysis = await nepcorteServer.post(
                ReviewEndPoint,
                { animal_id, type_result },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            const formData = new FormData();
            formData.append('analysis_id', analysis.data.id);

            // Certifique-se de que o arquivo seja um Blob ou File
            const fileBlob = {
                uri: file, // O caminho do arquivo no dispositivo
                type: file.type || 'image/jpeg', // Certifique-se de especificar o tipo MIME
                name: `photo-${animal_id}-${parseInt(Math.random() * 100000)}.jpg`, // Dê um nome ao arquivo
            };
            
            formData.append('file', fileBlob); // Adiciona o arquivo ao FormData

            // Enviar a imagem e o animal_id usando multipart/form-data
            await nepcorteServer.post(
                '/api/review/upload-file/',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data', // Cabeçalho adequado para upload de arquivos
                    },
                }
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

export { SetAnimalId, SetType, SetFile, CreateAssess, SetAnimalCode, SetAnalysisId };
