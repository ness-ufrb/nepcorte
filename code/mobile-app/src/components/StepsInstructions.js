import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { COLORS } from "../constant/colors";
import { fontSizes } from "../constant/fontSizes";

const StepsInstructions = ({ step, description, icon }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftSide}>
                <Text style={styles.stepTitle}>{step}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <View style={styles.rightSide}>
                {icon}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '85%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    leftSide: {
        alignSelf: 'flex-start',
        height: '100%',
        width: '55%',
    },
    rightSide: {
        height: '100%',
        alignSelf: 'flex-end',
    },
    stepTitle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 18,
    },
    description: {
        paddingTop: 5,
        color: COLORS.gray,
        fontSize: fontSizes.descriptionTextSize,
    },
});

export default StepsInstructions;