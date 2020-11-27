import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import { RNCamera } from 'react-native-camera';
import ImagePicker from "react-native-image-crop-picker"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from "react-native-vector-icons/Ionicons"
import EStyleSheet from "react-native-extended-stylesheet"
import ImageEditor from "@react-native-community/image-editor"
import { useNavigation } from "@react-navigation/native"
import ViewShot from "react-native-view-shot";
import { FlatList } from 'react-native-gesture-handler';
import ImageFilter from "../components/ImageFilter"

const Camera = () => {
    const navigation = useNavigation();
    const [shot,setShot] = useState("");
    const [type,setType] = useState(true)
    const [flash,setFlash] = useState(false);

    const [time,setTime] = useState(0);
    const [timeOnTop,setTimeOnTop] = useState(0);
    const [timeVisible,setTimeVisible] = useState(false);

    const [ratios,setRatios] = useState(["Full", "1:1", "4:3", "11:9"]);
    const [rNum,setRNum] = useState(0);

    // const cropViewRef = useRef();
    var camera;
    const options = { quality: 0.75, base64: true };

    // DEVICE DIMENSIONS
    const deviceHeight = Dimensions.get("window").height;
    const deviceWidth = Dimensions.get("window").width;

    // FRAME HEIGHT ARRAY AND INDEX
    const [frameHeight,setFrameHeight] = useState([deviceHeight * 0.75, deviceWidth, deviceWidth * 4 / 3, deviceWidth * 11 / 9]);
    const [fNum,setFNum] = useState(0);

    const customImageStyle = {
        width: "100%",
        height: frameHeight[fNum],
        overflow: "hidden",
        alignItems:"center",
        justifyContent:"center",
        position: "relative"
    }

    const customImageStyle2 = {
        width: "100%",
        height: frameHeight[fNum],
        alignItems:"center",
        justifyContent:"center"
    }

    const [overlayColors,setOverlayColors] = useState(["red", "green", "blue", "pink", "yellow"])

    // const takePicture = async (camera) => {
    //     if (camera) {
    //         var imageWidth;
    //         var imageHeight;
    //         var remain = rNum == 0 ? 0 : (frameHeight[fNum] / 4)
    //         const data = await camera.takePictureAsync(options);
    //         await Image.getSize(data.uri, (width, height) => {
    //             imageWidth = width;
    //             imageHeight = height;
    //         })
    //         await ImageEditor.cropImage(data.uri, {
    //             offset: {
    //                 x: ((deviceHeight * 0.07 + ((deviceHeight * 0.78 - frameHeight[fNum]) / 2)) / deviceHeight) * imageHeight,
    //                 y: 0
    //             },
    //             size: {
    //                 width: imageHeight * (frameHeight[fNum] / (deviceHeight * 0.78)),
    //                 height: imageWidth
    //             }
    //           }).then(url => {
    //             // setShot(url);
    //             navigation.navigate("Edit", {url: url})
    //         })
    //         // setShot(data.uri);
    //         // await navigation.navigate("Edit", {url: shot})
    //     }
    // }

    // SET TIMER
    const setTimer = () => {
        setTime(time > 5 ? 0 : time + 2);
        setTimeOnTop(time > 5 ? 0 : time + 2);
    }

    // CHECK TIMER AND CAPTURE IMAGE
    const checkTimer = async (viewShot) => {
        if (time == 0) {
            handleCapture(viewShot);
        }
        else {
            setTimeVisible(true);
            const interval = setInterval(() => {
                setTime(time => {
                    if (time == 0) {
                        clearInterval(interval);
                        // takePicture(camera);
                        setTimeOnTop(0);
                        handleCapture(viewShot);
                        // console.log("testing here")
                        return time;
                    }
                    return time - 1;
                });
            }, 1000);
            // handleCapture();
        }
    }

    // GET IMAGE FROM GALLERY
    const getFromGallery = () => {
        ImagePicker.openPicker({
        }).then(image => {
        //   setShot(image.path);
          navigation.navigate("Edit", {
            url: image.path,
            ratio: "Full"
        })
        })
    }

    // CHANGE IMAGE RATIO
    const changeRatio = () => {
        setFNum(fNum === frameHeight.length - 1 ? 0 : fNum + 1);
        setRNum(rNum === ratios.length - 1 ? 0 : rNum + 1);
    }
    
    // CAPTURE IMAGE
    var viewShot;
    var viewShot2;

    const handleCapture = (viewShot) => {
        if (viewShot) {
            viewShot.capture().then(uri => {
                setShot(uri);
                // checkTimer(viewShot);
                // handleCapture2(viewShot2);
                // navigation.navigate("Edit", {
                //     url: uri,
                //     ratio: ratios[rNum]
                // })
                // handleCapture2(viewShot2)
                // setTimeout(handleCapture2(viewShot2),5000)
                
            });
        }
    }

    const handleCapture2 = (viewShot2) => {
        // console.log("viewShot22222")
        if (viewShot2) {
            viewShot2.capture().then(uri => {
                // console.log("viewShot2")
                // setShot(uri);
                // checkTimer(viewShot);
                // handleCapture(viewShot, s);
                navigation.navigate("Edit", {
                    url: uri,
                    ratio: ratios[rNum]
                })
            });
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.above}>
                <View style={styles.btn}>
                    <TouchableOpacity
                        onPress={setTimer}
                        style={{ flexDirection:"row", position: "relative" }}
                    >
                        <Ionicons name="ios-time" color="#fff" size={20} />
                        {
                            time > 0 ? <Text style={{color:"#fff", fontSize: 10, position: "absolute", right: -10, top: -4}}>{timeOnTop}s</Text> : null
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity 
                        onPress={changeRatio}
                        style={{ flexDirection:"row", position: "relative" }}
                    >
                        <Ionicons name="ios-barcode" color="#fff" size={20} />
                        {
                            rNum > 0 ? <Text style={{color:"#fff", fontSize: 12, position: "absolute", left: 0, bottom: -13}}>{ratios[rNum]}</Text> : null
                        }
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
                // shot 
                // ?   <View style={styles.preview}>
                //         <View style={customImageStyle2}>
                //             <Image source={{ uri: shot }} style={{ width: "100%", height: "100%" }}/>
                //         </View>
                //     </View>
                // :   
                <View style={styles.preview}>
                        { timeVisible && time > 0
                            ?   <View style={{position: "absolute", flex: 1, zIndex: 2}}>
                                    <Text style={{color: "#fff", fontSize: 160 }}>{time}</Text>
                                </View>
                            : null
                        }
                        {
                            !shot ?
                            <ViewShot
                                style={customImageStyle}
                                ref={ref => viewShot = ref}
                                options={{ format: "jpg", quality: 0.9 }}
                            >   
                                <RNCamera
                                    ref={ref => camera = ref}
                                    style={{ width: "100%", height: "100%" }}
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
                                <View style={styles.overlay}></View>
                            </ViewShot>
                            :
                            <ViewShot
                                style={customImageStyle}
                                ref={ref => viewShot2 = ref}
                                options={{ format: "jpg", quality: 0.9 }}
                            >   
                                <Image 
                                    source={{ uri: shot }}
                                    style={{ width: "100%", height: "100%" }}
                                    // onLoad={()=>}
                                />
                                <View style={styles.overlay}></View>
                            </ViewShot>
                        }
                            
                            


                            {/* <Text style={styles.filters}>Hello</Text> */}
                            {/* <View style={styles.filters}>
                                <FlatList 
                                    data={overlayColors}
                                    renderItem={({ item }) => {
                                        // <ImageFilter color={item} />
                                        <Text style={{color:"red", fontSize: 20}}>hi</Text>
                                    }}
                                    keyExtractor={item => item}
                                    // style={styles.filters}
                                />
                            </View> */}
                    </View>
            }
            <View style={styles.below}>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={getFromGallery}>
                        <Ionicons name="ios-document" color="#fff" size={60} />
                    </TouchableOpacity>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={() => checkTimer(viewShot)}>
                        <Icon name="circle-o" color="#fff" size={60} />
                    </TouchableOpacity>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={()=>handleCapture2(viewShot2)}>
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
        justifyContent: "center"
    },
    above: {
        height: "7%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    preview: {
        height: "78%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2d2b2b",
        position: "relative",
        overflow: "hidden"
    },
    imageStyle: {
        width: "100%",
        height: "100%",
        flex: 1,
        alignItems:"center",
        justifyContent:"center"
    }, 
    below: {
        height: "15%",
        flexDirection: "row"
    },
    btn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    filters: {
        position: "absolute",
        backgroundColor: "#eee",
        width: 200,
        height: 200,
        // marginBottom: 200,
        bottom: 0,
        // left: 0,
        zIndex: 2
    },
    overlay: {
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "red",
        opacity: 0.12
    }
})

export default Camera;