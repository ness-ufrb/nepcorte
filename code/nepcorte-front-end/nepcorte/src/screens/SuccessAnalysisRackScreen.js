import React, {useContext} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { COLORS } from "../constant/colors";
import SuccessAnalysis from "../components/SuccessAnalysis";
import { Context as AssessContext } from "../context/AssessContext/Context";
const SuccessAnalysisRackScreen = ({ navigation }) => {
    const { state } = useContext(AssessContext)
    return (
        <SafeAreaView style={styles.container}>
            <SuccessAnalysis 
                title="Avaliar carré" 
                nextRoute="RackAssess" 
                navigation={navigation} 
                code="A12G3" 
                textDescription={`A foto do carré do animal ${state.animal_code} foi enviada para análise e o resultado estará disponível em breve.`} 
                textButton="Avaliar outro carré"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.screenBackgroungColor,
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
});

export default SuccessAnalysisRackScreen;