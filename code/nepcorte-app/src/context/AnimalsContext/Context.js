// Context.js
import createDataContext from '../createDataContext';
import Reducer from './Reducer';
import { GetAnimals, SetAnimalTerm, SetLoading, SetLoadingMore, SetPage, SetHasMore, SetRefreshing, SetReviewSearchTerm} from './Actions'; 

const initialState = { 
    animals: [],
    analysis_result: [],
    animalSearchTerm: '',
    reviewSearchTerm: '',
    loading: false,
    loadingMore: false,
    hasMore: true,
    page: 1,
    refreshing: false,
};

export const { Context, Provider } = createDataContext(
    Reducer,
    { GetAnimals, SetAnimalTerm, SetLoading, SetLoadingMore, SetPage, SetHasMore, SetRefreshing, SetReviewSearchTerm },
    initialState
);
