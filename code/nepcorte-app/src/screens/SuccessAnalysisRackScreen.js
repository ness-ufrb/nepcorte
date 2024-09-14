import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { COLORS } from "../constant/colors";
import SuccessAnalysis from "../components/SuccessAnalysis";

const SuccessAnalysisRackScreen = ({ navigation }) => {
    let code = "A12G3";
    return (
        <SafeAreaView style={styles.container}>
            <SuccessAnalysis 
                title="Avaliar carré" 
                nextRoute="RackAssess" 
                navigation={navigation} 
                code="A12G3" 
                textDescription={`A foto do carré do animal ${code} foi enviada para análise e o resultado estará disponível em breve.`} 
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