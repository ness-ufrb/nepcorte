import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from 'react-native-paper';
import { Input } from '@rneui/themed';
import { Button } from '@rneui/themed';
import { COLORS } from '../constant/colors';
import { useDispatch, useSelector } from 'react-redux';
import { putCode, generateRandomCode } from "../context/sortingSlice";
import { fontSizes } from "../constant/fontSizes";

const SortingForm = ({ navigation, nextRoute }) => {
    const dispatch = useDispatch();
    const sortingState = useSelector((state) => state.sorting.value);

    const handlePutCode = (cod) => {
        dispatch(putCode(cod));
    };

    const handleGenerateCode = () => {
        dispatch(generateRandomCode());
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerText}>
                <Text style={styles.title}>Inicie a triagem do animal</Text>
                <Text style={styles.description}>Forneça o código identificador do animal recebido</Text>
            </View>
            <View style={styles.containerForm}>
                <View style={styles.textInput}>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        activeOutlineColor={COLORS.gray}
                        mode="outlined"
                        label="Identificador do animal"
                        placeholder="Informe o identificador do animal"
                        value={sortingState.code}
                        onChangeText={(newCode) => handlePutCode(newCode)}
                        labelColor={COLORS.black}
                        outlineColor={COLORS.gray} 
                        contentStyle={{ borderRadius: 20 }}
                    />
                </View>
                {/* <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder='Informe o identificador do animal'
                    containerStyle={{
                        paddingTop: 15,
                        width: '100%'
                    }}
                    value={sortingState.code}
                    onChangeText={(newCode) => handlePutCode(newCode)}
                />
                <Button
                    title="Iniciar"
                    disabled={sortingState.code.length < 6 ? true : false}
                    value={code}
                    onChangeText={(newCode) => setCode(newCode)}
                /> */}
                <Button
                    title="Iniciar"
                    fontSize={50}
                    disabled={sortingState.code.length < 6 ? true : false}
                    buttonStyle={{
                        backgroundColor: COLORS.main,
                        borderRadius: 10,
                        height: 70
                    }}
                    titleStyle={{ fontSize: fontSizes.buttonTextSize, fontFamily: 'Inter-SemiBold', }}
                    containerStyle={{
                        paddingHorizontal: 5,
                        paddingBottom: 15,
                        width: '100%'
                    }}
                    onPress={() => { 
                        console.log('Set code state, verify if code is valid and navigate to the next screen');
                        navigation.navigate(nextRoute);
                    }}
                />
                <TouchableOpacity onPress={() => {
                    handleGenerateCode()
                    }}>
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
    textInput: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: '100%',
        flexDirection: 'column',
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
        fontSize: fontSizes.titleTextSize,
        color: COLORS.black
    },
    description: {
        paddingBottom: 10,
        fontFamily: 'Inter-Light',
        fontSize: fontSizes.descriptionTextSize,
        color: COLORS.gray
    },
    getCode: {
        fontFamily: 'Inter-Light',
        fontSize: fontSizes.descriptionTextSize,
        color: COLORS.main
    }
});

export default SortingForm;