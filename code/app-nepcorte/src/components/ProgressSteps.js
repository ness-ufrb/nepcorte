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
            <View style={styles.lineLeft} />
            <View style={styles.lineRight} />
        </View>
    </>)
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        width: '100%',
        height: '20%',
        marginTop: -250,
        marginBottom: 10,
    },
    stepsGroup: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
        padding: 0,
        marginHorizontal: 20,
    },
    lineLeft: {
        width: 78,
        height: 1,
        marginTop: -155,
        marginRight: 117,
        backgroundColor: COLORS.grayLine,
    },
    lineRight: {
        width: 80,
        height: 1,
        marginTop: -1,
        marginLeft: 117,
        backgroundColor: COLORS.grayLine,
    },
});

export default ProgressStep;