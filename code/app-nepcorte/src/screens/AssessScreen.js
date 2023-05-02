import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS } from "../constant/colors";
import Card from '../components/Card';
import Header from '../components/Header';
import IconPig from "../assets/icons/032-pig.svg"
import IconMeatloaf from "../assets/icons/035-meatloaf.svg"
import { fontSizes } from "../constant/fontSizes";

const AssessScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header notHasReturn={true} code="Avaliar" />
            <View style={styles.form}>
                <Text 
                    style={{ fontSize: fontSizes.titleTextSize, 
                        color: COLORS.black, 
                        fontFamily: 'Inter-Bold', 
                        textAlign: 'center',
                        paddingBottom: 20,
                    }}>
                    Escolha a parte a ser analisada
                </Text>
                <View style={styles.cards}>
                    <Card 
                        mainText="Carcaça" 
                        secText="Analisa aspectos da carcaça"
                        icon={<IconPig width={80} height={80} fill={COLORS.black} />}
                        navigation={navigation}
                        nextRoute="CarcassAssess"
                    />
                    <Card 
                        mainText="Carré" 
                        secText="Analisa a deposição de gordura"
                        icon={<IconMeatloaf width={70} height={70} fill={COLORS.black} />}
                        navigation={navigation}
                        nextRoute="RackAssess"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.screenBackgroungColor,
        width: "100%",
        height: "100%",
    },
    form: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});

export default AssessScreen;