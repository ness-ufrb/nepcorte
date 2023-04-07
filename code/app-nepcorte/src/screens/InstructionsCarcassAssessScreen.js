import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../constant/colors";
import Header from "../components/Header";
import InstructionsForm from "../components/InstructionsForm";

const InstructionsCarcassAssessScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header code="Avaliar carcaça" navigation={navigation}/>
            <View style={{paddingTop: "20%"}}/>
            <InstructionsForm navigation={navigation} nextRoute="Camera"/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.screenBackgroungColor,
        width: "100%",
        height: "100%",
        flexDirection: 'column',
    },
})

export default InstructionsCarcassAssessScreen;