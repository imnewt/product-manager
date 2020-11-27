import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native'
import { RNCamera } from 'react-native-camera';
import EStyleSheet from "react-native-extended-stylesheet"
import ViewShot from "react-native-view-shot";


const ImageFilter = (props) => {
    const { color } = props.route.params;
    return (
        <View style={styles.container}>   
            <RNCamera
                ref={ref => camera = ref}
                style={{width: "100%", height: "100%" }}
                type={type ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
                flashMode={flash ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            />
            <View style={[styles.overlay, { backgroundColor: color }]}></View>
        </View>
    )
};

const styles = EStyleSheet.create({
    container: {
        flex :1,
        // height: "78%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2d2b2b",
        position: "relative",
    },
    overlay: {
        width: "5rem",
        height: "10rem",
        position: "absolute",
        opacity: 0.1
    }
})

export default ImageFilter;