import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../constant/colors";
import { fontSizes } from "../constant/fontSizes";
import Header from "./Header";
import IconChecked from "../assets/icons/checked.svg"

const SuccessAnalysis = ({ navigation, nextRoute, title, textDescription, textButton }) => {
    return (
        <>
            <Header code={title} navigation={navigation} notHasReturn={true}/>
            <View style={{paddingTop: "15%"}}/>
            <IconChecked width={200} height={200}/>
            <Text style={styles.textStyle}>{textDescription}</Text>
            <TouchableOpacity
                onPress={() => {navigation.navigate(nextRoute)}}
                style={styles.buttonNextStyle}
            >
                <Text style={styles.textButtonNextStyle}>{textButton}</Text>
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

export default SuccessAnalysis;