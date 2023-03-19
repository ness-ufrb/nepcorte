import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizes } from "../constant/fontSizes";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Header = ({ code, navigation }) => {
    return (
        <View style={styles.container}>
            <Ionicons name='chevron-back-outline' size={25} onPress={()=>{
                navigation.pop()
                console.log('back pressed')
                }}/>
            <Text style={styles.code}>{code}</Text>
            <Feather name='menu' size={25} onPress={()=>(console.log('menu pressed'))}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',
        height: 50,
    },
    code: {
        fontSize: fontSizes.descriptionTextSize,
        fontFamily: 'Inter-SemiBold'
    }
});

export default Header;