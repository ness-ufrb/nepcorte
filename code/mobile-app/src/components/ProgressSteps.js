import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constant/colors';
import TextCircle from './TextCircle';

const ProgressStep = ({ navigation, screen }) => {
    let stepLabels = ["", "", ""];
    let stepActivation = [true, false, false];

    switch (screen) {
        case "SituationAnimal":
            stepLabels = ["Vistoria", "", ""];
            stepActivation = [true, false, false];
            break;
        case "SpeciesAnimal":
            stepLabels = ["", "Espécie", ""];
            stepActivation = [true, true, false];
            break;
        case "DetailsAnimal":
            stepLabels = ["", "", "Detalhes"];
            stepActivation = [true, true, true];
            break;
        default:
            stepLabels = ["Vistoria", "", ""];
            stepActivation = [true, false, false];
    }

    return (<>
        <View style={styles.container}>
            <View style={styles.stepsGroup}>
                <TextCircle
                    navigation={navigation} nextRoute="SituationAnimal"
                    number='1'
                    label={stepLabels[0]}
                    isActive={stepActivation[0]}
                />
                <TextCircle
                    navigation={navigation} nextRoute="SpeciesAnimals"
                    number='2'
                    label={stepLabels[1]}
                    isActive={stepActivation[1]}
                />
                <TextCircle
                    navigation={navigation} nextRoute="DetailsAnimal"
                    number='3'
                    label={stepLabels[2]}
                    isActive={stepActivation[2]}
                />                
            </View>
            <View style={styles.lineStyle} />
        </View>
        <View style={styles.View}/>
    </>)
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        width: '100%',
        height: 90,
        marginBottom: 20,
    },
    stepsGroup: {
        zIndex: 3,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
        marginHorizontal: 20,
    },
    lineStyle: {
        zIndex: 2,
        width: '65%',
        height: 1,
        marginTop: -127,
        backgroundColor: COLORS.grayStep,
    },
    View: {
        zIndex: 5,
        justifyContent: 'space-around',
        width: "100%",
        height: 45,
    },
    
});

export default ProgressStep;