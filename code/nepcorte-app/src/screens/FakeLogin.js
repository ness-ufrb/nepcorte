import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { AuthContext } from '../context/UserContext/AuthContext';
import nepcorteServer from '../api/nepcorteServer';
import { showError } from '../api/alerts';

export default function FakeLogin() {
  const { login, refreshAccessToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const signin = async () => {
    console.log('botao apertadooo')
    try {
      const res = await nepcorteServer.post(`/api/user/token/`, {
        email,
        password: senha,
      });

      Alert.alert('Parabéns', 'Você logou com sucesso', [{ text: 'OK', onPress: () => console.log('Botão apertado') }]);
      
      login(res.data.access, res.data.refresh, email);
      
    } catch (e) {
      showError(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        placeholder="Email..."
        value={email}
        onChangeText={texto => setEmail(texto)}
        style={styles.input}
      />

      <Text>Senha</Text>
      <TextInput
        placeholder="Senha..."
        value={senha}
        onChangeText={texto => setSenha(texto)}
        style={styles.input}
      />
      <Button onPress={() => signin()} title="Entrar" />
      <Button onPress={() => refreshAccessToken()} title="Renovar Token" />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    fontSize: 20,
    borderWidth: 1,
    width: '80%',
    borderColor: 'black',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
