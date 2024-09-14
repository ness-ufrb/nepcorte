import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS } from "../constant/colors";
import { fontSizes } from "../constant/fontSizes";

const EmptyList = ({title ,description, imageSource}) => {
    return(
        <View style={styles.container}>
            <View style={styles.underContainer}>
                <Image source={imageSource} style={styles.image} tintColor={COLORS.gray}/>
                <Text style={styles.title} >{title}</Text>
                <Text style={styles.description} >{description}</Text>
            </View>
        </View>
    )
}

export default EmptyList

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
    },
    title: {
        fontSize:fontSizes.descriptionTextSize,
        color: COLORS.grayDark,
        textAlign:'center',
        fontWeight:'bold'
    },
    description: {
        fontSize:fontSizes.titleTextSize,
        color: COLORS.grayDark,
        textAlign:'center'
    },
    underContainer: {
        justifyContent:'flex-start',
        alignItems:'center',
        gap:4,
        paddingHorizontal: 10,
        width: '90%',
        paddingVertical:15
        
    }
})
 