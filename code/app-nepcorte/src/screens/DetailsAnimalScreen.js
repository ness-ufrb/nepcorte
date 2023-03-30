import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import DropdownComponent from '../components/Dropdown';
import ProgressStep from '../components/ProgressSteps';
import { Button } from '@rneui/themed';
import { TextInput } from 'react-native-paper';
import { COLORS } from '../constant/colors';
import { fontSizes } from "../constant/fontSizes";
import { useDispatch, useSelector } from 'react-redux';
import { setAge, setRace, setReproductiveSituation } from "../context/sortingSlice";
import { Formik } from 'formik';
import * as yup from 'yup';

// Falta implementar o disable do botão, para habilitá-lo apenas quando todos os campos estiverem preenchidos

const DetailsAnimalScreen = ({ navigation, nextRoute }) => {
    const dispatch = useDispatch();
    const sortingState = useSelector((state) => state.sorting.value);

    const handleSetAge = (age) => {
        dispatch(setAge(age));
    };

    const handleSetRace = (race) => {
        dispatch(setRace(race));
    };

    const handleSetReproductiveSituation = (situation) => {
        dispatch(setReproductiveSituation(situation));
    };

    const detailsValidationSchema = yup.object().shape({
        sheepRace: yup
            .string()
            .required('Por favor, informe a raça do animal'),
        reproductiveSituation: yup
            .string()
            .required('Por favor, informe a situação reprodutiva do animal'),
        age: yup
            .number()
            .typeError("Insira um número inteiro neste campo")
            .integer('Insira um número inteiro neste campo')
            .required('Este campo é obrigatório')
    })

    // Aqui o data deve ser definido pela tela anterior (espécie do animal)  
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

    let raceList;

    if(sortingState.species=="Caprino"){
        raceList = goatRaces;
    } else{
        raceList = sheepRaces;        
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header code={sortingState.code} navigation={navigation} />
            <View style={styles.progressStepStyle}>
                <ProgressStep navigation={navigation} screen={"DetailsAnimal"} />
            </View>
            <ScrollView centerContent={true} contentContainerStyle={styles.contentContainerScrollView}>
                <Formik
                    initialValues={{ sheepRace: '', reproductiveSituation: '', age: 0 }}
                    validationSchema={detailsValidationSchema}
                    onSubmit={values => {
                        handleSetReproductiveSituation(values.reproductiveSituation);
                        handleSetRace(values.sheepRace);
                        handleSetAge(values.age);
                        console.log(sortingState);
                        navigation.navigate(sortingState.situation == "Apto para abate" ? nextRoute = "SuccessAnimal" : nextRoute = "ProblemAnimal");
                    }}
                >
                    {({ handleChange, handleSubmit, errors, isValid, dirty, values }) => (
                        <>
                            <DropdownComponent data={raceList}
                                placeholder='Informe a raça'
                                callback={(value) => {
                                    console.log(value);
                                }}
                                // callback={handleChange('sheepRace')} 
                                />
                            {errors.sheepRace &&
                                <Text style={{ fontFamily: 'Inter-Bold', fontSize: fontSizes.descriptionTextSize, color: 'red' }}>{errors.sheepRace}</Text>
                            }
                            <DropdownComponent data={reproductiveSituations}
                                placeholder='Informe a situação reprodutiva'
                                callback={(value) => {
                                    console.log(value);
                                    values.reproductiveSituation=value;
                                }}
                                // callback={handleChange('reproductiveSituation')} 
                                />
                            {errors.reproductiveSituation &&                                
                                <Text style={{ fontFamily: 'Inter-Bold', fontSize: fontSizes.descriptionTextSize, color: 'red' }}>{errors.reproductiveSituation}</Text>
                            }
                            <View style={styles.textInput}>
                                <TextInput
                                    keyboardType="numeric"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    activeOutlineColor={COLORS.gray}
                                    mode="outlined"
                                    label="Informe a quantidade de dentes"
                                    placeholder="Quantidade de dentes"
                                    // onChangeText={handleChange('age')}
                                    style={{
                                        backgroundColor: COLORS.screenBackgroungColor,
                                        fontFamily: 'Inter-Light'
                                    }}
                                    // outlineStyle={{ borderRadius: 10 }}
                                />
                                {errors.age &&
                                    <Text style={{ fontFamily: 'Inter-Bold', fontSize: fontSizes.descriptionTextSize, color: 'red' }}>{errors.age}</Text>
                                }
                            </View>
                            <Button
                                title="Finalizar triagem"
                                buttonStyle={{
                                    backgroundColor: COLORS.main,
                                    borderRadius: 10,
                                    height: 60,
                                    // marginHorizontal: 15,
                                }}
                                titleStyle={{ fontSize: fontSizes.buttonTextSize, fontFamily: 'Inter-SemiBold', }}
                                containerStyle={{
                                    // paddingHorizontal: 5,
                                    paddingBottom: 15,
                                    width: '100%',
                                }}
                                // disabled={!(isValid && dirty)}
                                onPress={
                                    handleSubmit
                                }
                            />
                        </>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    textInput: {
        paddingTop: 10,
        paddingBottom: 30,
        fontFamily: 'Inter-Light',
        width: '100%',
        flexDirection: 'column',
    },
    contentContainerScrollView: {
        width: '85%',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // marginTop: -50,
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

export default DetailsAnimalScreen;