const SetAnimalId = dispatch => {
    return (animal_id)=>{
        dispatch({ type: 'SET_ANIMAL_ID', payload: animal_id})
    }
}

const SetType = dispatch => {
    return (type)=>{
        dispatch({ type: 'SET_TYPE', payload: type})
    }
}

const SetFile = dispatch => {
    return (file)=>{
        dispatch({ type: 'SET_FILE', payload: file})
    }
}


export { SetAnimalId, SetType, SetFile }