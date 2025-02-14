export default function Reducer(state, action){
    switch (action.type){
        case 'SET_CODE':
            return {...state, code: action.payload}
        
        case 'SET_SITUATION':
            return {...state, situation: action.payload}

        case 'SET_SPECIES':
            return {...state, species: action.payload}

        case 'SET_RACE':
            return {...state, race: action.payload}

        case 'SET_REPRODUTIVE_SITUATION':
            return {...state, reproductiveSituation: action.payload}

        case 'SET_AGE':
            return {...state, age: action.payload}

        case 'SET_TOOTH':
            return {...state, tooth: action.payload}

        case 'GENERATE_RANDOM_CODE':
            const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let result = '';
            for (let i = 0; i < 6; i++) {
                result += chars[Math.floor(Math.random() * chars.length)];
            }
            return {...state, code: result}

        default:
            return state
    }
}