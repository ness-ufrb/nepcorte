import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { COLORS } from '../constant/colors';
import { fontSizes } from "../constant/fontSizes";

const TextCircle = ({ navigation, nextRoute, number, label, isActive }) => {

    return (<>
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => {navigation.navigate(nextRoute)}}
                style={{
                    elevation: -1,
                    width: 40,
                    height: 40,
                    borderRadius: 30,
                    backgroundColor: isActive == true ? COLORS.main : COLORS.grayStep
            }} />
            <TouchableOpacity
                onPress={() => {navigation.navigate(nextRoute)}}
            >
                <Text 
                    style={{
                        fontSize: fontSizes.titleTextSize,
                        textAlign: "center",
                        marginRight: 5,
                        marginTop: Platform.OS === 'android' ? -35 : -32,
                        fontFamily: 'Inter-SemiBold',
                        color: isActive == true ? COLORS.white : COLORS.grayStepLabel
                    }}> {number} 
                </Text>
            </TouchableOpacity>
            <Text style={styles.labelText}> {label} </Text>
            {/* {isActive == true ? <Text style={styles.labelText}> {label} </Text> : <Text style={styles.labelText}></Text>} */}
        </View>
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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