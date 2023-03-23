import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import SortingForm from '../components/SortingForm';

const IdentifyAnimalScreen = ({ navigation }) => {
    return (
        <View>           
            <SortingForm route="SituationAnimal" navigation={navigation}/>
        </View>
    )
};

const styles = StyleSheet.create({
});

export default IdentifyAnimalScreen;
