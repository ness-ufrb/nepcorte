import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from "../constant/colors";
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';

const CameraScreen = ({ navigation }) => {
    const camRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    async function takePicture() {
        if (camRef) {
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri);
            console.log(data);
            // onPress={() => {navigation.navigate(nextRoute)}}
            navigation.navigate("WaitImageAnalysisCarcass");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Camera 
                style={styles.camera} 
                type={CameraType.back} 
                ref={camRef}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={takePicture}
                    >
                        <View style={styles.buttonCamera}/>
                    </TouchableOpacity>
                </View>
            </Camera>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonCamera: {
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: COLORS.white,
        borderColor: COLORS.gray,
        borderWidth: 3,
    },
})

export default CameraScreen;