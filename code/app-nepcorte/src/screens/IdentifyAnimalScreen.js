import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import SortingForm from '../components/SortingForm';
import { COLORS } from '../constant/colors';
import Header from '../components/Header';

const IdentifyAnimalScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header notHasReturn={true} code="Triagem"/>
            <View style={styles.form}>
                <SortingForm nextRoute="SituationAnimal" navigation={navigation}/>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.screenBackgroungColor,
        width: "100%",
        height: "100%",
    },
    form: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});

export default IdentifyAnimalScreen;
