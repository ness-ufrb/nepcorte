import React, { useState, useContext, useRef, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Alert, Button, Linking, Platform } from "react-native";
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { COLORS } from "../constant/colors";
import { useCameraPermissions } from 'expo-camera'
import { Context as AssessmentsContext } from "../context/AssessContext/Context";
import Ionicons from '@expo/vector-icons/Ionicons';

const CameraScreen = ({ navigation, route }) => {
    const [facing, setFacing] = useState(CameraType.back);
    const [permission, requestPermission] = useCameraPermissions(); 
    const { SetFile } = useContext(AssessmentsContext);
    const [flash, setFlash] = useState(FlashMode.off);
    const cameraRef = useRef(null);

    useEffect(() => {
      if (!permission) {
        requestPermission();
      }
    }, [permission]);
    
    const takePicture = async () => {
        if (cameraRef.current) { 
            const options = { quality: 1, base64: true }; 
            const photo = await cameraRef.current.takePictureAsync(options);
            SetFile(photo.uri); 
    
            if (route.params === "Carcass") {
                navigation.navigate("WaitImageAnalysisCarcass");
            } else if (route.params === "Rack") {
                navigation.navigate("WaitImageAnalysisRack");
            } else {
                Alert.alert("Erro", "Parâmetro desconhecido!");
            }
        }
    };
    
    if (permission === false) {
        return (
          <View>
            <Text>Permissão para usar a câmera foi negada. Por favor, habilite-a nas configurações do dispositivo.</Text>
            <Button title="Abrir Configurações" onPress={() => Linking.openSettings()} />
          </View>
        );
    }

    if (!permission) {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>Precisamos da sua permissão para abrir a câmera.</Text>
            <Button onPress={requestPermission} title="Conceder permissão" />
        </View>
    );
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Permissão para usar a câmera foi negada. Por favor, habilite-a nas configurações.</Text>
                <Button title="Abrir Configurações" onPress={() => Linking.openSettings()} />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    function toggleFlash() {
        setFlash(current => (current === FlashMode.off ? FlashMode.on : FlashMode.off));
    }

    const handleExit = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <Camera
                style={styles.camera}
                type={facing}
                flashMode={flash}
                ref={cameraRef} 
            >
                <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
                    <Ionicons name="arrow-back-circle-sharp" size={45} color="white" />
                </TouchableOpacity>
                <View style={styles.controlContainer}>
                    <TouchableOpacity style={[styles.sideButton, styles.shadow]} onPress={toggleCameraFacing}>
                        <Ionicons name="camera-reverse" size={35} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
                        <View style={styles.buttonCamera} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.sideButton, styles.shadow]} onPress={toggleFlash}>
                        {flash === FlashMode.on ? 
                        <Ionicons name="flash-off" size={32} color="white" /> : 
                        <Ionicons name="flash" size={32} color="white" />}
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
        height: '100%',
    },
    controlContainer: {
        position: 'absolute',
        bottom: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 30,
        paddingBottom: Platform.OS === 'ios' ? '9%' : 0,
    },
    captureButton: {
        alignSelf: 'center',
        paddingHorizontal: 20,
    },
    buttonCamera: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: COLORS.white,
        borderColor: COLORS.main,
        borderWidth: 3,
        elevation: Platform.OS === 'android' ? 10 : 0, // Somente para Android
        shadowColor: Platform.OS === 'ios' ? "#000" : 'transparent',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },
    sideButton: {
        padding: 5,
        borderRadius: 5,
        elevation: Platform.OS === 'android' ? 10 : 0, 
       
    },
    text: {
        color: 'white',
    },
    exitButton: {
        padding: "6%", 
        flexDirection:'row',
        alignItems:'center',
        elevation: Platform.OS === 'android' ? 10 : 0, // Somente Android
    },
    shadow: {
        shadowColor: Platform.OS === 'ios' ? "#000" : 'transparent',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: Platform.OS === 'android' ? 10 : 0, // Somente Android
    }
});

export default CameraScreen;
