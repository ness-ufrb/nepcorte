
// Reducer.js
export default function Reducer(state, action) {
    switch(action.type) {
        case 'SET_ANIMAL_TERM':
            return { ...state, animalSearchTerm: action.payload };

        case 'GET_ANIMALS':
            return { ...state, animals: [...state.animals, ...action.payload] };

        case 'RESET_ANIMALS':
            return { ...state, animals: action.payload };

        case 'SET_LOADING':
            return { ...state, loading: action.payload };

        case 'SET_LOADING_MORE':
            return { ...state, loadingMore: action.payload };

        case 'SET_PAGE':
            return { ...state, page: action.payload };

        case 'SET_END_LIST':
            return { ...state, endList: action.payload };
        
        case 'SET_HAS_MORE':
            return {...state, hasMore: action.payload};
           
        case 'SET_REFRESHING':
            return {...state, refreshing: action.payload}

        // Especificos pra review
        case 'SET_REVIEW_TERM':
            return { ...state, reviewSearchTerm: action.payload };

        case 'SET_ANALYSIS_RESULTS':
            return { ...state, analysis_result: [...state.analysis_result, ...action.payload]};

        case 'RESET_ANALYSIS_RESULTS':
            return { ...state, analysis_result: action.payload };
        
        default:
            return state;
    }
}


