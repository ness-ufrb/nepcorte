import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
// Context Providers
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import store from './src/context/store';
import { Provider as AuthProvider } from './src/context/UserContext/Context';
import { Provider as AnimalProvider } from './src/context/AnimalsContext/Context';
import FirstScreen from './src/navigation/FirstScreen';
import * as Font from 'expo-font';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Inter-Bold': require('./src/assets/fonts/Inter-Bold.ttf'),
        'Inter-SemiBold': require('./src/assets/fonts/Inter-SemiBold.ttf'),
        'Inter-Light': require('./src/assets/fonts/Inter-Light.ttf')
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AuthProvider>
      <AnimalProvider>
        <Provider store={store}>
          <StatusBar barStyle={'dark-content'} backgroundColor={'black'}/>
          <FirstScreen/>
        </Provider>
      </AnimalProvider>
    </AuthProvider>
  );
}
