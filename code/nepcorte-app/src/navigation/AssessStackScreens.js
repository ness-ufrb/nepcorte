import React from 'react';
// Screens
import CarcassAssessScreen from '../screens/CarcassAssessScreen';
import RackAssessScreen from '../screens/RackAssessScreen';
import InstructionsRackAssessScreen from '../screens/InstructionsRackAssessScreen';
import InstructionsCarcassAssessScreen from '../screens/InstructionsCarcassAssessScreen';
import CameraScreen from '../screens/CameraScreen';
import WaitImageAnalysisCarcassScreen from '../screens/WaitImageAnalysisCarcassScreen';
import WaitImageAnalysisRackScreen from '../screens/WaitImageAnalysisRackScreen';
import SuccessAnalysisCarcassScreen from '../screens/SuccessAnalysisCarcassScreen';
import SuccessAnalysisRackScreen from '../screens/SuccessAnalysisRackScreen';
import ProblemAnalysisCarcassScreen from '../screens/ProblemAnalysisCarcassScreen';
import ProblemAnalysisRackScreen from '../screens/ProblemAnalysisRackScreen';
import AssessScreen from '../screens/AssessScreen';
// Provider
import { Provider as AssessmentsProvider } from "../context/AssessmentsContext/Context";
// Navigation
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function AssessStackScreens() {
    return (
      <AssessmentsProvider>
        <Stack.Navigator initialRouteName="Assess" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Assess" component={AssessScreen} />
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
      </AssessmentsProvider>
    );
  }