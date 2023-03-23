import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font'; 
import { COLORS } from "../constant/colors";
import IconChecked from "../assets/icons/checked.svg";
import { SafeAreaView } from "react-native-safe-area-context";

const SuccessAnimalScreen = ({ navigation }) => {

    const [fontsLoaded] = useFonts({
        'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
        'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
        'Inter-Light': require('../assets/fonts/Inter-Light.ttf')
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <IconChecked width={200} height={200}/>
            <Text style={styles.textStyle}>O animal A12G3 está pronto para o abate!</Text>
            <TouchableOpacity
                onPress={() => {navigation.navigate(route="IdentifyAnimal")}}
                style={styles.buttonNextStyle}
            >
                <Text style={styles.textButtonNextStyle}>Próximo Animal</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonExitStyle}
                onPress={() => {console.log("End!")}}
            >
                <Text style={styles.textButtonExitStyle}>Sair</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    textStyle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 15,
        color: COLORS.black,
        textAlign: "center",
        marginBottom: 30,
        marginTop: 30,
        width: "60%",
    },
    buttonExitStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonNextStyle: {
        height: 50,
        width: "70%",
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

export default SuccessAnimalScreen;