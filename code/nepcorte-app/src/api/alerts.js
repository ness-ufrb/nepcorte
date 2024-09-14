import { Alert } from "react-native";

function showError(msg){
    Alert.alert('Ops ocorreu um problema', `Mensagem ${msg}`)
}
function showSuccess(msg){
    Alert.alert('Ops ocorreu um problema', `Mensagem ${msg}`)
}

export { showError, showSuccess}