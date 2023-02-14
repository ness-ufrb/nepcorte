import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../assets/icons/021-cow.png')}
            />
            <Text style={styles.title}>SplashScreen</Text>
        </View>
    )
};

SplashScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({
    image: {
        tintColor: 'white',
        width: '25%',
        height: '12%'
    },
    title: {
        color: 'white',
        fontSize: 36,
        fontFamily: 'Inter-Bold',
        fontStyle: 'normal' 
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#EC441E',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SplashScreen;
