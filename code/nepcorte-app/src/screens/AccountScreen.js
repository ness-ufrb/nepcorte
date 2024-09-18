import React, {useContext} from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import IconUnderConstruction from "../assets/icons/under-construction.svg";
import { COLORS } from "../constant/colors";
import { fontSizes } from "../constant/fontSizes";
import Header from "../components/Header";
import { Context as AuthContext } from "../context/UserContext/Context";

const FeatureConstruction = ({ navigation }) => {
    const { Logout } = useContext(AuthContext)
    
    const handleLogout = () => {
        Logout(navigation)
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header code="Conta"  navigation={navigation} notHasReturn={true}/>
            <View style={styles.form}>
                <IconUnderConstruction width={200} height={200} fill={COLORS.black}/>
                <Text style={styles.text}>Esta feature está em construção</Text>
            </View>
        {/* Botão de Deslogar */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Deslogar</Text>
            </TouchableOpacity>
           
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.screenBackgroungColor,
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: fontSizes.descriptionTextSize,
        color: COLORS.black,
        fontFamily: 'Inter-SemiBold',
        textAlign: 'center',
        paddingTop: 20,
    },
    logoutButton: {
        marginTop: 30,
        backgroundColor: COLORS.main, // Cor do botão
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    logoutButtonText: {
        fontSize: fontSizes.buttonTextSize,
        color: COLORS.white, // Cor do texto
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
    },
});

export default FeatureConstruction;