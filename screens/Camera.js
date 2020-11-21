import React, { useState, PureComponent, useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImagePicker from "react-native-image-crop-picker"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from "react-native-vector-icons/Ionicons"
import EStyleSheet from "react-native-extended-stylesheet"

const Camera =()=> {
    const [shot,setShot] = useState("");
    const [type,setType] = useState(true)
    const [flash,setFlash] = useState(false);

    // const [timer,setTimer] = useState(0);
    const [time,setTime] = useState(0);

    const [ratios,setRatios] = useState(["4:3", "11:9", "16:9"]);

    const [rNum,setRNum] = useState(0);
    var timer = 0
    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height
    // const 
    const takePicture = async () => {
        if (camera) {
            const options = { quality: 0.75, base64: true };
            const data = await camera.takePictureAsync(options);
            setShot(data.uri);
        }
    }

    
    

    const getFromGallery = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 300
        }).then(image => {
          setShot(image.path);
        })
    }

    var camera;
    return (
        <View style={styles.container}>
            
            <View style={styles.above}>
                <View style={styles.btn}>
                    <TouchableOpacity
                        onPress={() => setTime(time > 5 ? 0 : time + 2)}
                        style={{ flexDirection:"row", position: "relative" }}
                    >
                        <Ionicons name="ios-time" color="#fff" size={20} />
                        {
                            time ? <Text style={{color:"#fff", fontSize: 10, position: "absolute", right: -10, top: -4}}>{time}s</Text> : null
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={() => setRNum(rNum === ratios.length - 1 ? 0 : rNum + 1)}>
                        <Ionicons name="ios-barcode" color="#fff" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={() => setFlash(!flash)}>
                        <Icon name="flash" color="#fff" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={() => setType(!type)}>
                        <Icon name="repeat" color="#fff" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
            {
                shot 
                ?   <View style={styles.preview}>
                        <Image source={{ uri: shot }} style={{width: "100%", height:"100%"}}/>
                    </View>
                :   <View style={styles.preview}>
                            {/* <View style={{position: "absolute", flex: 1, zIndex: 2}}>
                                <Text style={{color: "#fff", fontSize: 160 }}>{time}</Text>
                            </View> */}
                            <RNCamera
                                ratio={ratios[rNum]}
                                // ratio="4:3"
                                ref={ref => camera = ref}
                                style={{ flex: 1, width: "100%" }}
                                type={type ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
                                flashMode={flash ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
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
                        {/* </View> */}
                    </View>
            }
            <View style={styles.below}>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={getFromGallery}>
                        <Ionicons name="ios-document" color="#fff" size={60} />
                    </TouchableOpacity>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={takePicture}>
                        <Icon name="circle-o" color="#fff" size={60} />
                    </TouchableOpacity>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={takePicture}>
                        <Ionicons name="ios-aperture" color="#fff" size={60} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // position: "relative"
  },
  above: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "15rem",
    borderBottomWidth: 1,
    // opacity: 0.4
  },
  preview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2d2b2b",
    position: "relative"
  },
  test: {
    // flex:1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "red",
    // width: "100%",
    // height: Dimensions.get("window").width * 1 / 1,
    // overflow: "hidden"
    // height: 30
    // backgroundColor: "red",
    // padding: 100
  }, // 4:3 11:9 16:9
  image: {
    flex: 1,
    // width: auto,
    // height: Dimensions.get("window").width * 1 / 1,
    // width: "100%",
    // overflow: "hidden"
    // height: "10%"
    // height: "100%"
    // height: "100%"
    // aspectRatio: 4/3
    // height: "30rem"
  },
  below: {
    // flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "red",
    height: "30rem",
    borderTopWidth: 1
  },
  btn: {
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