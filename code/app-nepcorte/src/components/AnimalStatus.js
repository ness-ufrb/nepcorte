import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from '../constant/colors';
import { fontSizes } from '../constant/fontSizes';

const AnimalStatus = ({ trimLevel, fatDeposition }) => {
    let trimLevelStatus;
    let fatDepositionStatus;
    let line = <>
        <View style={{            
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            marginVertical: 15,
        }}></View></>
    
    if (trimLevel) {
        if (trimLevel < 50.0) {
            trimLevelStatus = <>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>Nível de acabamento</Text>
                    <Text style={styles.statusBad}>Menos Músculo</Text>
                </View>
            </>
        } else if (trimLevel >= 50.0) {
            trimLevelStatus = <>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>Nível de acabamento</Text>
                    <Text style={styles.statusGood}>Moderada</Text>
                </View>

            </>
        }
    } else {
        trimLevelStatus = <>
            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>Nível de acabamento</Text>
                <Text style={styles.statusAnalysis}>Em análise</Text>
            </View>
        </>
    }

    if (fatDeposition) {
        if (fatDeposition < 150.0) {
            fatDepositionStatus = <>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>Deposição de gorgura</Text>
                    <Text style={styles.statusBad}>Pouca</Text>
                </View>
            </>
        } else if (fatDeposition >= 150.0) {
            fatDepositionStatus = <>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>Deposição de gorgura</Text>
                    <Text style={styles.statusGood}>Moderada</Text>
                </View>
            </>
        }
    } else {
        fatDepositionStatus = <>
            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>Deposição de gorgura</Text>
                <Text style={styles.statusAnalysis}>Em análise</Text>
            </View>
        </>
    }

    return (<>
        {line}
        {trimLevelStatus}
        {fatDepositionStatus}
    </>)
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