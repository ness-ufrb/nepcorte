import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../constant/colors";
import IconPig from "../assets/icons/019-pig.svg"
import IconLamb from "../assets/icons/031-lamb.svg"
import IconGoat from "../assets/icons/043-goat.svg"
import IconBeef from "../assets/icons/025-beef.svg"
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonSpeciesAnimals from "../components/ButtonSpeciesAnimals";
import ProgressStep from '../components/ProgressSteps';

const SpeciesAnimalsScreen = ({ navigation, nextRoute }) => {

    const code = 'A12G3'; //Este código deve ser passado pela tela anterior ou ser buscado no reducer da triagem

    return (
        <SafeAreaView style={styles.container}>
            <Header code={code} navigation={navigation} />
            <View style={styles.progressStepStyle}>
                <ProgressStep />
            </View>
            <View style={styles.containerText}>
                <Text style={styles.title}>Informe a espécie do animal</Text>
            </View>
            <View style={styles.containerButtons}>
                <ButtonSpeciesAnimals 
                    navigation = {navigation}
                    nextRoute="DetailsAnimal"
                    icon={<IconBeef width={80} height={89} fill={COLORS.black}/>}
                    title="Bovino"
                />
                <ButtonSpeciesAnimals 
                    navigation = {navigation}
                    nextRoute="DetailsAnimal"
                    icon={<IconGoat width={80} height={89} fill={COLORS.black}/>}
                    title="Caprino"
                />
                {/* <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(nextRoute="DetailsAnimal");
                    }}
                    style={styles.buttonStyle}>
                    <IconBeef width={80} height={90} fill={COLORS.black}/>
                    <View style={styles.buttonIconSeparatorStyle} />
                    <Text style={styles.buttonTextStyle}>Bovino</Text>
                </TouchableOpacity> */}
                {/* <TouchableOpacity
                    onPress={console.log("Caprino")}
                    style={styles.buttonStyle}>
                    <IconGoat width={70} height={90} fill={COLORS.black}/>
                    <View style={styles.buttonIconSeparatorStyle} />
                    <Text style={styles.buttonTextStyle}>Caprino</Text>
                </TouchableOpacity> */}
            </View>
            <View style={styles.containerButtons}>
                <ButtonSpeciesAnimals 
                    navigation = {navigation}
                    nextRoute="DetailsAnimal"
                    icon={<IconLamb width={80} height={89} fill={COLORS.black}/>}
                    title="Ovino"
                />
                <ButtonSpeciesAnimals 
                    navigation = {navigation}
                    nextRoute="DetailsAnimal"
                    icon={<IconPig width={80} height={89} fill={COLORS.black}/>}
                    title="Suíno"
                />
                {/* <TouchableOpacity
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
                </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    );
};

SpeciesAnimalsScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({
    container: {
        zIndex: 4,
        flex: 1,
        backgroundColor: COLORS.screenBackgroungColor,
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    containerText: {
        alignItems: "center",
        width: "85%",
        marginTop: 70,
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
    progressStepStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -50,
    },
});

export default SpeciesAnimalsScreen;