import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, StyleSheet } from "react-native";
import IconUnderConstruction from "../assets/icons/under-construction.svg";
import { COLORS } from "../constant/colors";
import { fontSizes } from "../constant/fontSizes";
import Header from "../components/Header";

const FeatureConstruction = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header code="Conta" navigation={navigation}/>
            <View style={styles.form}>
                <IconUnderConstruction width={200} height={200} fill={COLORS.black}/>
                <Text style={styles.text}>Esta feature está em construção</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.screenBackgroungColor,
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: fontSizes.descriptionTextSize, 
        color: COLORS.black, 
        fontFamily: 'Inter-SemiBold', 
        textAlign: 'center' ,
        paddingTop: 20,
    },
});

export default FeatureConstruction;
