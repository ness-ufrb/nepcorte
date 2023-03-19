import React from 'react';
import { View, StyleSheet } from 'react-native';
import SortingForm from '../components/SortingForm';

const IdentifyAnimalScreen = ({ navigation }) => {
    return (
        <View>
            <SortingForm nextRoute="SituationAnimal" navigation={navigation}/>
        </View>
    )
};

const styles = StyleSheet.create({
});

export default IdentifyAnimalScreen;
