import React, { useState, useContext } from 'react';
import { 
  View, Text, StyleSheet,
  SafeAreaView, Image,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from '@rneui/themed';
import { COLORS } from '../constant/colors';
import { fontSizes } from '../constant/fontSizes';
import { icons } from '../constant/icons';
import * as yup from 'yup';
import { Formik } from 'formik';
import Loading from './Loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import { Context as AuthContext} from '../context/UserContext/Context';
import PasswordStrengthMeterBar from '../components/PasswordStrengthMeterBar';

export default function ChangePassword({navigation}) {
  
  const { state, ChangePassword } = useContext(AuthContext);
  const { loading } = state

  const codeValidationSchema = yup.object().shape({
    token: yup
      .string()
      .required('Este campo está em branco'),
    password: yup
      .string()
      .min(8, ({ min }) => `A senha deve ter no mínimo ${min} caracteres`)
      .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
      .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
      .required('O campo senha está em branco'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'As senhas não coincidem')
      .required('Confirme sua senha'),
  });
  
  //requisição pra mudança de senha
  const signin = async (values) => {
    await ChangePassword(values.token, values.password, values.confirmPassword, navigation)
  };

  const fetchCopiedText = async (setFieldValue) => {
    const text = await Clipboard.getString();
    setFieldValue('token', text); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    
      {loading ? <Loading/> : null}  
      
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
              <Text style={styles.title}>Alterar senha</Text>
              <Text style={styles.description}>Informe o código recebido no seu e-mail e a nova senha abaixo</Text>
            </View>

            <Formik
              initialValues={{ token: '', password: '', confirmPassword: '' }}
              validationSchema={codeValidationSchema}
              onSubmit={signin}
            >
              {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
                <View style={styles.containerForm}>
                  <View style={styles.textPast}>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      activeOutlineColor={COLORS.gray}
                      mode="outlined"
                      label="Código"
                      placeholder="código recebido no e-mail"
                      value={values.token} 
                      onChangeText={handleChange('token')} 
                      outlineColor={errors.token && touched.token ? 'red' : COLORS.gray}
                      style={styles.inputPast}
                      outlineStyle={styles.outlineStyle}
                    />
                    <TouchableOpacity 
                    style={styles.pasteIcon}
                    activeOpacity={0.5}
                    onPress={async () =>{
                      const text = await Clipboard.getStringAsync();
                      setFieldValue('token', text);
                    }}
                    >
                      <Ionicons color={'gray'} name='documents-outline' size={25}/>
                    </TouchableOpacity>
                    
                  </View>
                  {errors.token && touched.token && (
                    <Text style={styles.errorText}>{errors.token}</Text>
                  )}
                  
                  <View style={styles.textInput}>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      activeOutlineColor={COLORS.gray}
                      mode="outlined"
                      label="Senha"
                      placeholder="Informe sua nova senha"
                      secureTextEntry={true}
                      value={values.password} 
                      onChangeText={handleChange('password')} 
                      outlineColor={errors.password && touched.password ? 'red' : COLORS.gray}
                      style={styles.inputStyle}
                      outlineStyle={styles.outlineStyle}
                    />
                  <PasswordStrengthMeterBar password={values.password}/>
                    
                  </View>
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  <View style={styles.textInput}>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      activeOutlineColor={COLORS.gray}
                      mode="outlined"
                      label="Confirmar Senha"
                      placeholder="Repita sua senha"
                      secureTextEntry={true}
                      value={values.confirmPassword} // Corrigido para usar 'token' em vez de 'email'
                      onChangeText={handleChange('confirmPassword')} // Corrigido para usar 'token' em vez de 'email'
                      outlineColor={errors.confirmPassword && touched.confirmPassword ? 'red' : COLORS.gray}
                      style={styles.inputStyle}
                      outlineStyle={styles.outlineStyle}
                    />
                    
                  </View>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                  )}

                  <Button
                    title="Confirmar"
                    fontSize={20}
                    buttonStyle={styles.loginButton}
                    titleStyle={styles.buttonText}
                    containerStyle={{ width: '100%' }}
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </Formik>
          </View>

          {/* Create Account Button */}
          <Button
            title="Voltar ao E-mail"
            fontSize={20}
            buttonStyle={styles.createAccountButton}
            titleStyle={styles.createAccountButtonText}
            containerStyle={styles.createAccountButtonContainer}
            onPress={() => navigation.navigate('SendEmail')}
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
  inputPast:{
    width:'80%'
  },
  pasteIcon:{
    padding:16,
    borderWidth:1,
    marginTop:5,
    marginHorizontal:'2%',
    borderRadius: 5,
    borderColor: COLORS.gray,
   
  },
  textPast: {
    width:'100%',
    alignItems:'center',
    flexDirection:'row',
    paddingBottom: 10,
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
    marginBottom:9
  },
  title: {
    paddingBottom: 13,
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
    width: '47%',
    height: undefined,
    aspectRatio: 5,
    marginBottom: 0,
  },
  cowImage: {
    width: '38%',
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
