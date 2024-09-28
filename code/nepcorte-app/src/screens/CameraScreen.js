import React, { useState, useContext, useRef, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Alert, PixelRatio, Button } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { COLORS } from "../constant/colors";
import { captureRef } from 'react-native-view-shot';

import { Context as AssessmentsContext } from "../context/AssessContext/Context";
import * as FileSystem from 'expo-file-system';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CameraType, FlashMode } from "expo-camera/build/legacy/Camera.types";

const CameraScreen = ({ navigation, route }) => {
    const [facing, setFacing] = useState(CameraType.back);
    const [permission, requestPermission] = useCameraPermissions();
    const { state, SetFile } = useContext(AssessmentsContext);
    const [flash, setFlash] = useState(FlashMode.off)

    useEffect(() => {
        if (!permission) {
            requestPermission(); // Apenas solicita a permissão
        }
    }, [permission, requestPermission]);

    const viewRef = useRef();
    const takePicture = async () => {
        const targetPixelCount = 1080; 
        const pixelRatio = PixelRatio.get(); 
        const pixels = targetPixelCount / pixelRatio;

        const photo = await captureRef(viewRef, {
            result: 'tmpfile',
            height: pixels,
            width: pixels,
            quality: 1,
            format: 'jpg',
        });

        // Converter o arquivo temporário para base64
        const base64Image = await FileSystem.readAsStringAsync(photo, { encoding: 'base64' });

        // Atualiza o estado com a imagem em base64
        SetFile(base64Image); 

        if (route.params === "Carcass") {
            navigation.navigate("WaitImageAnalysisCarcass");
        } else if (route.params === "Rack") {
            navigation.navigate("WaitImageAnalysisRack");
        } else {
            Alert.alert("Erro", "Parâmetro desconhecido!");
        }

        console.log(photo);
    };

    // Verificar permissões diretamente na renderização
    if (!permission) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === CameraType.back ? CameraType.front : CameraType.back)); // Alterna entre a câmera traseira e dianteira
    }
    function toggleFlash() {
        setFlash(current => (current === FlashMode.off ? FlashMode.on : FlashMode.off));
    }

    return (
        <SafeAreaView style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                ref={viewRef}
                flash={flash}
            >
                <View style={styles.controlContainer}>

                    <TouchableOpacity style={styles.sideButton} onPress={toggleCameraFacing}>
                        <Ionicons name="camera-reverse" size={35} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { takePicture(); console.log(state); }} style={styles.captureButton}>
                        <View style={styles.buttonCamera} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.sideButton} onPress={toggleFlash}>
                        {
                        flash === 'on' ? 
                        <Ionicons name="flash-off" size={32} color="white" /> : 
                        <Ionicons name="flash" size={32} color="white" />
                        } 
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
        height:'100%'
    },
    controlContainer: {
        position: 'absolute',
        bottom: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 30,
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
});

export default CameraScreen;
