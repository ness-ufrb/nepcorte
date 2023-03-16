import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Header = ({ code, navigation }) => {
    // console.log(navigation)
    const [fontsLoaded] = useFonts({
        'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
        'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
        'Inter-Light': require('../assets/fonts/Inter-Light.ttf')
    });

    if (!fontsLoaded) {
        return null;
    }

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
        fontSize: 20,
        fontFamily: 'Inter-SemiBold'
    }
});

export default Header;