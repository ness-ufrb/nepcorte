import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from '../constant/colors';
import { fontSizes } from '../constant/fontSizes';

const AnimalStatus = ({ trimLevel, fatDeposition }) => {
    const goodResults = [
        'moderada', 'abundante', 'muito bom',
        'boa', 'muita gordura', 'melhor que tem',
        'muito boa', 'brabo'
    ];
    
    const badResults = ['menos músculo', 'escassa', 'ausente', 'ruim'];

    const getStatus = (value) => {
        if (!value) return 'analysis';
        const lowerValue = value.toLowerCase();
        if (goodResults.includes(lowerValue)) return 'good';
        if (badResults.includes(lowerValue)) return 'bad';
        return 'analysis';
    };

    const renderStatus = (label, value) => {
        const status = getStatus(value);
        const statusStyles = {
            good: styles.statusGood,
            bad: styles.statusBad,
            analysis: styles.statusAnalysis
        };

        return (
            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>{label}</Text>
                <Text style={statusStyles[status]}>{value || 'Em análise'}</Text>
            </View>
        );
    };

    let line = (
        <View style={{
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            marginVertical: 15,
        }}></View>
    );

    return (
        <>
            {line}
            {renderStatus('Nível de acabamento', trimLevel)}
            {renderStatus('Deposição de gordura', fatDeposition)}
        </>
    );
}

const styles = StyleSheet.create({
    statusGood: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        backgroundColor: '#23CE6B',
        borderRadius: 12,
        color: COLORS.white,
        fontFamily: 'Inter-Bold',
        fontSize: fontSizes.descriptionTextSize,
        alignSelf: 'flex-start'
    },
    statusBad: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        backgroundColor: '#FF5D5D',
        borderRadius: 12,
        color: COLORS.white,
        fontFamily: 'Inter-Bold',
        fontSize: fontSizes.descriptionTextSize,
        alignSelf: 'flex-start'
    },
    statusAnalysis: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        backgroundColor: '#F79E1B',
        borderRadius: 12,
        color: COLORS.white,
        fontFamily: 'Inter-Bold',
        fontSize: fontSizes.descriptionTextSize,
        alignSelf: 'flex-start'
    },
    statusContainer: {
        marginBottom: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    statusText: {
        fontFamily: 'Inter-SemiBold',
        alignSelf: 'center',
        paddingVertical: 3,
        color: COLORS.gray,
        fontSize: fontSizes.descriptionTextSize,
    },
})

export default AnimalStatus;
