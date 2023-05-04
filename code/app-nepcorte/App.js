// PACKAGES
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

// SCREENS
import AnimalsScreen from './src/screens/AnimalsScreen';
import AssessScreen from './src/screens/AssessScreen';
import AssessmentsScreen from './src/screens/AssessmentsScreen';
import AccountScreen from './src/screens/AccountScreen';
// TRIAGE SCREENS
import SpeciesAnimalsScreen from './src/screens/SpeciesAnimalsScreen';
import IdentifyAnimalScreen from './src/screens/IdentifyAnimalScreen';
import SituationAnimalScreen from './src/screens/SituationAnimalScreen';
import DetailsAnimalScreen from './src/screens/DetailsAnimalScreen';
import SuccessAnimalScreen from './src/screens/SuccessAnimalScreen';
import ProblemAnimalScreen from './src/screens/ProblemAnimalScreen';
// ASSESS SCREENS
import CarcassAssessScreen from './src/screens/CarcassAssessScreen';
import RackAssessScreen from './src/screens/RackAssessScreen';
import InstructionsRackAssessScreen from './src/screens/InstructionsRackAssessScreen';
import InstructionsCarcassAssessScreen from './src/screens/InstructionsCarcassAssessScreen';
import CameraScreen from './src/screens/CameraScreen';
import WaitImageAnalysisCarcassScreen from './src/screens/WaitImageAnalysisCarcassScreen';
import WaitImageAnalysisRackScreen from './src/screens/WaitImageAnalysisRackScreen';
import SuccessAnalysisCarcassScreen from './src/screens/SuccessAnalysisCarcassScreen';
import SuccessAnalysisRackScreen from './src/screens/SuccessAnalysisRackScreen';
import ProblemAnalysisCarcassScreen from './src/screens/ProblemAnalysisCarcassScreen';
import ProblemAnalysisRackScreen from './src/screens/ProblemAnalysisRackScreen';


// CONSTANTS AND COMPONENTS
import BottomBarIcons from './src/components/BottomBarIcons';
import { COLORS } from './src/constant/colors';
import { icons } from './src/constant/icons';
import store from './src/context/store';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function SortingStackScreens() {
  return (
    <Stack.Navigator initialRouteName="IdentifyAnimal" screenOptions={{headerShown: false}}>
      <Stack.Screen name="IdentifyAnimal" component={IdentifyAnimalScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SituationAnimal" component={SituationAnimalScreen} />
      <Stack.Screen name="SpeciesAnimals" component={SpeciesAnimalsScreen}/>
      <Stack.Screen name="DetailsAnimal" component={DetailsAnimalScreen} />
      <Stack.Screen name="SuccessAnimal" component={SuccessAnimalScreen}/>
      <Stack.Screen name="ProblemAnimal" component={ProblemAnimalScreen}/>
    </Stack.Navigator>
  );
}

function AssessStackScreens() {
  return (
    <Stack.Navigator initialRouteName="Assess" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Assess" component={AssessScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CarcassAssess" component={CarcassAssessScreen} />
      <Stack.Screen name="RackAssess" component={RackAssessScreen} />
      <Stack.Screen name="InstructionsRackAssess" component={InstructionsRackAssessScreen} />
      <Stack.Screen name="InstructionsCarcassAssess" component={InstructionsCarcassAssessScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="WaitImageAnalysisCarcass" component={WaitImageAnalysisCarcassScreen} />
      <Stack.Screen name="WaitImageAnalysisRack" component={WaitImageAnalysisRackScreen} />
      <Stack.Screen name="SuccessAnalysisCarcass" component={SuccessAnalysisCarcassScreen} />
      <Stack.Screen name="SuccessAnalysisRack" component={SuccessAnalysisRackScreen} />
      <Stack.Screen name="ProblemAnalysisCarcass" component={ProblemAnalysisCarcassScreen} />
      <Stack.Screen name="ProblemAnalysisRack" component={ProblemAnalysisRackScreen} />
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
      </NavigationContainer>
    </Provider>
  );
}
