import React from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../constant/colors";
import StepsInstructions from "./StepsInstructions";
import IconTripod from "../assets/icons/tripod.svg";
import IconCamera from "../assets/icons/camera.svg";
import IconPhoto from "../assets/icons/photo.svg";

const InstructionsForm = ({ navigation, nextRoute, route, type }) => {
    return (
        <View>
            <Text style={styles.title}>Instruções</Text>
            <View style={styles.form}>
                <StepsInstructions 
                    step="Passo 1"
                    description="Acomode o celular numa base estável"
                    icon={<IconTripod width={70} height={75} fill={COLORS.black}/>}
                />
                <View style={{paddingTop: "5%"}}/>
                <StepsInstructions 
                    step="Passo 2"
                description={`Enquadre a câmera para fotografar toda a ${type}`}
                    icon={<IconPhoto width={75} height={80} fill={COLORS.black}/>}
                />
                <View style={{paddingTop: "5%"}}/>
                <StepsInstructions 
                    step="Passo 3"
                    description="Tire a foto e aguarde o processamento"
                    icon={<IconCamera width={70} height={70} fill={COLORS.black}/>}
                />
                <View style={{paddingTop: "10%"}}/>
                <TouchableOpacity
                    onPress={() => {navigation.navigate(nextRoute, route)}}
                    style={styles.buttonNextStyle}
                >
                    <Text style={styles.textButtonNextStyle}>Iniciar</Text>
                </TouchableOpacity>
                <View style={{paddingTop: "5%"}}/>
                <TouchableOpacity
                    style={styles.buttonCancelStyle}
                    onPress={() => {navigation.navigate("Assess")}}
                >
                    <Text style={styles.textButtonCancelStyle}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        paddingBottom: "10%",
        fontFamily: 'Inter-SemiBold',
        fontSize: 20,
        color: COLORS.black,
        textAlign: 'center',
    },
    form: {
        alignItems: 'center',
    },
    buttonNextStyle: {
        height: 60,
        width: "85%",
        justifyContent: 'center',
        alignItems: 'center',
        color: COLORS.main,
        borderRadius: 10,
        shadowColor: COLORS.black,
        borderColor: COLORS.main,
        borderWidth: 3,
        backgroundColor: COLORS.main,
        // marginBottom: 15,
    },
    textButtonNextStyle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 20,
        color: COLORS.white,
        textAlign: "center",
    },
    textButtonCancelStyle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 15,
        color: COLORS.main,
        textAlign: "center",
    },
    buttonCancelStyle: {
        paddingBottom: "5%",
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default InstructionsForm;