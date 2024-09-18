export default function Reducer(state, action){
    switch (action.type){
        case 'SET_TYPE':
            return {...state, type_result: action.payload}
        case 'SET_ANIMAL_ID':
            return {...state, animal_id: action.payload}
        case 'SET_FILE':
            return {...state, file: action.payload}
        default:
            return state
    }
}