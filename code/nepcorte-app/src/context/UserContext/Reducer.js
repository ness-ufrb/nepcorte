export default function Reducer(state, action){
    switch(action.type){
        case 'SET_EMAIL':
            return {...state, email: action.payload}
        case 'SET_PASSWORD':
            return {...state, password: action.payload}
        case 'SET_TOKEN':
            return {...state, token: action.payload}
        case 'SET_USER':
            return {...state, user: action.payload}
        case 'IS_AUTHENTICATED':
            return {...state, isAuthenticated: action.payload}
        default:
            return state
    }
}