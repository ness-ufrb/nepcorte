import React, { useContext, useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, 
  SafeAreaView, Image, ScrollView,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from '@rneui/themed';
import { Context as AuthContext } from '../context/UserContext/Context';
import { COLORS } from '../constant/colors';
import { fontSizes } from '../constant/fontSizes';
import { icons } from '../constant/icons';
import * as yup from 'yup';
import { Formik } from 'formik';
import Loading from './Loading';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Login({navigation}) {
  const { Login } = useContext(AuthContext);
  const [visible, setVisible] = useState(false)

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Por favor, insira um e-mail válido')
      .required('O campo e-mail está em branco'),
    password: yup
      .string()
      .required('O campo senha está em branco'),
  });

  const signin = async (values) => {
    setVisible(true)
    await Login(values.email, values.password);
    setVisible(false)
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    
      {visible ? <Loading/> : null}
      
      <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
        <View style={styles.container}>
            
          {/* Logo Section */}
          <View style={styles.logoForm}>
            <Image source={icons.cow021} style={styles.cowImage} tintColor={COLORS.main} />
            <Image source={icons.TopCarne} style={styles.TopCarneimage} tintColor={COLORS.main} />
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <View style={styles.containerText}>
              <Text style={styles.title}>Acesso à Plataforma</Text>
              <Text style={styles.description}>Informe seu e-mail e senha de acesso abaixo</Text>
            </View>

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={loginValidationSchema}
              onSubmit={signin}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <View style={styles.containerForm}>
                  <View style={styles.textInput}>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      activeOutlineColor={COLORS.gray}
                      mode="outlined"
                      label="E-mail"
                      keyboardType='email-address'
                      placeholder="Informe seu e-mail"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      outlineColor={errors.email && touched.email ? 'red' : COLORS.gray}
                      style={styles.inputStyle}
                      outlineStyle={styles.outlineStyle}
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>

                  <View style={styles.textInput}>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      activeOutlineColor={COLORS.gray}
                      mode="outlined"
                      label="Senha"
                      placeholder="Informe sua senha"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      outlineColor={errors.password && touched.password ? 'red' : COLORS.gray}
                      secureTextEntry={true}
                      style={styles.inputStyle}
                      outlineStyle={styles.outlineStyle}
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>

                  <Button
                    title="Entrar"
                    fontSize={20}
                    buttonStyle={styles.loginButton}
                    titleStyle={styles.buttonText}
                    containerStyle={{ width: '100%' }}
                    onPress={handleSubmit}
                  />

                  <TouchableOpacity onPress={() => navigation.navigate('SendEmail')}>
                    <Text style={styles.forgotPass}>Esqueci minha senha</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>

          {/* Create Account Button */}
          <Button
            title="Criar uma conta"
            fontSize={20}
            buttonStyle={styles.createAccountButton}
            titleStyle={styles.createAccountButtonText}
            containerStyle={styles.createAccountButtonContainer}
            onPress={() => navigation.navigate('Register')}
          />
          
        </View>
        </KeyboardAwareScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.screenBackgroungColor,
    flex:1,

  },
  container: {
    flex:1,
    justifyContent:'space-between',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '80%',
    paddingBottom: '3%',
    paddingTop: '3%',
  },
  logoForm: {
    width: '100%',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  containerText: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    paddingBottom: 18,
    fontFamily: 'Inter-Bold',
    fontSize: fontSizes.titleTextSize,
    color: COLORS.black,
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  description: {
    paddingBottom: 10,
    fontFamily: 'Inter-Light',
    fontSize: fontSizes.descriptionTextSize,
    color: COLORS.gray,
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  containerForm: {
    width: '100%',
  },
  TopCarneimage: {
    width: '57%',
    height: undefined,
    aspectRatio: 5,
    marginBottom: 0,
  },
  cowImage: {
    width: '43%',
    height: undefined,
    aspectRatio: 1,
  },
  textInput: {
    paddingVertical: 10,
    width: '100%',
  },
  inputStyle: {
    backgroundColor: COLORS.screenBackgroungColor,
  },
  outlineStyle: {
    borderRadius: 15,
  },
  forgotPass: {
    fontFamily: 'Inter-Light',
    fontSize: fontSizes.descriptionTextSize,
    color: COLORS.main,
    textAlign: 'center',
    paddingTop: 10,
  },
  errorText: {
    paddingBottom: 2,
    fontFamily: 'Inter-Bold',
    fontSize: fontSizes.descriptionTextSize,
    color: 'red',
    alignSelf: 'flex-start',
  },
  loginButton: {
    backgroundColor: COLORS.main,
    borderRadius: 10,
    height: 60,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: fontSizes.buttonTextSize,
    fontFamily: 'Inter-SemiBold',
  },
  createAccountButton: {
    backgroundColor: COLORS.backgroundColor,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.main,
    height: 60,
    marginVertical: 10,
  },
  createAccountButtonText: {
    fontSize: fontSizes.buttonTextSize,
    fontFamily: 'Inter-Light',
    color: COLORS.main,
  },
  createAccountButtonContainer: {
    width: '100%',
  },
});
