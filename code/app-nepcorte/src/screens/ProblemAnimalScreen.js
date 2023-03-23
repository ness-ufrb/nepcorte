import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font'; 
import { COLORS } from "../constant/colors";
import IconWarning from "../assets/icons/warning.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '../components/Header';
import { fontSizes } from "../constant/fontSizes";
import TriageFeedbackScreen from "../components/TriageFeedbackScreen";

const ProblemAnimalScreen = ({ navigation, nextRoute }) => {

    const code = 'A12G3'; //Este código deve ser passado pela tela anterior ou ser buscado no reducer da triagem

    return (
        <SafeAreaView style={styles.container}>
            <Header code={code} navigation={navigation} />
            <View style={styles.elementsContainerStyle}>
                <TriageFeedbackScreen 
                    navigation={navigation}
                    nextRoute="IdentifyAnimal"
                    icon={<IconWarning width={200} height={200}/>}
                    text="O animal A12G3 foi registrado.
                            Retire A12G3 da fila para o abate."
                />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    elementsContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProblemAnimalScreen;