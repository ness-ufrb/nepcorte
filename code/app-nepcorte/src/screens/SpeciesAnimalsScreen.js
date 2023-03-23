import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../constant/colors";
import { useFonts } from 'expo-font'; 
import IconPig from "../assets/icons/019-pig.svg"
import IconLamb from "../assets/icons/031-lamb.svg"
import IconGoat from "../assets/icons/043-goat.svg"
import IconBeef from "../assets/icons/025-beef.svg"
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonSpeciesAnimals from "../components/ButtonSpeciesAnimals";
import ProgressStep from '../components/ProgressSteps';

const SpeciesAnimalsScreen = ({ navigation }) => {

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
            <ProgressStep/>
            <View style={styles.containerText}>
                <Text style={styles.title}>Informe a espécie do animal</Text>
            </View>
            <View style={styles.containerButtons}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(route="DetailsAnimal");
                    }}
                    style={styles.buttonStyle}>
                    <IconBeef width={80} height={90} fill={COLORS.black}/>
                    <View style={styles.buttonIconSeparatorStyle} />
                    <Text style={styles.buttonTextStyle}>Bovino</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={console.log("Caprino")}
                    style={styles.buttonStyle}>
                    <IconGoat width={70} height={90} fill={COLORS.black}/>
                    <View style={styles.buttonIconSeparatorStyle} />
                    <Text style={styles.buttonTextStyle}>Caprino</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerButtons}>
                <TouchableOpacity
                    onPress={console.log("Ovino")}
                    style={styles.buttonStyle}>
                    <IconLamb width={75} height={90} fill={COLORS.black}/>
                    <View style={styles.buttonIconSeparatorStyle} />
                    <Text style={styles.buttonTextStyle}>Ovino</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={console.log("Suíno")}
                    style={styles.buttonStyle}>
                    <IconPig width={85} height={90} fill={COLORS.black}/>
                    <View style={styles.buttonIconSeparatorStyle} />
                    <Text style={styles.buttonTextStyle}>Suíno</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    containerText: {
        alignItems: "center",
        width: "85%",
        marginTop: 80,
    },
    title: {
        paddingBottom: 10,
        fontFamily: 'Inter-Bold',
        fontSize: 20,
        color: COLORS.black,
    },
    containerButtons: {
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
        height: 150,
        width: "90%",
    },
    buttonStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 90,
        width: 135,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        margin: 5, 
        shadowColor: COLORS.black,
        elevation: 3,
    },
    buttonIconSeparatorStyle: {
        backgroundColor: COLORS.background,
        width: 135,
        height: 1,
    },
    buttonTextStyle: {
        fontFamily: 'Inter-Light',
        textAlign: 'center',
        paddingTop: 4,
        height: 40,
        width: 135,
        fontSize: 22,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        color: COLORS.black,
        backgroundColor: '#FFFFFF',
        shadowColor: COLORS.black,
        elevation: 3,
    },
});

export default SpeciesAnimalsScreen;