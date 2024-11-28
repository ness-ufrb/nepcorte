import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import DropdownComponent from '../components/Dropdown';
import ProgressStep from '../components/ProgressSteps';
import { Button } from '@rneui/themed';
import { TextInput } from 'react-native-paper';
import { COLORS } from '../constant/colors';
import { fontSizes } from "../constant/fontSizes";
import { Formik } from 'formik';
import * as yup from 'yup';
import { Context as SortingContext } from '../context/SortingContext/Context';

const DetailsAnimalScreen = ({ navigation }) => {
    const { state, createAnimal } = useContext(SortingContext);

    const handleCreateAnimal = (formValues) => {
        if (!formValues.age){
            formValues.age = 1
        }else{
            formValues.teeth = 1
        }
        console.log('FORM VALUES:', formValues)
        const { reproductiveSituation, animalRace, age, teeth } = formValues;
        
        createAnimal(state, navigation, animalRace, reproductiveSituation, age, teeth);
        ;
    };

    const detailsValidationSchema = yup.object().shape({
        animalRace: yup
            .string()
            .required('Por favor, informe a raça do animal'),
        reproductiveSituation: yup
            .string()
            .required('Por favor, informe a situação reprodutiva do animal'),
        [state.species === 'Ovino' ? 'teeth' : 'age']: yup
            .number()
            .positive('Insira um número maior que zero neste campo')
            .typeError("Insira um número inteiro neste campo")
            .integer('Insira um número inteiro neste campo')
            .max(state.species === 'Ovino' ? 32 : 2400, 
                 `o valor máximo para esse campo é ${state.species === 'Ovino' ? 32 : 2400}`)
    });

    const raceList = state.species === 'Caprino' 
        ? goatRaces 
        : sheepRaces;

    const renderSpecificInput = (handleChange, errors) => {
        const isOvine = state.species === 'Ovino';
        const inputProps = {
            keyboardType: "numeric",
            autoCapitalize: "none",
            autoCorrect: false,
            activeOutlineColor: COLORS.gray,
            mode: "outlined",
            style: {
                backgroundColor: COLORS.screenBackgroungColor,
                fontFamily: 'Inter-Light'
            }
        };

        const errorStyle = {
            paddingTop: 15,
            paddingBottom: 2,
            fontFamily: 'Inter-Bold',
            fontSize: fontSizes.descriptionTextSize,
            color: 'red',
            alignSelf: 'flex-start'
        };

        return (
            <View style={styles.textInput}>
                <TextInput
                    {...inputProps}
                    label={isOvine ? "Informe a quantidade de dentes" : "Informe a idade em meses"}
                    placeholder={isOvine ? "Quantidade de dentes" : "Idade do animal em meses"}
                    onChangeText={handleChange(isOvine ? 'teeth' : 'age')}
                />
                {errors[isOvine ? 'teeth' : 'age'] && (
                    <Text style={errorStyle}>
                        {errors[isOvine ? 'teeth' : 'age']}
                    </Text>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header code={state.code} navigation={navigation} />
            <View style={styles.progressStepStyle}>
                <ProgressStep navigation={navigation} screen="DetailsAnimal" />
            </View>
            <ScrollView 
                centerContent 
                contentContainerStyle={styles.contentContainerScrollView}
            >
                <Formik
                    initialValues={{ 
                        animalRace: '', 
                        reproductiveSituation: '', 
                        age: 0, 
                        teeth: 0 
                    }}
                    validationSchema={detailsValidationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={handleCreateAnimal}
                >
                    {({ handleChange, handleSubmit, errors }) => (
                        <>
                            <DropdownComponent 
                                data={raceList}
                                placeholder='Informe a raça'
                                callback={handleChange('animalRace')}
                            />
                            {errors.animalRace && (
                                <Text style={styles.errorText}>
                                    {errors.animalRace}
                                </Text>
                            )}
                            <DropdownComponent 
                                data={reproductiveSituations}
                                placeholder='Informe a situação reprodutiva'
                                callback={handleChange('reproductiveSituation')}
                            />
                            {errors.reproductiveSituation && (
                                <Text style={styles.errorText}>
                                    {errors.reproductiveSituation}
                                </Text>
                            )}

                            {renderSpecificInput(handleChange, errors)}
                            
                            <Button
                                title="Finalizar triagem"
                                buttonStyle={{
                                    backgroundColor: COLORS.main,
                                    borderRadius: 10,
                                    height: 60
                                }}
                                titleStyle={{ 
                                    fontSize: fontSizes.buttonTextSize, 
                                    fontFamily: 'Inter-SemiBold' 
                                }}
                                containerStyle={{
                                    paddingBottom: 15,
                                    width: '100%'
                                }}
                                onPress={handleSubmit}
                            />
                        </>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textInput: {
        paddingTop: 10,
        paddingBottom: 30,
        fontFamily: 'Inter-Light',
        width: '100%',
        flexDirection: 'column',
        // borderColor: 'black',
        // borderWidth: 2
    },
    contentContainerScrollView: {
        width: '85%',
        justifyContent: 'center',
        alignItems:'center',
        alignSelf:Platform.OS === 'android' ? 'center' : '',
        paddingTop: 10,
    },
    container: {
        backgroundColor: COLORS.screenBackgroungColor,
        flex: 1,
        flexDirection: 'column',
    },
    progressStepStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -50
    },
});


const sheepRaces = [
    { label: 'Morada Nova', value: '1' },
    { label: 'Cariri', value: '2' },
    { label: 'Santa Inês', value: '3' },
    { label: 'Somali', value: '4' },
    { label: 'Dâmara ou Rabo Largo', value: '5' },
    { label: 'Dorper', value: '6' }
];

const goatRaces = [
    { label: 'Moxotó', value: '1' },
    { label: 'Canindé', value: '2' },
    { label: 'Anglo Nubiana', value: '3' },
    { label: 'Boer', value: '4' },
    { label: 'Savana', value: '5' },
    { label: 'Alpina', value: '6' },
    { label: 'Toggemburg', value: '7' },
    { label: 'Saanen', value: '8' }
];

const reproductiveSituations = [
    { label: 'Macho', value: '1' },
    { label: 'Fêmea', value: '2' },
    { label: 'Castrado', value: '3' }
];

export default DetailsAnimalScreen;