import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from "../constant/colors";

const CameraScreen = ({ navigation, route }) => {
    const camRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off); // Verifique a constante
    const [type, setType] = useState(Camera.Constants.Type.back); // Verifique a constante

    // Solicitar permissão da câmera
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    // Renderizar mensagem de permissão
    if (hasPermission === null) {
        return <View style={styles.container}><Text>Solicitando permissão...</Text></View>;
    }
    if (hasPermission === false) {
        return <View style={styles.container}><Text>Sem acesso à câmera</Text></View>;
    }

    // Função para alternar a câmera frontal/traseira
    const toggleCameraType = () => {
        setType(prevType => 
            prevType === Camera.Constants.Type.back 
            ? Camera.Constants.Type.front 
            : Camera.Constants.Type.back
        );
    };

    // Função para alternar o modo de flash
    const toggleFlash = () => {
        setFlashMode(prevFlashMode => 
            prevFlashMode === Camera.Constants.FlashMode.off 
            ? Camera.Constants.FlashMode.on 
            : Camera.Constants.FlashMode.off
        );
    };

    // Função para tirar foto
    const takePicture = async () => {
        if (camRef.current) {
            const photo = await camRef.current.takePictureAsync();
            setCapturedPhoto(photo.uri);
            console.log(photo);

            if (route.params?.type === "Carcass") {
                navigation.navigate("WaitImageAnalysisCarcass");
            } else if (route.params?.type === "Rack") {
                navigation.navigate("WaitImageAnalysisRack");
            } else {
                Alert.alert("Erro", "Parâmetro desconhecido!");
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Camera 
                style={styles.camera} 
                type={type} 
                flashMode={flashMode} 
                ref={camRef}
            >
                <View style={styles.controlContainer}>
                    {/* Botão para alternar o flash */}
                    <TouchableOpacity onPress={toggleFlash} style={styles.flashButton}>
                        <FontAwesome 
                            name={flashMode === Camera.Constants.FlashMode.on ? "flash" : "flash-off"} 
                            size={24} 
                            color={COLORS.white} 
                        />
                    </TouchableOpacity>

                    {/* Botão para alternar câmera */}
                    <TouchableOpacity onPress={toggleCameraType} style={styles.switchButton}>
                        <FontAwesome name="refresh" size={24} color={COLORS.white} />
                    </TouchableOpacity>

                    {/* Botão para tirar foto */}
                    <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
                        <View style={styles.buttonCamera} />
                    </TouchableOpacity>
                </View>
            </Camera>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    controlContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    flashButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 5,
    },
    switchButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 5,
    },
    captureButton: {
        alignSelf: 'center',
    },
    buttonCamera: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: COLORS.white,
        borderColor: COLORS.gray,
        borderWidth: 3,
    },
});

export default CameraScreen;
