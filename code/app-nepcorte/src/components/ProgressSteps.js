import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constant/colors';
import { useFonts } from 'expo-font';
import { fontSizes } from "../constant/fontSizes";
import TextCircle from './TextCircle';

const ProgressStep = () => {
    return (<>
        <View style={styles.container}>
            <View style={styles.stepsGroup}>
                <TextCircle number='1' label="Vistoria" isActive={true} />
                <TextCircle number='2' label="Espécie" isActive={false} />
                <TextCircle number='3' label="Detalhes" isActive={false} />
            </View>
        {/* <View style={styles.line}></View> */}
        </View>
    </>)
};

const styles = StyleSheet.create({
    container: {
        borderColor: 'green',
        borderWidth: 2,
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        width: '100%',
        height: '20%'
    },
    stepsGroup: {
        borderColor: 'blue',
        borderWidth: 2,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
        padding: 0,
        // width: '100%',
        // height: '50%',
    },
    line: {
        borderColor: 'red',
        borderWidth: 2,
        width: '100%',
        height: 2,
        marginTop: -20,
        backgroundColor: COLORS.black
    }
});

export default ProgressStep;