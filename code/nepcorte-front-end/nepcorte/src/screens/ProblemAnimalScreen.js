import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../constant/colors";
import IconWarning from "../assets/icons/warning.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '../components/Header';
import TriageFeedbackScreen from "../components/TriageFeedbackScreen";
import { Context as SortingContext } from "../context/SortingContext/Context";

const ProblemAnimalScreen = ({ navigation, nextRoute }) => {
    const { state } = useContext(SortingContext)
    console.log(state);

    return (
        <SafeAreaView style={styles.container}>
            <Header code={state.code} navigation={navigation} />
            <View style={styles.elementsContainerStyle}>
                <TriageFeedbackScreen 
                    navigation={navigation}
                    nextRoute="IdentifyAnimal"
                    icon={<IconWarning width={200} height={200}/>}
                    text={`O animal ${state.code} foi registrado. Retire ${state.code} da fila para o abate.`}
                />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.screenBackgroungColor,
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