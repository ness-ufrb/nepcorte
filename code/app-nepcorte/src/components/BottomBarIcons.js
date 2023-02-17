import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS } from '../assets/colors/Colors';

const BottomBarIcons = props => {
     return (
        <Image source={props.imageSource} tintColor={props.focused ? COLORS.white : COLORS.iconInativeColor} style={styles.ImageStyle} />
     );
}

const styles = StyleSheet.create({
    ImageStyle: {
        bottom: 4,
        width: 30,
        height: 30,
    }
});

export default BottomBarIcons;