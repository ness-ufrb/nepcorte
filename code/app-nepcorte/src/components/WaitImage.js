import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { COLORS } from "../constant/colors";
import Header from "../components/Header";
import IconHourglass from "../assets/icons/hourglass.svg"

const WaitImage = ({ title }) => {
    return (
        <View style={styles.container}>
            <Header notHasReturn={true} code={title}/>
            <View style={{paddingTop: "30%"}}/>
            <View style={styles.icon}>
                <IconHourglass width={200} height={200}/>
            </View>
            <Text style={styles.text}>Aguarde enquanto enviamos a imagem para análise</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Inter-SemiBold',
        color: COLORS.text,
        fontSize: 18,
        textAlign: 'center',
        paddingTop: "5%",
        paddingHorizontal: "18%",
    },
});

export default WaitImage;
