import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SortingScreen from './src/screens/SortingScreen';
import AnimalsScreen from './src/screens/AnimalsScreen';
import AssessScreen from './src/screens/AssessScreen';
import AssessmentsScreen from './src/screens/AssessmentsScreen';
import AccountScreen from './src/screens/AccountScreen';
import { COLORS } from './src/assets/colors/Colors';
import BottomBarIcons from './src/components/BottomBarIcons';
import { icons } from './src/assets/icons/icons';

const Tab = createMaterialBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        shifting={false}
        initialRouteName="Sorting"
        barStyle={{ backgroundColor: COLORS.main }}
      >
        <Tab.Screen name="Triagem" component={SortingScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <BottomBarIcons imageSource={icons.truck054} focused={focused}/>
            ),
          }}
        />
        <Tab.Screen name="Animais" component={AnimalsScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <BottomBarIcons imageSource={icons.cow008} focused={focused}/>
            ),
          }}
        />
        <Tab.Screen name="Avaliar" component={AssessScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <BottomBarIcons imageSource={icons.camera003} focused={focused}/>
            ),
          }}
        />
        <Tab.Screen name="Avaliações" component={AssessmentsScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <BottomBarIcons imageSource={icons.steak001} focused={focused}/>
            ),
          }}
        />
        <Tab.Screen name="Conta" component={AccountScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <BottomBarIcons imageSource={icons.user032} focused={focused}/>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
