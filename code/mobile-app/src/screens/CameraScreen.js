import React, { useState, useContext, useRef, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Alert, Button, Linking, Platform } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { COLORS } from "../constant/colors";
import { PixelRatio } from "react-native";
import { Context as AssessmentsContext } from "../context/AssessContext/Context";
import Ionicons from '@expo/vector-icons/Ionicons';

const CameraScreen = ({ navigation, route }) => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const { state, SetFile } = useContext(AssessmentsContext);
    const { type_result } = state
    const [flash, setFlash] = useState('off');
    const cameraRef = useRef(null);

    const targetPixelCount = 1080;
    const pixelRatio = PixelRatio.get();
    
    const pixels = targetPixelCount / pixelRatio;

    useEffect(() => {
      if (!permission) {
        requestPermission();
      }
    }, [permission]);
    
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

    const takePicture = async () => {
        try {
            if (cameraRef.current) { 
                const photo = await cameraRef.current.takePictureAsync({ 
                    quality: 1, 
                    base64: true,
                    exif: true ,
                    pixels: pixels
                });
                
                SetFile(photo.uri);
        
                if (route.params === "Carcass") {
                    navigation.navigate("WaitImageAnalysisCarcass");
                } else if (route.params === "Rack") {
                    navigation.navigate("WaitImageAnalysisRack");
                } else {
                    Alert.alert("Erro", "Parâmetro desconhecido!");
                }
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Falha ao capturar imagem");
        }
    };
    
    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
      }

    function toggleFlash() {
        setFlash(current => (current === 'off' ? 'on' : 'off'));
    }

    const handleExit = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <CameraView style={styles.camera} facing={facing} flash={flash} ref={cameraRef}>
                <View style={styles.topView}>
                <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
                    <Ionicons name="arrow-back-circle" size={36} color="white"/>
                </TouchableOpacity>
                <View>
                    <Text style={styles.screenText}>{type_result}</Text>
                </View>
                <View style={styles.invisibleView}>
                
                </View>
                </View>
                <View style={styles.controlContainer}>
                    <TouchableOpacity style={[styles.sideButton]} onPress={toggleCameraFacing}>
                        <Ionicons name="camera-reverse" size={35} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
                        <View style={styles.buttonCamera} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.sideButton]} onPress={toggleFlash}>
                        {flash === 'on' ? 
                        <Ionicons name="flash-off" size={32} color="white" /> : 
                        <Ionicons name="flash" size={32} color="white" />}
                    </TouchableOpacity>
                </View>
            </CameraView>
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
    },
    sideButton: {
        padding: 5,
        borderRadius: 5,
    },
    text: {
        color: 'white',
    },
    exitButton: {
        
        flexDirection:'row',
        alignItems:'center',
        
    },
    topView: {
        position: 'absolute',
        top: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 30,
     
    },
    screenText:{
        color:'white',
        fontSize:20,
        fontWeight:'bold'
    },
    invisibleView:{
        width:38
    }
    
});

export default CameraScreen;
