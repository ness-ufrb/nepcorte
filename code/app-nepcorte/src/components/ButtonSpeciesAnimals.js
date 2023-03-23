import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { COLORS } from "../constant/colors";
import { icons } from "../constant/icons";
import { useFonts } from 'expo-font'; 
import SVGImg from "../assets/icons/019-pig.svg"


const ButtonSpeciesAnimals = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.buttonStyle}>
            {props.iconsScreen}
            <View style={styles.buttonIconSeparatorStyle} />
            <Text style={styles.buttonTextStyle}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 90,
        width: 135,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        margin: 5, 
        shadowColor: COLORS.black,
        shadowOffset: {
	        width: 0,
	        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2,
        elevation: 2,
    },
    buttonIconSeparatorStyle: {
        backgroundColor: COLORS.background,
        width: 135,
        height: 2,
    },
    buttonTextStyle: {
        fontFamily: 'Inter-Light',
        textAlign: 'center',
        paddingTop: 4,
        height: 40,
        width: 135,
        fontSize: 22,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        color: COLORS.black,
        backgroundColor: '#FFFFFF',
        shadowColor: COLORS.black,
        shadowOffset: {
	        width: 0,
	        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2,
        elevation: 2,

    },
});


export default ButtonSpeciesAnimals;