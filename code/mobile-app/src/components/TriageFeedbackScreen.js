import React, {useContext} from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../constant/colors";
import { fontSizes } from "../constant/fontSizes";
import { Context as SortingContext } from "../context/SortingContext/Context";

const TriageFeedbackScreen = ({ navigation, nextRoute, icon, text }) => {

    const { setCode } = useContext(SortingContext)

    const handleNextAnimal = ()=> {
        setCode('')
        navigation.navigate(nextRoute)
    }

    return (
        <>
            {icon}
            <Text style={styles.textStyle}>{text}</Text>
            <TouchableOpacity
                onPress={handleNextAnimal}
                style={styles.buttonNextStyle}
            >
                <Text style={styles.textButtonNextStyle}>Próximo animal</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonExitStyle}
                onPress={()=>navigation.navigate('Animais')}
            >
                <Text style={styles.textButtonExitStyle}>Ir à lista de animais</Text>
            </TouchableOpacity>
        </>
    )
}

TriageFeedbackScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
}

const styles = StyleSheet.create({
    textStyle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: fontSizes.descriptionTextSize,
        color: COLORS.black,
        textAlign: "center",
        marginBottom: 30,
        marginTop: 30,
        width: 300,
        paddingHorizontal: 20,
    },
    buttonExitStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonNextStyle: {
        height: 60,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        color: COLORS.main,
        borderRadius: 10,
        shadowColor: COLORS.black,
        borderColor: COLORS.main,
        borderWidth: 3,
        backgroundColor: COLORS.main,
        marginBottom: 15,
    },
    textButtonNextStyle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 20,
        color: "#fff",
        textAlign: "center",
    },
    textButtonExitStyle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 15,
        color: COLORS.main,
        textAlign: "center",
    },
});

export default TriageFeedbackScreen;