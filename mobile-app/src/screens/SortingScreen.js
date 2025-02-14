import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Image } from "react-native";
import SortingForm from "../components/SortingForm";

const SortingScreen = () => {
    return (
        <SafeAreaView forceInset={{ top: 'always'}}>
            <View>
                <Text>SortingScreen</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

});

export default SortingScreen;