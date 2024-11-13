import React, { useContext, useState } from 'react';
import { 
  View, Text, StyleSheet,
  SafeAreaView, Image, 
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from '@rneui/themed';
import { COLORS } from '../constant/colors';
import { fontSizes } from '../constant/fontSizes';
import { icons } from '../constant/icons';
import * as yup from 'yup';
import { Formik } from 'formik';
import Loading from './Loading';
import { Context as authContext} from '../context/UserContext/Context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Register({navigation}) {
  const [visible, setVisible] = useState(false);
  const { Register } = useContext(authContext)

  const registerValidationSchema = yup.object().shape({
    username: yup
      .string()
      .max(255, ({max})=> `O nome deve ter no máximo ${max} caracteres`)
      .required('O campo usuário está em branco'),
    email: yup
      .string()
      .email('Por favor, insira um e-mail válido')
      .max(255, ({max})=> `O e-mail deve ter no máximo ${max} caracteres`)
      .required('O campo e-mail está em branco'),
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

  const handleRegister = async (values) => {
    setVisible(true);
    await Register(values.username, values.email, values.password, navigation)
    setVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {visible && <Loading/>}
      <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
        <View style={styles.container}>
          <View style={styles.logoForm}>
            <Image source={icons.cow021} style={styles.cowImage} tintColor={COLORS.main} />
            <Image source={icons.TopCarne} style={styles.TopCarneimage} tintColor={COLORS.main} />
          <View/>

         
            <View style={styles.containerText}>
              <Text style={styles.title}>Registre-se na Plataforma</Text>
              <Text style={styles.description}>Preencha os campos abaixo para criar uma nova conta</Text>
            </View>

            <Formik
              initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
              validationSchema={registerValidationSchema}
              onSubmit={handleRegister}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <View style={styles.containerForm}>
                  <View style={styles.textInput}>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      activeOutlineColor={COLORS.gray}
                      mode="outlined"
                      label="Usuário"
                      placeholder="Informe seu nome de usuário"
                      value={values.username}
                      onChangeText={handleChange('username')}
                      outlineColor={errors.username && touched.username ? 'red' : COLORS.gray}
                      style={{ backgroundColor: COLORS.screenBackgroungColor }}
                      outlineStyle={{ borderRadius: 15 }}
                    />
                    {errors.username && touched.username && (
                      <Text style={styles.errorText}>{errors.username}</Text>
                    )}
                  </View>

                  <View style={styles.textInput}>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      activeOutlineColor={COLORS.gray}
                      mode="outlined"
                      label="E-mail"
                      placeholder="Informe seu e-mail"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      outlineColor={errors.email && touched.email ? 'red' : COLORS.gray}
                      style={{ backgroundColor: COLORS.screenBackgroungColor }}
                      outlineStyle={{ borderRadius: 15 }}
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
                      style={{ backgroundColor: COLORS.screenBackgroungColor }}
                      outlineStyle={{ borderRadius: 15 }}
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>

                  <View style={styles.textInput}>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      activeOutlineColor={COLORS.gray}
                      mode="outlined"
                      label="Confirmar Senha"
                      placeholder="Repita sua senha"
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      outlineColor={errors.confirmPassword && touched.confirmPassword ? 'red' : COLORS.gray}
                      secureTextEntry={true}
                      style={{ backgroundColor: COLORS.screenBackgroungColor }}
                      outlineStyle={{ borderRadius: 15 }}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                    )}
                  </View>

                  <Button
                    title="Registrar"
                    fontSize={20}
                    buttonStyle={{
                      backgroundColor: COLORS.main,
                      borderRadius: 10,
                      height: 60,
                      marginVertical: 10,
                    }}
                    titleStyle={{ fontSize: fontSizes.buttonTextSize, fontFamily: 'Inter-SemiBold' }}
                    containerStyle={{ width: '100%' }}
                    onPress={handleSubmit}
                  />

                  <Button
                    title="Voltar ao Login"
                    fontSize={20}
                    buttonStyle={{
                      backgroundColor: COLORS.backgroundColor,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: COLORS.main,
                      height: 60,
                      marginVertical: 10,
                    }}
                    titleStyle={{ fontSize: fontSizes.buttonTextSize, fontFamily: 'Inter-Light', color: COLORS.main }}
                    containerStyle={{ width: '100%' }}
                    onPress={() => navigation.navigate('Login')}
                  />
                </View>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.screenBackgroungColor,
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '80%',
    paddingBottom: '3%',
    paddingTop: '3%',
  },
  containerText: {
    width: '100%',
    alignItems: 'center',
  },
  logoForm: {
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
    width: '47%',
    height: undefined,
    aspectRatio: 5,
    marginBottom: '18%',
    zIndex: -1, 
  },
  cowImage: {
    width: '33%',
    height: undefined,
    aspectRatio: 1,
    zIndex: -1, 
  },
  textInput: {
    paddingVertical: 10,
    width: '100%',
  },
  errorText: {
    paddingBottom: 2,
    fontFamily: 'Inter-Bold',
    fontSize: fontSizes.descriptionTextSize,
    color: 'red',
    alignSelf: 'flex-start',
  },
});
