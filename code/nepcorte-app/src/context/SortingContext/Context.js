import createDataContext from '../createDataContext';
import Reducer from './Reducer';
import { 
        setCode, setSituation, 
        setSpecies, setRace, 
        setReproductiveSituation, 
        setAge, setRandomCode,
        createAnimal

} from './Actions'; // Actions from Sorting.

// Initial States from Sorting.
const initialState = { 
    code: '',
    situation: '',
    species: '',
    race: '',
    reproductiveSituation: '',
    age: 0
};

export const { Context, Provider } = createDataContext(
    Reducer,
    {   
        setCode, setSituation, 
        setSpecies, setRace, 
        setReproductiveSituation,  
        setAge, setRandomCode,
        createAnimal
    },
    initialState
);