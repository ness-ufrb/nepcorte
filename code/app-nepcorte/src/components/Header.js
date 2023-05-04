import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizes } from "../constant/fontSizes";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Header = ({ code: title, navigation, notHasReturn }) => {
    return (
        <View style={styles.container}>
            {!notHasReturn ?
                <View>
                    <Ionicons name='chevron-back-outline' size={25} onPress={() => {
                        navigation.pop()
                        console.log('back pressed')
                    }} />
                </View>
                : 
                <View style={{ width: 25 }} />
            }
            <Text style={styles.code}>{title}</Text>
            <Feather name='menu' size={25} onPress={() => (console.log('menu pressed'))} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        zIndex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',
        height: 50,
    },
    code: {
        fontSize: fontSizes.codeTextSize,
        fontFamily: 'Inter-SemiBold'
    }
});

export default Header;