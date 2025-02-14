import React, {useContext, useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { COLORS } from "../constant/colors";
import WaitImage from "../components/WaitImage";
import { Context as AssessmentsContext } from "../context/AssessContext/Context";

// Esta tela depende do envio da imagem para o backend, falta implementar a rota caso sucesso ou caso erro.
// O mesmo para WaitImageAnalysisCarcassScreen.js

const WaitImageAnalysisRackScreen = ({ navigation }) => {

    const { state, CreateAssess } = useContext(AssessmentsContext);
    
    useEffect(() => {

        CreateAssess(state, navigation,'SuccessAnalysisRack', 'ProblemAnalysisRack');
       
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

export default WaitImageAnalysisRackScreen;
