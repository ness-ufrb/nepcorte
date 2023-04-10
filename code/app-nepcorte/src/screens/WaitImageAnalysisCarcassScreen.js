import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { COLORS } from "../constant/colors";
import WaitImage from "../components/WaitImage";

// Esta tela depende do envio da imagem para o backend, falta implementar a rota caso sucesso ou caso erro.
// O mesmo para WaitImageAnalysisRackScreen.js

const WaitImageAnalysisCarcassScreen = ({ navigation }) => {

    setTimeout(() => {
        navigation.navigate("SuccessAnalysisCarcass");
    }, 5000);

    return (
        <SafeAreaView style={styles.container}>
            <WaitImage title="Avaliar carcaça"/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.screenBackgroungColor,
        width: "100%",
        height: "100%",
    },
});

export default WaitImageAnalysisCarcassScreen;
