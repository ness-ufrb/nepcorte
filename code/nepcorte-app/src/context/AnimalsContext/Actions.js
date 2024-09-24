import { useContext } from "react";
import { Context as AuthContext } from "../UserContext/Context";
import nepcorteServer from "../../api/nepcorteServer";
import { AnimalEndPoint, ReviewEndPoint } from "../../api/nepcorteServer";
// Actions.js
const SetAnimalTerm = dispatch => {
    return (term) => {
        dispatch({ type: 'SET_ANIMAL_TERM', payload: term });
    };
};

const SetLoading = dispatch => {
    return (loading) => {
        dispatch({ type: 'SET_LOADING', payload: loading });
    };
};

const SetLoadingMore = dispatch => {
    return (loadingMore) => {
        dispatch({ type: 'SET_LOADING_MORE', payload: loadingMore });
    };
};

const SetPage = dispatch => {
    return (page) => {
        dispatch({ type: 'SET_PAGE', payload: page });
    };
};

const SetHasMore = dispatch => {
    return (hasMore) => {
        dispatch({ type: 'SET_HAS_MORE', payload: hasMore });
    };
};

const SetRefreshing = dispatch => {
    return (refreshing) => {
        dispatch({ type: 'SET_REFRESHING', payload: refreshing})
    }
}

const GetAnimals = dispatch => {
    const { state } = useContext(AuthContext);
    const { token } = state
    return async (search = '', endPoint, page, reset = false) => {
        try {
            console.log(`endPoint: ${endPoint}\nsearch: ${search}\npage: ${page}`);
            
            const response = await nepcorteServer.get(
                `${endPoint}?search=${search}&page=${page}`, 
                { headers: { Authorization: `Bearer ${token}`} }
            );

            const hasMorePages = response.data.next !== null;
            const results = response.data.results;

            // hasMorePages VAI RECEBER TRUE CASO HAJA MAIS PAGINAS OU FALSO CASO next(page) seja null
            dispatch({ type: 'SET_HAS_MORE', payload: hasMorePages });

            //LOGICA PRA DEFINIR OS ANIMAIS
            if (endPoint === AnimalEndPoint) {
                if (reset) {
                    dispatch({ type: 'RESET_ANIMALS', payload: results });
                } else {
                    dispatch({ type: 'GET_ANIMALS', payload: results });
                }
            //LOGICA PRA DEFINIR AS ANALISES
            } else if (endPoint === ReviewEndPoint) {
                if (reset) {
                    dispatch({ type: 'RESET_ANALYSIS_RESULTS', payload: results });
                } else {
                    dispatch({ type: 'SET_ANALYSIS_RESULTS', payload: results });
                }
            }

            // se hasMorePages for true adiciona mais uma pagina
            if (hasMorePages) {
                dispatch({ type: 'SET_PAGE', payload: page + 1 });
            }
            
        } catch (e) {
            console.error(e);
        }
    };
};


const SetReviewSearchTerm = dispatch => {
    return term => {
        dispatch({ type: 'SET_REVIEW_TERM', payload: term})
    }
}

export { GetAnimals, SetAnimalTerm, SetLoading, SetLoadingMore, SetPage, SetHasMore, SetRefreshing, SetReviewSearchTerm };
