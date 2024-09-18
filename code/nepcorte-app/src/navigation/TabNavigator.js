import React from 'react';
// Screens
import AnimalsScreen from '../screens/AnimalsScreen';
import AssessmentsScreen from '../screens/AssessmentsScreen';
import AccountScreen from '../screens/AccountScreen';
import SortingStackScreens from './SortingStackScreens';
import AssessStackScreens from './AssessStackScreens';
// Constansts
import { COLORS } from '../constant/colors';
import { icons } from '../constant/icons';
import BottomBarIcons from '../components/BottomBarIcons';
// Navigation
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();

export default function MainApp() {
    return (
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
        <Tab.Screen name="Avaliar" component={AssessStackScreens}
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
    );
  }