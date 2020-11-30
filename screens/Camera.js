import React, { useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import { RNCamera } from 'react-native-camera';
import ImagePicker from "react-native-image-crop-picker"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from "react-native-vector-icons/Ionicons"
import EStyleSheet from "react-native-extended-stylesheet"
import { useNavigation } from "@react-navigation/native"
import ViewShot from "react-native-view-shot";
import { ScrollView } from 'react-native-gesture-handler';
import Slider from "react-native-slider";

const imagePath = "https://www.wallpaperup.com/uploads/wallpapers/2013/12/16/197007/dcb22678e4bef0177420aa22196d540f.jpg"

const Camera = (props) => {
    const navigation = useNavigation();

    // DEVICE DIMENSIONS
    const deviceHeight = Dimensions.get("window").height;
    const deviceWidth = Dimensions.get("window").width;

    // FOR CAMERA
    var camera;
    const [type,setType] = useState(true)
    const [flash,setFlash] = useState(false);

    // TIME AND TIMER
    const [time,setTime] = useState(0);
    const [timeOnTop,setTimeOnTop] = useState(0);
    const [timeVisible,setTimeVisible] = useState(false);

    // RATIO OF IMAGE
    const [ratios,setRatios] = useState(["Full", "1:1", "4:3", "11:9"]);
    const [rNum,setRNum] = useState(0);

    // FRAME HEIGHT ARRAY AND INDEX
    const [frameHeight,setFrameHeight] = useState([deviceHeight * 0.75, deviceWidth, deviceWidth * 4 / 3, deviceWidth * 11 / 9]);
    const [fNum,setFNum] = useState(0);

    // OVERLAY COLOR
    const [overlayColors,setOverlayColors] = useState(["white", "red", "green", "blue", "pink", "yellow", "brown"])
    const [cNum,setCNum] = useState(0);

    // FILTER OPACITY
    const [opacity,setOpacity] = useState(0.12);

    // OVERLAY FILTER VISIBLE
    const [filterVisible,setFilterVisible] = useState(false);

    // SLIDER VALUE
    const [sliderValue, setSliderValue] = useState(0.15);

    // FRAME STYLE
    const customImageStyle = {
        width: "100%",
        height: frameHeight[fNum],
        overflow: "hidden",
        alignItems:"center",
        justifyContent:"center",
        position: "relative"
    }

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
                        setTimeOnTop(0);
                        handleCapture(viewShot);
                        return time;
                    }
                    return time - 1;
                });
            }, 1000);
        }
    }

    // GET IMAGE FROM GALLERY
    const getFromGallery = () => {
        ImagePicker.openPicker({
        }).then(image => {
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

    // CHANGE FILTERS
    const changeFilters = (num) => {
        setOpacity(0.12);
        setCNum(num)
    }
    
    // CAPTURE IMAGE
    var viewShot;
    const handleCapture = (viewShot) => {
        if (viewShot) {
            viewShot.capture().then(uri => {
                navigation.navigate("Edit", {
                    url: uri,
                    ratio: ratios[rNum],
                    color: overlayColors[cNum],
                    opacity: opacity
                })
            })
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
            <View style={styles.preview}>
                { timeVisible && time > 0
                    ?   <View style={{position: "absolute", flex: 1, zIndex: 2}}>
                            <Text style={{color: "#fff", fontSize: 160 }}>{time}</Text>
                        </View>
                    : null
                }
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
                        <View style={[styles.overlay,{ backgroundColor: overlayColors[cNum], opacity: opacity}]}></View>
                    </ViewShot>
                    {
                        filterVisible ?
                        <View style={styles.filtersContainer}>
                            <Slider
                                value={opacity}
                                onValueChange={value => setOpacity(value)}
                                step={0.02}
                                style={styles.slider}
                            />
                            <ScrollView 
                                style={styles.filters}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <TouchableOpacity style={styles.filter} onPress={()=>changeFilters(0)}>   
                                    <Image source={{uri:imagePath}} style={{width: "100%", height: "100%"}}/>
                                    <View style={[styles.overlay, { backgroundColor: "white"  }]}></View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.filter} onPress={()=>changeFilters(1)}>   
                                    <Image source={{uri:imagePath}} style={{width: "100%", height: "100%"}}/>
                                    <View style={[styles.overlay, { backgroundColor: "red"}]}></View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.filter} onPress={()=>changeFilters(2)}>   
                                    <Image source={{uri:imagePath}} style={{width: "100%", height: "100%" }}/>
                                    <View style={[styles.overlay, { backgroundColor: "green" }]}></View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.filter} onPress={()=>changeFilters(3)}>   
                                    <Image source={{uri:imagePath}} style={{width: "100%", height: "100%" }}/>
                                    <View style={[styles.overlay, { backgroundColor: "blue" }]}></View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.filter} onPress={()=>changeFilters(4)}>   
                                    <Image source={{uri:imagePath}} style={{width: "100%", height: "100%" }}/>
                                    <View style={[styles.overlay, { backgroundColor: "pink" }]}></View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.filter} onPress={()=>changeFilters(5)}>   
                                    <Image source={{uri:imagePath}} style={{width: "100%", height: "100%" }}/>
                                    <View style={[styles.overlay, { backgroundColor: "yellow" }]}></View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.filter} onPress={()=>changeFilters(6)}>   
                                    <Image source={{uri:imagePath}} style={{width: "100%", height: "100%" }}/>
                                    <View style={[styles.overlay, { backgroundColor: "brown" }]}></View>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                        : null
                    }
            </View>
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
                    <TouchableOpacity onPress={()=>setFilterVisible(!filterVisible)}>
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
    slider: {
        marginHorizontal: "3rem"
    },
    filtersContainer: {
        position: "absolute",
        width: "100%",
        height: "35rem",
        marginBottom: "3rem",
        bottom: 0,
        // flexDirection: "row"
    },
    filters: {
        // position: "absolute",
        // width: "100%",
        // height: "25rem",
        // marginBottom: "3rem",
        // bottom: 0,
        flexDirection: "row"
    },
    filter: {
        width: "25rem",
        height: "100%",
        marginHorizontal: "1.5rem"
    },
    overlay: {
        flex: 1,
        width: "100%",
        height: "100%",
        position: "absolute",
        opacity: 0.12
    }
})

export default Camera;