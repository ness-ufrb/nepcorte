import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { COLORS } from "../constant/colors";
import SuccessAnalysis from "../components/SuccessAnalysis";

const SuccessAnalysisCarcassScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <SuccessAnalysis title="Avaliar carcaça" nextRoute="CarcassAssess" navigation={navigation} code="A12G3"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.screenBackgroungColor,
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
});

export default SuccessAnalysisCarcassScreen;