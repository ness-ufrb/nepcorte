import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { useFonts } from 'expo-font';
import Card from '../components/Card';
import Header from '../components/Header';
import { icons } from '../constant/icons';
import { COLORS } from '../constant/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import ProgressStepsMenu from '../components/ProgressStepsMenu';

const SituationAnimalScreen = ({ navigation }) => {
    const code = 'A12G3' //Este código deve ser passado pela tela anterior ou ser buscado no reducer da triagem

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
            <Header code={code} navigation={navigation} />
            <ProgressStepsMenu />
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
        // flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    text: {
        fontFamily: 'Inter-Bold',
        fontSize: 20,
        color: COLORS.black
    },
    container: {
        // position: 'relative',
        flex: 1,
        flexDirection: 'column',
    }
});

export default SituationAnimalScreen;
