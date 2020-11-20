import React, { useState, PureComponent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from "react-native-extended-stylesheet"

const  Camera =()=> {
    const [shot,setShot] = useState("");

    const takePicture = async () => {
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const data = await camera.takePictureAsync(options);
            // console.log(data.uri);
            setShot(data.uri);
        }
    }
    var camera;
        return (
            <View style={styles.container}>
                {
                    shot 
                    ?   <View style={styles.preview}>
                            <Image source={{ uri: shot }} style={{width: "100%", height:"100%"}}/>
                        </View>
                    :   <RNCamera
                            ref={ref => camera = ref}
                            style={styles.preview}
                            type={RNCamera.Constants.Type.back}
                            flashMode={RNCamera.Constants.FlashMode.on}
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
                            onGoogleVisionBarcodesDetected={({ barcodes }) => {
                                console.log(barcodes);
                            }}
                        />
                }
                
                <View style={styles.below}>
                    <View style={styles.capture}>
                        <TouchableOpacity onPress={takePicture}>
                            <Icon name="circle-o" color="#fff" size={60} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.capture}>
                        <TouchableOpacity onPress={takePicture}>
                            <Icon name="circle-o" color="#fff" size={60} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.capture}>
                        <TouchableOpacity onPress={takePicture}>
                            <Icon name="circle-o" color="#fff" size={60} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  preview: {
    flex: 1
  },
  below: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "20rem",
    borderTopWidth: 1
  },
  capture: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    // border: 1,
    
    // position: "absolute",

    // borderRadius: 5,
    // padding: 15,
    // paddingHorizontal: 20,
    // alignSelf: 'center',
    // margin: 20,
  }
})
export default Camera;