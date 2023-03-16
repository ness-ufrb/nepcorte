import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import SortingForm from '../components/SortingForm';

const IdentifyAnimalScreen = ({ navigation }) => {
    return (
        <View>
            <SortingForm nextRoute="SituationAnimal" navigation={navigation}/>
            {/* <TouchableOpacity onPress={() => {navigation.navigate("SituationAnimal")}}>
                <Text>Algo</Text>
            </TouchableOpacity> */}
        </View>
    )
};

const styles = StyleSheet.create({
});

export default IdentifyAnimalScreen;
