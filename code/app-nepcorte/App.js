import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SortingScreen from './src/screens/SortingScreen';
import AnimalsScreen from './src/screens/AnimalsScreen';
import AssessScreen from './src/screens/AssessScreen';
import AssessmentsScreen from './src/screens/AssessmentsScreen';
import AccountScreen from './src/screens/AccountScreen';
import IdentifyAnimalScreen from './src/screens/IdentifyAnimalScreen';
import SituationAnimalScreen from './src/screens/SituationAnimalScreen';
import { COLORS } from './src/constant/colors';
import BottomBarIcons from './src/components/BottomBarIcons';
import { icons } from './src/constant/icons';
import { Provider } from 'react-redux';
import store from './src/context/store';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function SortingStackScreens() {
  return (
    <Stack.Navigator initialRouteName="IdentifyAnimal" screenOptions={{headerShown: false}}>
      <Stack.Screen name="IdentifyAnimal" component={IdentifyAnimalScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SituationAnimal" component={SituationAnimalScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./src/assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('./src/assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Light': require('./src/assets/fonts/Inter-Light.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          shifting={false}
          initialRouteName="Triagem"
          barStyle={{ backgroundColor: COLORS.main }}
        >
          <Tab.Screen name="Triagem" component={SortingStackScreens}
            options={{
              tabBarIcon: ({ focused }) => (
                <BottomBarIcons imageSource={icons.truck054} focused={focused} />
              ),
            }}
          />
          <Tab.Screen name="Animais" component={AnimalsScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <BottomBarIcons imageSource={icons.cow008} focused={focused} />
              ),
            }}
          />
          <Tab.Screen name="Avaliar" component={AssessScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <BottomBarIcons imageSource={icons.camera003} focused={focused} />
              ),
            }}
          />
          <Tab.Screen name="Avaliações" component={AssessmentsScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <BottomBarIcons imageSource={icons.steak001} focused={focused} />
              ),
            }}
          />
          <Tab.Screen name="Conta" component={AccountScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <BottomBarIcons imageSource={icons.user032} focused={focused} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
