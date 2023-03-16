import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { COLORS } from '../constant/colors';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
// ProgressSteps documentation: https://www.npmjs.com/package/react-native-progress-steps

const ProgressStepsMenu = () => {
    const [fontsLoaded] = useFonts({
        'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
        'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
        'Inter-Light': require('../assets/fonts/Inter-Light.ttf')
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={{ flex: 1 }}>
            <ProgressSteps
                completedCheckColor={COLORS.main}
                labelFontFamily='Inter-Light'
                labelColor={COLORS.gray}
                labelFontSize={20}
                completedLabelColor={COLORS.main}
                progressBarColor={COLORS.gray}
                disabledStepIconColor={COLORS.grayStep}
                activeLabelColor={COLORS.gray}
                activeStepNumColor={COLORS.white}
                activeStepIconBorderColor={COLORS.main}
                activeStepIconColor={COLORS.main}
                borderWidth={1}
                >
                <ProgressStep label="Vistoria" removeBtnRow={true}/>
                <ProgressStep label="Espécie" removeBtnRow={true}/>
                <ProgressStep label="Detalhes" removeBtnRow={true}/>
            </ProgressSteps>
        </View>
    )
};

const styles = StyleSheet.create({
});

export default ProgressStepsMenu;