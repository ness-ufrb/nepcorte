import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { COLORS } from "../constant/colors";
import ProblemAnalysis from "../components/ProblemAnalysis";

const ProblemAnalysisRackScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ProblemAnalysis title="Avaliar carré" nextRoute="RackAssess" navigation={navigation}/>
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

export default ProblemAnalysisRackScreen;