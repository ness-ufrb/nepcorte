import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../constant/colors";
import IconChecked from "../assets/icons/checked.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '../components/Header';
import TriageFeedbackScreen from "../components/TriageFeedbackScreen";
import { useSelector } from "react-redux";

const SuccessAnimalScreen = ({ navigation, nextRoute }) => {
    const sortingState = useSelector((state) => state.sorting.value);
    console.log(sortingState);

    return (
        <SafeAreaView style={styles.container}>
            <Header code={sortingState.code} navigation={navigation} />
            <View style={styles.elementsContainerStyle}>
                <TriageFeedbackScreen 
                    navigation={navigation}
                    nextRoute="IdentifyAnimal"
                    icon={<IconChecked width={200} height={200}/>}
                    text={`O animal ${sortingState.code} está pronto para o abate!`}
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

export default SuccessAnimalScreen;