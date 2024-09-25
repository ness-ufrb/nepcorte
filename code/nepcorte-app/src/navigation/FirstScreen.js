import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainApp from "./TabNavigator";
import Login from "../screens/Login";
import { getTokens } from "../api/nepcorteServer";
import { Context as AuthContext } from "../context/UserContext/Context";
import * as SplashScreenExpo from 'expo-splash-screen';
import SplashScreen from '../screens/SplashScreen';
// Evita que a splash screen seja automaticamente escondida
SplashScreenExpo.preventAutoHideAsync();

export default function FirstScreen() {
  const { state, SetAuthenticated } = useContext(AuthContext);
  const { isAuthenticated } = state;
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      try {
        // Simula uma inicialização ou carrega recursos necessários
        const tokens = await getTokens();
        
        if (tokens !== null) {
          SetAuthenticated(true);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        // Agora podemos esconder a splash screen
        await SplashScreenExpo.hideAsync();
      }
    }

    prepareApp();
  }, []);

  if (!appIsReady) {
    return <SplashScreen/>;
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? <Login/> : <MainApp/>}
    </NavigationContainer>
  );
}
