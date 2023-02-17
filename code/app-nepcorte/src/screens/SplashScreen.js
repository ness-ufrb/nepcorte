import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useFonts } from 'expo-font';

const SplashScreen = () => {
    const [fontsLoaded] = useFonts({
        'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    });

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../assets/icons/021-cow.png')}
            />
            <Image
                style={styles.title}
                source={require('../assets/icons/TopCarne.png')}
            />
            {/* <Text style={styles.title}>TopCarne</Text> */}
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
        width: "30%",
        height: '15%'
    },
    title: {
        color: 'white',
        width: "50%",
        height: '5%'
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