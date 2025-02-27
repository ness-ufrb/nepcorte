import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../constant/colors";
import { fontSizes } from "../constant/fontSizes";
import Header from "./Header";
import IconCancel from "../assets/icons/cancel.svg"

const ProblemAnalysis = ({ navigation, nextRoute, title }) => {
    return (
        <>
            <Header code={title} navigation={navigation} notHasReturn={true}/>
            <View style={{paddingTop: "15%"}}/>
            <IconCancel width={200} height={200}/>
            <Text style={styles.textStyle}>Oops... Não conseguimos enviar a foto para análise.</Text>
            <TouchableOpacity
                onPress={() => {navigation.navigate(nextRoute)}}
                style={styles.buttonNextStyle}
            >
                <Text style={styles.textButtonNextStyle}>Tentar novamente</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonExitStyle}
                onPress={() => {navigation.navigate("Assess")}}
            >
                <Text style={styles.textButtonExitStyle}>Finalizar</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: fontSizes.descriptionTextSize,
        color: COLORS.black,
        textAlign: "center",
        marginBottom: 30,
        marginTop: 30,
        width: "90%",
        paddingHorizontal: 20,
    },
    buttonExitStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonNextStyle: {
        height: 60,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        color: COLORS.main,
        borderRadius: 10,
        shadowColor: COLORS.black,
        borderColor: COLORS.main,
        borderWidth: 3,
        backgroundColor: COLORS.main,
        marginBottom: 15,
    },
    textButtonNextStyle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 20,
        color: "#fff",
        textAlign: "center",
    },
    textButtonExitStyle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 15,
        color: COLORS.main,
        textAlign: "center",
    },
});

export default ProblemAnalysis;