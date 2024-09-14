import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constant/colors';
import IconPig from "../assets/icons/019-pig.svg"
import IconLamb from "../assets/icons/031-lamb.svg"
import IconGoat from "../assets/icons/043-goat.svg"
import IconBeef from "../assets/icons/025-beef.svg"
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonSpeciesAnimals from "../components/ButtonSpeciesAnimals";
import ProgressStep from '../components/ProgressSteps';
import { Context as SortingContext } from '../context/SortingContext/Context';

const SpeciesAnimalsScreen = ({ navigation }) => {
    const {state} = useContext(SortingContext)
    console.log(state);
   
    return (
        <SafeAreaView style={styles.container}>
            <Header code={state.code} navigation={navigation} />
            <View style={styles.progressStepStyle}>
                <ProgressStep navigation={navigation} screen={"SpeciesAnimal"}/>
            </View>
            <View style={styles.containerForm}>
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
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 4,
        backgroundColor: COLORS.screenBackgroungColor,
        width: "100%",
        height: "100%",
    },
    containerForm: {
        alignItems: "center",
    },
    containerText: {
        alignItems: "center",
        width: "85%",
        marginTop: 30,
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