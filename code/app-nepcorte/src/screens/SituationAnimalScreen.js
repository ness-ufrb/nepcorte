import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import Card from '../components/Card';
import Header from '../components/Header';
import { COLORS } from '../constant/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontSizes } from "../constant/fontSizes";
import ProgressStep from '../components/ProgressSteps';
import IconCheck from "../assets/icons/005-check.svg"
import IconPlus from "../assets/icons/024-plus.svg"
import IconClose from "../assets/icons/006-close.svg"
import { useSelector } from 'react-redux';

const SituationAnimalScreen = ({ navigation }) => {
    const sortingState = useSelector((state) => state.sorting.value);
    console.log(sortingState);

    return (
        <SafeAreaView style={styles.container}>
            <Header code={sortingState.code} navigation={navigation} />
            <View style={styles.progressStepStyle}>
                <ProgressStep navigation={navigation} screen={"SituationAnimal"} />
            </View>
            <ScrollView centerContent={true} contentContainerStyle={styles.contentContainerScrollView}>
                <Text style={styles.text}>Informe a situação do animal</Text>
                <Card mainText="Apto para abate" secText="O animal está em perfeito estado"
                    icon={<IconCheck width={90} height={90} fill={COLORS.green} />}
                    navigation={navigation}
                    nextRoute="SpeciesAnimals"
                />
                <Card mainText="Doente ou machucado" secText="Sem condições para abate" icon={<IconPlus width={90} height={90} fill={COLORS.red} />}
                    navigation={navigation}
                    nextRoute="SpeciesAnimals"
                />
                <Card mainText="Animal está no lote errado" secText="Animal deve ser realocado" icon={<IconClose width={90} height={90} fill={COLORS.orange} />}
                    navigation={navigation}
                    nextRoute="SpeciesAnimals"
                />
            </ScrollView>
        </SafeAreaView>
    )
};

SituationAnimalScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({
    contentContainerScrollView: {
        flexGrow: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        // height: '100%',
        // marginTop: "10%",
        paddingTop: 30
    },
    text: {
        fontFamily: 'Inter-Bold',
        fontSize: fontSizes.titleTextSize,
        color: COLORS.black,
        marginBottom: 10,
    },
    container: {
        backgroundColor: COLORS.screenBackgroungColor,
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    progressStepStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -50,
    },
});

export default SituationAnimalScreen;
