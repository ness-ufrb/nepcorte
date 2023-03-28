import React from 'react';
import { View, StyleSheet } from 'react-native';
import SortingForm from '../components/SortingForm';
import { COLORS } from '../constant/colors';

const IdentifyAnimalScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <SortingForm nextRoute="SituationAnimal" navigation={navigation}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.screenBackgroungColor,
    },
});

export default IdentifyAnimalScreen;
