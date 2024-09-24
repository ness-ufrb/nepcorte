import React, { useState, useContext, useRef } from "react";
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Alert, PixelRatio, Button } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { COLORS } from "../constant/colors";
import { captureRef } from 'react-native-view-shot';
import { CameraType } from "expo-camera/build/legacy/Camera.types";
import { Context as AssessmentsContext } from "../context/AssessContext/Context";

const CameraScreen = ({ navigation, route }) => {
    const [ facing, setFacing ] = useState(CameraType);
    const [ permission ] = useCameraPermissions();
    const { state, SetFile } = useContext(AssessmentsContext)
    
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
        format: 'png',
        });

        SetFile(photo)
      
        if (route.params === "Carcass") {
            navigation.navigate("WaitImageAnalysisCarcass");
        } else if (route.params === "Rack") {
            navigation.navigate("WaitImageAnalysisRack");
        } else {
            Alert.alert("Erro", "Parâmetro desconhecido!");
        }   

        console.log(photo)
    };

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
      }
    
      if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
          <View style={styles.container}>
            <Text style={styles.message}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
          </View>
        );
      }
    
      function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
      }

    return (
        <SafeAreaView style={styles.container}>
            <CameraView
                style={styles.camera}
                type={facing}
                ref={viewRef}
            >
                <View style={styles.controlContainer}>
                    {/* Botão para alternar a câmera */}
                    <TouchableOpacity style={styles.sideButton} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip</Text>
                    </TouchableOpacity>

                    {/* Botão para capturar a foto */}
                    <TouchableOpacity onPress={()=>{takePicture(); console.log(state)}} style={styles.captureButton}>
                        <View style={styles.buttonCamera} />
                    </TouchableOpacity>

                    {/* Exemplo de outro botão à direita */}
                    <TouchableOpacity style={styles.sideButton}>
                        <Text style={styles.text}>Another</Text>
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
    },
    controlContainer: {
        position: 'absolute',
        bottom: 30,
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
        borderColor: COLORS.gray,
        borderWidth: 3,
    },
    sideButton: {
        padding: 10,
        backgroundColor: COLORS.gray,
        borderRadius: 5,
    },
    text: {
        color: 'white',
    },
});

export default CameraScreen;
