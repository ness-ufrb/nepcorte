import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font'; 
import { COLORS } from "../constant/colors";
import IconChecked from "../assets/icons/checked.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '../components/Header';
import { fontSizes } from "../constant/fontSizes";
import TriageFeedbackScreen from "../components/TriageFeedbackScreen";

const SuccessAnimalScreen = ({ navigation, nextRoute }) => {

    const code = 'A12G3'; //Este código deve ser passado pela tela anterior ou ser buscado no reducer da triagem

    return (
        <SafeAreaView style={styles.container}>
            <Header code={code} navigation={navigation} />
            <View style={styles.elementsContainerStyle}>
                <TriageFeedbackScreen 
                    navigation={navigation}
                    nextRoute="IdentifyAnimal"
                    icon={<IconChecked width={200} height={200}/>}
                    text="O animal A12G3 está pronto para o abate!"
                />
            </View>
        </SafeAreaView>
    )
};

SuccessAnimalScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    textStyle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: fontSizes.descriptionTextSize,
        color: COLORS.black,
        textAlign: "center",
        marginBottom: 30,
        marginTop: 30,
        width: 300,
        paddingHorizontal: 30,
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
    elementsContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SuccessAnimalScreen;