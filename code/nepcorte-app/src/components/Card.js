import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../constant/colors';

const Card = ({ mainText, secText, icon, navigation, nextRoute, Press }) => {
   
    const [fontsLoaded] = useFonts({
        'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
        'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
        'Inter-Light': require('../assets/fonts/Inter-Light.ttf')
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <TouchableOpacity onPress={() => {
            console.log('card pressed');
            navigation.navigate(nextRoute);
            console.log(mainText)
            Press(mainText);
        }}>
            <View style={styles.container}>
                <View style={styles.leftSquare}>
                    {icon}
                </View>
                <View style={styles.rightSquare}>
                    <Text style={styles.mainText}>{mainText}</Text>
                    <Text style={styles.secText}>{secText}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        elevation: 5,
        alignSelf: 'center',
        marginHorizontal: '5%',
        marginVertical: '3%',
        flexDirection: 'row',
        width: '80%',
        height: 150
    },
    leftSquare: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.cardSquare,
        width: '30%',
        height: '100%'
    },
    rightSquare: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        paddingHorizontal: '5%',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        width: '70%',
        height: '100%'
    },
    mainText: {
        paddingBottom: 10,
        fontFamily: 'Inter-SemiBold',
        fontSize: 20,
        color: COLORS.black
    },
    secText: {
        paddingBottom: 10,
        fontFamily: 'Inter-Light',
        fontSize: 20,
        color: COLORS.gray
    }
});

export default Card;