import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constant/colors';
import TextCircle from './TextCircle';

const ProgressStep = ({ label, isAtive }) => {
    return (<>
        <View style={styles.container}>
            <View style={styles.stepsGroup}>
                <TextCircle number='1' label="Vistoria" isActive={true}/>
                <TextCircle number='2' label="Espécie" isActive={true}/>
                <TextCircle number='3' label="Detalhes" isActive={false}/>
            </View>
            <View style={styles.lineStyle} />
        </View>
    </>)
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        width: '100%',
        height: 90,
        // marginTop: -250,
        marginBottom: 10,
        // borderColor: "green",
        // borderWidth: 2,
    },
    stepsGroup: {
        zIndex: 2,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
        padding: 0,
        marginHorizontal: 20,
        // borderColor: COLORS.black,
        // borderWidth: 2,
    },
    lineStyle: {
        zIndex: 1,
        width: '65%',
        height: 1,
        marginTop: -120,
        backgroundColor: COLORS.grayStep,
    },
});

export default ProgressStep;