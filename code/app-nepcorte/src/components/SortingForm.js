import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Input } from '@rneui/themed';
import { useFonts } from 'expo-font';
import { Button } from '@rneui/themed';
import { COLORS } from '../constant/colors';

const SortingForm = ({ navigation, route }) => {
    const [code, setCode] = useState('');

    const [fontsLoaded] = useFonts({
        'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
        'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
        'Inter-Light': require('../assets/fonts/Inter-Light.ttf')
    });

    if (!fontsLoaded) {
        return null;
    }

    function generateRandomCode() {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerText}>
                <Text style={styles.title}>Inicie a triagem do animal</Text>
                <Text style={styles.description}>Forneça o código identificador do animal recebido</Text>
            </View>
            <View style={styles.containerForm}>
                <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder='Informe o identificador do animal'
                    containerStyle={{
                        paddingTop: 15,
                        width: '100%'
                    }}
                    value={code}
                    onChangeText={(newCode) => setCode(newCode)}
                />
                <Button
                    title="Iniciar"
                    fontSize={50}
                    disabled={code.length < 6 ? true : false}
                    buttonStyle={{
                        backgroundColor: COLORS.main,
                        borderRadius: 10,
                        height: 70
                    }}
                    titleStyle={{ fontSize: 22, fontFamily: 'Inter-SemiBold', }}
                    containerStyle={{
                        paddingHorizontal: 5,
                        paddingBottom: 15,
                        width: '100%'
                    }}
                    onPress={() => { 
                        console.log('Set code state, verify if code is valid and navigate to the next screen');
                        // navigation.navigate(route);
                    }}
                />
                <TouchableOpacity onPress={() => setCode(generateRandomCode())}>
                    <Text style={styles.getCode}>Gerar código identificador</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    containerForm: {
        alignItems: 'center',
        width: '85%'
    },
    containerText: {
        width: '85%'
    },
    title: {
        paddingBottom: 10,
        fontFamily: 'Inter-Bold',
        fontSize: 25,
        color: COLORS.black
    },
    description: {
        paddingBottom: 10,
        fontFamily: 'Inter-Light',
        fontSize: 20,
        color: COLORS.gray
    },
    getCode: {
        fontFamily: 'Inter-Light',
        fontSize: 20,
        color: COLORS.main
    }
});

export default SortingForm;