import nepcorteServer from "../../api/nepcorteServer"
import { useContext } from "react"
import { Context as AuthContext } from "../UserContext/Context"
import { AnimalEndPoint } from "../../api/nepcorteServer"
import Toast from "react-native-toast-message"

const setCode = dispatch => {
    return (code)=>{
        dispatch({ type: 'SET_CODE', payload: code })
    }
}

const setSituation = dispatch => {
    return (situation)=>{
        dispatch({ type: 'SET_SITUATION', payload: situation })
    }
}

const setSpecies = dispatch => {
    return (specie)=>{
        dispatch({ type: 'SET_SPECIES', payload: specie })
    }
}

const setRace = dispatch => {
    return (race)=>{
        dispatch({ type: 'SET_RACE', payload: race })
    }
}

const setReproductiveSituation = dispatch => {
    return (reproductiveSituation)=>{
        dispatch({ type: 'SET_REPRODUTIVE_SITUATION', payload: reproductiveSituation })
    }
}

const setAge = dispatch => {
    return (age)=>{
        dispatch({ type: 'SET_AGE', payload: age })
    }
}

const setTeeth = dispatch => {
    return (teeth)=>{
        dispatch({ type: 'SET_TEETH', payload: teeth })
    }
}

const setRandomCode = dispatch => {
    return () => {
        dispatch({ type: 'GENERATE_RANDOM_CODE'})
    }
}

const createAnimal = dispatch => {
    const { state } = useContext(AuthContext);
    const { token } = state
    
    return async (animal, navigation, race, reproductiveSituation, age, teeth) => {
        const {code, situation, species} = animal
      
            animalToSend = {
                code,
                age,
                teeth,
                race,
                reproductiveSituation,
                species,
                situation,
            };
        
        console.log(animalToSend)
        try {
            console.log('Tentando criar o animal...');
            await nepcorteServer.post(
                AnimalEndPoint, 
                animalToSend, 
                { headers: {Authorization: `Bearer ${token}`} }
            );
            if (navigation) {
                state.situation === "Apto para abate" ? navigation.navigate("SuccessAnimal")
                    : navigation.navigate("ProblemAnimal"); 
            }
            
            console.log('Animal criado com sucesso:');
        } catch (e) {
            if (navigation) {
                navigation.navigate("IdentifyAnimal")
            }
            Toast.show({
                type: 'error',
                text1: `Ocorreu um problema`,
                text2: 'O animal não foi criado',
            });
            
        }
    }
}

//export all Actions
export { 
        setCode, setSituation, 
        setSpecies, setRace, 
        setReproductiveSituation, 
        setAge, setRandomCode,
        setTeeth, createAnimal
}