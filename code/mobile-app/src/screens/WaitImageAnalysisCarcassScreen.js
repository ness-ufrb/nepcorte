import React, {useContext, useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { COLORS } from "../constant/colors";
import WaitImage from "../components/WaitImage";
import { Context as AssessmentsContext } from "../context/AssessContext/Context";

const WaitImageAnalysisCarcassScreen = ({ navigation }) => {

    const { state, CreateAssess } = useContext(AssessmentsContext);
    
    useEffect(() => {

        CreateAssess(state, navigation,'SuccessAnalysisCarcass', 'ProblemAnalysisCarcass');
       
    }, [state, navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <WaitImage title="Avaliar carcaça"/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.screenBackgroungColor,
        width: "100%",
        height: "100%",
    },
});

export default WaitImageAnalysisCarcassScreen;
