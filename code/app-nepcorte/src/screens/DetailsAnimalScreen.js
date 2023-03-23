import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { COLORS } from '../constant/colors';

const DetailsAnimalScreen = ({ navigation }) => {
    return (
        <View>           
            <Text style={{fontSize: 30}}>DetailsAnimalScreen</Text>
            <Button
                    title="Success Animals"
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
                        navigation.navigate(route="SuccessAnimal");
                    }}
            />
            <Button
                    title="Problem Animals"
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
                        navigation.navigate(route="ProblemAnimal");
                    }}
                />
        </View>
    )
};

const styles = StyleSheet.create({
});

export default DetailsAnimalScreen;