import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constant/colors";
import { fontSizes } from "../constant/fontSizes";

const WrongSearch = ({message ,screen}) => {
    return(
        <View style={styles.container}>
            <View style={styles.underContainer}>
                <Text style={styles.title} >{message}</Text>
                <Text style={styles.description} >{screen}</Text>
            </View>
        </View>
    )
}

export default WrongSearch

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'flex-start',
        alignItems:'center',
        gap:10,
    },
    image:{
        width:180,
        height:180,
        bottom:4
    },
    title: {
        fontSize:fontSizes.titleTextSize,
        color: COLORS.grayDark,
        textAlign:'left',
        fontWeight:'bold'
    },
    description: {
        fontSize:fontSizes.descriptionTextSize,
        color: COLORS.grayDark,
        textAlign:'left'
    },
    underContainer: {
        justifyContent:'flex-start',
        gap:4,
        paddingHorizontal: 10,
        width: '90%',
        paddingVertical:15
        
    }
})
 