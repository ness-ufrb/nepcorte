import React, { useContext, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-paper";
import { COLORS } from "../constant/colors";
import { fontSizes } from "../constant/fontSizes";
import Header from "../components/Header";
import { Formik } from 'formik';
import { Context as AuthContext } from "../context/UserContext/Context";
import * as yup from 'yup';
import Loading from './Loading';

const AccountScreen = ({ navigation }) => {
    const [isScreenLoading, setScreenLoading] = useState(false);
    const { state, UserEdit, GetUser, Logout } = useContext(AuthContext);
    const { loading } = state;

    useFocusEffect(
        React.useCallback(() => {
            const fetchUser = async () => {
                setScreenLoading(true);
                await GetUser(); 
                setScreenLoading(false);  
            };
            fetchUser();
        }, [navigation, handleSubmit])
    );

    console.log('\n\nESTADO NA TELA', state.user);
    const initialValues = {
        username: state.user?.name || 'seu nome', 
        email: state.user?.email || 'example@example.com',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .max(255, ({max})=> `O nome deve ter no máximo ${max} caracteres`)
            .required('O nome não pode estar em branco'),
        email: yup
            .string()
            .email('Por favor, insira um e-mail válido')
            .max(255, ({max})=> `O e-mail deve ter no máximo ${max} caracteres`)
            .required('O email não pode estar em branco'),
        password: yup
            .string()
            .min(8, ({ min }) => `A senha deve ter no mínimo ${min} caracteres`)
            .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
            .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
            .matches(/[0-9]/, 'A senha deve conter pelo menos um número'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'As senhas não coincidem') 
    });

    const handleLogout = () => {
        Logout(navigation);
    };

    const handleSubmit = async (values) => {
        await UserEdit(values.username, values.email, values.password, initialValues.email);
    };

    return (
        <SafeAreaView style={styles.container}>
            {loading && 
                <>
                    <Loading /> 
                </>
            }
            <View>
                <Header code="Minha Conta" navigation={navigation} notHasReturn={true} />
                {isScreenLoading ? <ActivityIndicator size={"large"} color={'black'} style={styles.loading}/> :
                
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleSubmit, values, errors, touched }) => (
                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    activeOutlineColor={COLORS.gray}
                                    mode="outlined"
                                    label="Nome"
                                    placeholder="Digite seu novo nome"
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                    outlineColor={errors.username && touched.username ? 'red' : COLORS.gray}
                                    style={styles.inputStyle}
                                    outlineStyle={styles.outlineStyle}
                                />
                            </View>
                            {errors.username && touched.username && (
                                <Text style={styles.errorText}>{errors.username}</Text>
                            )}

                            <View style={styles.inputContainer}>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    activeOutlineColor={COLORS.gray}
                                    mode="outlined"
                                    keyboardType='email-address'
                                    label="E-mail"
                                    placeholder="Digite seu novo e-mail"
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    outlineColor={errors.email && touched.email ? 'red' : COLORS.gray}
                                    style={styles.inputStyle}
                                    outlineStyle={styles.outlineStyle}
                                />
                            </View>
                            {errors.email && touched.email && (
                                <Text style={styles.errorText}>{errors.email}</Text>
                            )}
                            
                            <View style={styles.inputContainer}>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    activeOutlineColor={COLORS.gray}
                                    mode="outlined"
                                    label="Senha"
                                    placeholder="Informe sua senha"
                                    secureTextEntry={true}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    outlineColor={errors.password && touched.password ? 'red' : COLORS.gray}
                                    style={styles.inputStyle}
                                    outlineStyle={styles.outlineStyle}
                                />
                            </View>
                            {errors.password && touched.password && (
                                <Text style={styles.errorText}>{errors.password}</Text>
                            )}

                            <View style={styles.inputContainer}>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    activeOutlineColor={COLORS.gray}
                                    mode="outlined"
                                    label="Confirmar Senha"
                                    placeholder="Repita sua senha"
                                    secureTextEntry={true}
                                    value={values.confirmPassword}
                                    onChangeText={handleChange('confirmPassword')}
                                    outlineColor={errors.confirmPassword && touched.confirmPassword ? 'red' : COLORS.gray}
                                    style={styles.inputStyle}
                                    outlineStyle={styles.outlineStyle}
                                />
                            </View>
                            {errors.confirmPassword && touched.confirmPassword && (
                                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                            )}

                            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.logoutTextContainer} onPress={handleLogout}>
                                <Text style={styles.logoutText}>Sair da conta</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.screenBackgroungColor,
        width: "100%",
        height: "100%",
    },
    logoutTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    logoutText: {
        color: COLORS.main,
        fontSize: fontSizes.codeTextSize
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: 35,
        paddingTop: 30
    },
    inputContainer: {
        paddingVertical: 10,
        width: '100%',
    },
    inputStyle: {
        backgroundColor: COLORS.screenBackgroungColor,
    },
    outlineStyle: {
        borderRadius: 15,
    },
    errorText: {
        paddingBottom: 2,
        fontFamily: 'Inter-Bold',
        fontSize: fontSizes.descriptionTextSize,
        color: 'red',
        alignSelf: 'flex-start',
    },
    saveButton: {
        backgroundColor: COLORS.main,
        borderRadius: 10,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        fontSize: fontSizes.buttonTextSize,
        fontFamily: 'Inter-SemiBold',
        color: COLORS.white,
    },
    loading: {
        paddingTop: '10%'
    }
});

export default AccountScreen;
