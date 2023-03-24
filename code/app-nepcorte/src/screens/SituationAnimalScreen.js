import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import Card from '../components/Card';
import Header from '../components/Header';
import { icons } from '../constant/icons';
import { COLORS } from '../constant/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontSizes } from "../constant/fontSizes";
import ProgressStep from '../components/ProgressSteps';
import { useDispatch, useSelector } from 'react-redux';

const SituationAnimalScreen = ({ navigation }) => {
    const sortingState = useSelector((state) => state.sorting.value);
    console.log(sortingState);

    return (
        <SafeAreaView style={styles.container}>
            <Header code={sortingState.code} navigation={navigation} />
            <View style={styles.progressStepStyle}>
                <ProgressStep />
            </View>
            <ScrollView centerContent={true} contentContainerStyle={styles.contentContainerScrollView}>
                <Text style={styles.text}>Informe a situação do animal</Text>
                <Card mainText="Apto para abate" secText="O animal está em perfeito estado" icon={icons.check005} iconColor={COLORS.green} 
                navigation = {navigation}
                nextRoute="SpeciesAnimals"/>
                <Card mainText="Doente ou machucado" secText="Sem condições para abate" icon={icons.plus024} iconColor={COLORS.red} />
                <Card mainText="Animal está no lote errado" secText="Animal deve ser realocado" icon={icons.close006} iconColor={COLORS.orange} />
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
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        marginTop: 40,
    },
    text: {
        fontFamily: 'Inter-Bold',
        fontSize: fontSizes.titleTextSize,
        color: COLORS.black,
        marginBottom: 10,   
    },
    container: {
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
