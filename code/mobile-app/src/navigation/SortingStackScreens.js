import React from 'react';
// Screens
import SpeciesAnimalsScreen from '../screens/SpeciesAnimalsScreen';
import IdentifyAnimalScreen from '../screens/IdentifyAnimalScreen';
import SituationAnimalScreen from '../screens/SituationAnimalScreen';
import DetailsAnimalScreen from '../screens/DetailsAnimalScreen';
import SuccessAnimalScreen from '../screens/SuccessAnimalScreen';
import ProblemAnimalScreen from '../screens/ProblemAnimalScreen';
// Providers
import { Provider as SortingProvider } from "../context/SortingContext/Context";
// Navigation
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function SortingStackScreens() {
    return (
      <SortingProvider>
        <Stack.Navigator initialRouteName="IdentifyAnimal" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="IdentifyAnimal" component={IdentifyAnimalScreen} />
          <Stack.Screen name="SituationAnimal" component={SituationAnimalScreen} />
          <Stack.Screen name="SpeciesAnimals" component={SpeciesAnimalsScreen} />
          <Stack.Screen name="DetailsAnimal" component={DetailsAnimalScreen} />
          <Stack.Screen name="SuccessAnimal" component={SuccessAnimalScreen} />
          <Stack.Screen name="ProblemAnimal" component={ProblemAnimalScreen} />
        </Stack.Navigator>
      </SortingProvider>
    );
  }