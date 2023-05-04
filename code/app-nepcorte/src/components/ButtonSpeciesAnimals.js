import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../constant/colors";
import { useDispatch } from 'react-redux';
import { setSpecies } from "../context/sortingSlice";

const ButtonSpeciesAnimals = ({ navigation, nextRoute, icon, title }) => {
    const dispatch = useDispatch();

    const handleSetSpecies = (species) => {
        dispatch(setSpecies(species));
    };

    return (
        <TouchableOpacity
            onPress={() => {
                console.log('card pressed');
                navigation.navigate(nextRoute);
                handleSetSpecies(title);
            }}
            style={styles.buttonStyle}>
            {icon}
            <View style={styles.buttonIconSeparatorStyle} />
            <Text style={styles.buttonTextStyle}>{title}</Text>
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