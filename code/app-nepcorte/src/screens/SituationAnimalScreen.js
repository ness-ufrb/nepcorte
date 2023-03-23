import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { COLORS } from '../constant/colors';

const SituationAnimalScreen = ({ navigation }) => {
    return (
        <View>           
            <Text style={{fontSize: 30}}>SituationAnimalScreen</Text>
            <Button
                    title="Species Animals"
                    fontSize={50}
                    buttonStyle={{
                        backgroundColor: COLORS.main,
                        borderRadius: 10,
                        height: 70
                    }}
                    containerStyle={{
                        paddingHorizontal: 5,
                        paddingBottom: 15,
                        width: '100%'
                    }}
                    onPress={() => {
                        navigation.navigate(route="SpeciesAnimals");
                    }}
                />
        </View>
    )
};

const styles = StyleSheet.create({
});

export default SituationAnimalScreen;
