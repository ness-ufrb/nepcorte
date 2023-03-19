import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constant/colors';
import { fontSizes } from "../constant/fontSizes";

const TextCircle = ({ number, label, isActive }) => {
    return (
        <View style={styles.container}>
            <View style={{
                elevation: -1,
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: isActive == true ? COLORS.main : COLORS.grayStep
            }} />
            <Text style={{
                fontSize: fontSizes.titleTextSize,
                textAlign: "center",
                marginTop: -47,
                fontFamily: 'Inter-SemiBold',
                color: isActive == true ? COLORS.white : COLORS.grayStepLabel
            }}> {number} </Text>
            <Text style={styles.labelText}> {label} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        borderWidth: 2,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    headerText: {
        fontSize: fontSizes.titleTextSize,
        textAlign: "center",
        // margin: -50,
        marginTop: -47,
        // elevation: 1,
        fontFamily: 'Inter-SemiBold',
        color: COLORS.grayStepLabel
    },
    labelText: {
        fontSize: fontSizes.descriptionTextSize,
        textAlign: "center",
        fontFamily: 'Inter-Light',
        marginTop: 30,
        color: COLORS.gray
    }
});

export default TextCircle;