import createDataContext from '../createDataContext';
import Reducer from './Reducer';
import { SetAnimalId, SetType, SetFile } from './Actions';
initialState = {
    type_result: '',
    animal_id: '',
    file:'',
}

export const { Context, Provider } = createDataContext(
    Reducer,
    { SetAnimalId, SetType, SetFile },
    initialState
);