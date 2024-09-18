import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, StatusBar } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from '@rneui/themed';
import { Context as AuthContext } from '../context/UserContext/Context';
import { COLORS } from '../constant/colors';
import { fontSizes } from '../constant/fontSizes';
import { icons } from '../constant/icons';

export default function FakeLogin({ navigation }) {
  const { state, SetEmail, SetPassword, Login } = useContext(AuthContext);
  const { email, password } = state;

  const signin = () => {
    Login(email, password, navigation);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoForm}>
          <Image source={icons.cow021} style={styles.cowImage} tintColor={COLORS.main}/>
          <Image source={icons.TopCarne} style={styles.TopCarneimage} tintColor={COLORS.main}/>
        
          <View style={styles.containerText}>
            <Text style={styles.title}>Acesso à Plataforma</Text>
            <Text style={styles.description}>Informe seu e-mail e senha de acesso abaixo</Text>
          </View>

          <View style={styles.containerForm}>
            <View style={styles.textInput}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                activeOutlineColor={COLORS.gray}
                mode="outlined"
                label="E-mail"
                placeholder="Informe seu e-mail"
                value={email}
                onChangeText={SetEmail}
                labelColor={COLORS.black}
                outlineColor={COLORS.gray}
                style={{
                  backgroundColor: COLORS.screenBackgroungColor,
                }}
                outlineStyle={{
                  borderRadius: 15,
                }}
              />
            </View>

            <View style={styles.textInput}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                activeOutlineColor={COLORS.gray}
                mode="outlined"
                label="Senha"
                placeholder="Informe sua senha"
                value={password}
                onChangeText={SetPassword}
                labelColor={COLORS.black}
                outlineColor={COLORS.gray}
                secureTextEntry={true}
                style={{
                  backgroundColor: COLORS.screenBackgroungColor,
                }}
                outlineStyle={{
                  borderRadius: 15,
                }}
              />
            </View>
            
            <Button
              title="Entrar"
              fontSize={20}
              buttonStyle={{
                backgroundColor: COLORS.main,
                borderRadius: 10,
                height: 60,
                marginVertical: 10,
              }}
              titleStyle={{ fontSize: fontSizes.buttonTextSize, fontFamily: 'Inter-SemiBold' }}
              containerStyle={{
                width: '100%',
              }}
              onPress={signin}
            />

            <TouchableOpacity onPress={() => console.log('Gerar código identificador')}>
            <Text style={styles.forgotPass}>Esqueci minha senha</Text>
          </TouchableOpacity>
          </View>
        </View>
        
        <Button
              title="Criar uma conta"
              fontSize={20}
              buttonStyle={{
                backgroundColor: COLORS.backgroundColor,
                borderRadius: 10,
                borderWidth:1,
                borderColor:COLORS.main,
                height: 60,
                marginVertical: 10,
              }}
              titleStyle={{ fontSize: fontSizes.buttonTextSize, fontFamily: 'Inter-Light', color:COLORS.main }}
              containerStyle={{
                width: '100%',
              }}
              onPress={()=>console.log('mudanca de estado...')}
            />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:{
    backgroundColor: COLORS.screenBackgroungColor, 
    flex: 1,
    
  },
  container: {
    flex: 1,
    justifyContent:'space-between',
    flexDirection:'column',
    alignSelf:'center',
    width:'80%',
    paddingBottom:'3%',
    paddingTop:'7%',
  },
  containerText: {
    width: '100%',
    alignItems: 'center',
  },
  
  logoForm:{
    width:'100%',
    alignItems:'center',
  },

  title: {
    paddingBottom: 18,
    fontFamily: 'Inter-Bold',
    fontSize: fontSizes.titleTextSize,
    color: COLORS.black,
    alignSelf:'flex-start',
    textAlign:'left'
  },
  description: {
    paddingBottom: 10,
    fontFamily: 'Inter-Light',
    fontSize: fontSizes.descriptionTextSize,
    color: COLORS.gray,
    textAlign: 'center',
    alignSelf:'flex-start',
    textAlign:'left'
  },
  containerForm: {
    width: '100%',
    
  },
  TopCarneimage:{
    width: '57%',
    height: undefined,
    aspectRatio: 5, 
    marginBottom:'18%',
  },
  cowImage:{
    width: '43%',
    height: undefined,
    aspectRatio: 1,
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    width: '100%',
  },
  forgotPass: {
    fontFamily: 'Inter-Light',
    fontSize: fontSizes.descriptionTextSize,
    color: COLORS.main,
    textAlign: 'center',
    paddingTop: 10,
  },
});
