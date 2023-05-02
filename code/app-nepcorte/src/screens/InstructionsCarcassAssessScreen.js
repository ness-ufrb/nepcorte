import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, ScrollView } from "react-native";
import { COLORS } from "../constant/colors";
import Header from "../components/Header";
import InstructionsForm from "../components/InstructionsForm";

const InstructionsCarcassAssessScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header code="Avaliar carcaça" navigation={navigation}/>
            <View style={{paddingTop: "10%"}}/>
            <ScrollView>
                <InstructionsForm route="Carcass" navigation={navigation} nextRoute="Camera"/>
            </ScrollView> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.screenBackgroungColor,
        width: "100%",
        height: "100%",
    },
})

export default InstructionsCarcassAssessScreen;