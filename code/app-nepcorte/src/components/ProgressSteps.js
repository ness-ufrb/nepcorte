import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constant/colors';
import TextCircle from './TextCircle';

const ProgressStep = ({ navigation, screen }) => {
    return (<>
        <View style={styles.container}>
            <View style={styles.stepsGroup}>
                {screen == "SituationAnimal" ? 
                    <TextCircle 
                        navigation = {navigation} nextRoute="SituationAnimal" 
                        number='1' 
                        label="Vistoria"
                        isActive={true}
                    /> : 
                    <TextCircle 
                        navigation = {navigation} nextRoute="SituationAnimal" 
                        number='1' 
                        label=""
                    />
                }
                {screen == "SpeciesAnimal" ? 
                    <TextCircle 
                        navigation = {navigation} nextRoute="SpeciesAnimals" 
                        number='2' 
                        label="Espécie" 
                        isActive={true}
                    /> : 
                    <TextCircle 
                        navigation = {navigation} nextRoute="SpeciesAnimals" 
                        number='2' 
                        label=""
                    />
                }
                {screen == "DetailsAnimal" ? 
                    <TextCircle 
                        navigation = {navigation} nextRoute="DetailsAnimal" 
                        number='3' 
                        label="Detalhes" 
                        isActive={true}
                    /> : 
                    <TextCircle 
                        navigation = {navigation} nextRoute="DetailsAnimal" 
                        number='3' 
                        label=""
                    />
                }
            </View>
            <View style={styles.lineStyle} />
        </View>
    </>)
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        width: '100%',
        height: 90,
        marginBottom: 10,
    },
    stepsGroup: {
        zIndex: 2,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
        padding: 0,
        marginHorizontal: 20,
    },
    lineStyle: {
        zIndex: 1,
        width: '65%',
        height: 1,
        marginTop: -127,
        backgroundColor: COLORS.grayStep,
    },
});

export default ProgressStep;