import createDataContext from '../createDataContext';
import Reducer from './Reducer';
import { SetAnimalId, SetType, SetFile, CreateAssess, SetAnimalCode, SetAnalysisId } from './Actions';

initialState = {
    type_result: '',
    animal_id: '',
    analysis_id:'',
    animal_code:'',
    file:'',
}

export const { Context, Provider } = createDataContext(
    Reducer,
    { SetAnimalId, SetType, SetFile, CreateAssess, SetAnimalCode, SetAnalysisId },
    initialState
);