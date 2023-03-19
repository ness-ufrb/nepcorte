import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import Card from '../components/Card';
import Header from '../components/Header';
import { icons } from '../constant/icons';
import { COLORS } from '../constant/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontSizes } from "../constant/fontSizes";
import ProgressStep from '../components/ProgressSteps';

const SituationAnimalScreen = ({ navigation }) => {
    const code = 'A12G3'; //Este código deve ser passado pela tela anterior ou ser buscado no reducer da triagem

    return (
        <SafeAreaView style={styles.container}>
            <Header code={code} navigation={navigation} />
            <ProgressStep />
            <ScrollView centerContent={true} contentContainerStyle={styles.contentContainerScrollView}>
                <Text style={styles.text}>Informe a situação do animal</Text>
                <Card mainText="Apto para abate" secText="O animal está em perfeito estado" icon={icons.check005} iconColor={COLORS.green} />
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
    },
    text: {
        fontFamily: 'Inter-Bold',
        fontSize: fontSizes.titleTextSize,
        color: COLORS.black
    },
    container: {
        // position: 'relative',
        flex: 1,
        flexDirection: 'column',
    }
});

export default SituationAnimalScreen;
