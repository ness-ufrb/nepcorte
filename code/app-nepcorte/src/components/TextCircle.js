import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constant/colors';
import { fontSizes } from "../constant/fontSizes";

const TextCircle = ({ number, label, isActive }) => {
    return (
            <View style={styles.container}>
                <View style={{
                    elevation: -1,
                    width: 40,
                    height: 40,
                    borderRadius: 30,
                    backgroundColor: isActive == true ? COLORS.main : COLORS.grayStep
                }} />
                <Text style={{
                    fontSize: fontSizes.titleTextSize,
                    textAlign: "center",
                    marginTop: -35,
                    fontFamily: 'Inter-SemiBold',
                    color: isActive == true ? COLORS.white : COLORS.grayStepLabel
                }}> {number} </Text>
                {isActive == true ? <Text style={styles.labelText}> {label} </Text> : <Text style={styles.labelText}></Text>}
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // borderColor: 'blue',
        // borderWidth: 2,
    },
    headerText: {
        fontSize: fontSizes.titleTextSize,
        textAlign: "center",
        fontFamily: 'Inter-SemiBold',
        color: COLORS.grayStepLabel
    },
    labelText: {
        fontSize: fontSizes.descriptionTextSize,
        textAlign: "center",
        fontFamily: 'Inter-Light',
        marginTop: 15,
        color: COLORS.gray,
    },
});

export default TextCircle;