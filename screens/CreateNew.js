import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler"
import ImagePicker from "react-native-image-crop-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import { Overlay } from "react-native-elements"
import Ionicons from "react-native-vector-icons/Ionicons"
import EStyleSheet from "react-native-extended-stylesheet"
import { useDidMountEffect } from "../utils"

const CreateNew = (props) => {
    const navigation = useNavigation();
    const [products,setProducts] = useState([]);

    const [propss,setPropss] = useState([
        {
            id: 0,
            key: "Tên sản phẩm",
            value: ""
        },
        {
            id: 1,
            key: "Số lượng",
            value: ""
        },
        {
            id: 2,
            key: "Giá nhập",
            value: ""
        },
        {
            id: 3,
            key: "Giá bán",
            value: ""
        }
    ])

    const [initialPropss,setInitialPropss] = useState([
        {
            id: 0,
            key: "Tên sản phẩm",
            value: ""
        },
        {
            id: 1,
            key: "Số lượng",
            value: ""
        },
        {
            id: 2,
            key: "Giá nhập",
            value: ""
        },
        {
            id: 3,
            key: "Giá bán",
            value: ""
        }
    ])

    const [newAttr, setNewAttr] = useState("");

    const [img1,setImg1] = useState("");
    const [img2,setImg2] = useState("");
    const [img3,setImg3] = useState("");
    const [img4,setImg4] = useState("");
    const [img5,setImg5] = useState("");
    const [img6,setImg6] = useState("");
    const [imgNum,setImgNum] = useState(0);

    const [visibleImg,setVisibleImg] = useState(false);
    const [visibleSuccess,setVisibleSuccess] = useState(false);
    const [visibleAdd,setVisibleAdd] = useState(false);
    
    const [hasErr, setHasErr] = useState(false);
    const [addErr, setAddErr] = useState(false);

    // useDidMountEffect(() => {
    //     const { url, imgId } = props.route.params;
    //     if (url) {
    //         switch (imgId) {
    //             case "img1":
    //                 setImg1(url);
    //                 break;
    //             case "img2":
    //                 setImg1(url);
    //                 break;
    //             case "img3":
    //                 setImg1(url);
    //                 break;
    //             case "img4":
    //                 setImg1(url);
    //                 break;
    //             case "img5":
    //                 setImg1(url);
    //                 break;
    //             case "img6":
    //                 setImg1(url);
    //                 break;
    //         }
    //     }
    // },[props.route.params])

    // CHANGE VALUE IN INPUT
    const changeValue = (id, val) => {
        var clonePropss = propss;
        const find = clonePropss.find(item => item.id === id);
        clonePropss = [
            ...propss.slice(0, id),
            { ...find, value: val},
            ...propss.slice(id + 1, propss.length)
        ]
        setPropss(clonePropss);
    }

    // ADD NEW ATTRIBUTE
    const addAttribute = () => {
        // CHECK INPUT DATA
        if (newAttr === "") {
            setAddErr(true);
            return;
        }

        var clonePropss = propss;
        const newPropss = {
            id: clonePropss.length,
            key: newAttr,
            value: ""
        }
        clonePropss = [
            ...propss,
            newPropss
        ]
        setPropss(clonePropss);
        setNewAttr("");
        setVisibleAdd(false);
    }

    const toggleOverlay = () => {
        setVisibleAdd(false);
        setVisibleSuccess(false);
        setVisibleImg(false);
        setAddErr(false);
    };

    // const goToCamera = (numImg) => {
    //     navigation.navigate("TestCamera", { imgId: numImg })
    // }

    // SHOW MODAL TO CHOOSE WAY TO GET IMAGE
    const showModal = (num) => {
        setVisibleImg(true);
        setImgNum(num);
    }
    
    const backToHome = () => {
        setVisibleSuccess(false);
        navigation.navigate("ProductList", { hasNew: true });
    }

    // TAKE IMAGE FROM CAMERA OPTION
    const getFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400
        }).then(image => {
            switch (imgNum) {
                case 1:
                    setImg1(image.path);
                    break;
                case 2:
                    setImg2(image.path);
                    break;
                case 3:
                    setImg3(image.path);
                    break;
                case 4:
                    setImg4(image.path);
                    break;
                case 5:
                    setImg5(image.path);
                    break;
                case 6:
                    setImg6(image.path);
                    break;
                default:
                    break;
            }
        }).then(setVisibleImg(false));
    }

    // TAKE VIDEO FROM CAMERA OPTION
    const getVideoFromCamera = () => {
        ImagePicker.openCamera({
            mediaType: "video"
        }).then(video => {
            switch (imgNum) {
                case 1:
                    setImg1(video.path);
                    break;
                case 2:
                    setImg2(video.path);
                    break;
                case 3:
                    setImg3(video.path);
                    break;
                case 4:
                    setImg4(video.path);
                    break;
                case 5:
                    setImg5(video.path);
                    break;
                case 6:
                    setImg6(video.path);
                    break;
                default:
                    break;
            }
        }).then(setVisibleImg(false));
    }

    // GET IMAGE FROM GALLERY OPTION
    const getFromGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400
        }).then(image => {
            switch (imgNum) {
                case 1:
                    setImg1(image.path);
                    break;
                case 2:
                    setImg2(image.path);
                    break;
                case 3:
                    setImg3(image.path);
                    break;
                case 4:
                    setImg4(image.path);
                    break;
                case 5:
                    setImg5(image.path);
                    break;
                case 6:
                    setImg6(image.path);
                    break;
                default:
                    break;
            }
        }).then(setVisibleImg(false))
    }

    // GET VIDEO FROM GALLERY OPTION
    const getVideoFromGallery = () => {
        ImagePicker.openPicker({
            mediaType: "video"
        }).then(video => {
            switch (imgNum) {
                case 1:
                    setImg1(video.path);
                    break;
                case 2:
                    setImg2(video.path);
                    break;
                case 3:
                    setImg3(video.path);
                    break;
                case 4:
                    setImg4(video.path);
                    break;
                case 5:
                    setImg5(video.path);
                    break;
                case 6:
                    setImg6(video.path);
                    break;
                default:
                    break;
            }
        }).then(setVisibleImg(false))
    }
    
    useEffect(() => {
        getData();
    },[])

    // ONPRESS SAVE BUTTON
    const handleSave = () => {
        // CHECK FIELDS
        for (var j = 0; j < propss.length; j++) {
            if (propss.find(i => i.id == j).value == "") {
                setHasErr(true);
                return;
            }
        }
        
        // CREATE IMAGE LIST
        var imgList = [];
        img1 && imgList.push(img1)
        img2 && imgList.push(img2)
        img3 && imgList.push(img3)
        img4 && imgList.push(img4)
        img5 && imgList.push(img5)
        img6 && imgList.push(img6)

        // CREATE NEW PRODUCT
        const product = {
            id: String(products.length+1),
            name: propss.find(i => i.id == 0).value,
            quantity: propss.find(i => i.id == 1).value,
            pricein: propss.find(i => i.id == 2).value,
            priceout: propss.find(i => i.id == 3).value,
            imageUrl: imgList
        }
        for (var j = 4; j < propss.length; j++) {
            product[`${propss.find(i => i.id == j).key}`] = propss.find(i => i.id == j).value || ""
        }
        
        // SAVE PRODUCT
        products.push(product);
        storeData(products);

        // RESET STATE
        setImg1("");
        setImg2("");
        setImg3("");
        setImg4("");
        setImg5("");
        setImg6("");
        setHasErr(false);
        setPropss(initialPropss);
        setVisibleSuccess(true);
    }

    // GET DATA FROM STORAGE
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('products');
            jsonValue != null ? setProducts(JSON.parse(jsonValue)) : null;
        } catch(e) {
            console.log(e);
        }
    }

    // SAVE DATA TO STORAGE
    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('products', jsonValue)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            <Overlay 
                isVisible={visibleImg}
                onBackdropPress={toggleOverlay}
                overlayStyle={{ borderRadius: 10 }}
            >
                <View style={{ backgroundColor: "#FFF", justifyContent: "center", alignItems: "center", width: 300}}>
                    <TouchableOpacity
                        style={[styles.btn, { marginTop: 5 }]}
                        activeOpacity={.7}
                        onPress={getFromCamera}
                    >
                        <Text style={styles.btnText}>Chụp Ảnh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, { marginTop: 15 }]}
                        activeOpacity={.7}
                        onPress={getVideoFromCamera}
                    >
                        <Text style={styles.btnText}>Quay Video</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, { marginTop: 15 }]}
                        activeOpacity={.7}
                        onPress={getFromGallery}
                    >
                        <Text style={styles.btnText}>Lấy Ảnh Từ Thư Viện</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, { marginVertical: 15 }]}
                        activeOpacity={.7}
                        onPress={getVideoFromGallery}
                    >
                        <Text style={styles.btnText}>Lấy Video Từ Thư Viện</Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
            <Overlay 
                isVisible={visibleSuccess}
                onBackdropPress={toggleOverlay}
                overlayStyle={{ borderRadius: 10 }}
            >
                <View style={{ backgroundColor: "#FFF", justifyContent: "center", alignItems: "center", width: 300}}>
                    <Text style={{ marginVertical: 10 }}>Lưu thành công!!!</Text>
                    <TouchableOpacity
                        style={[styles.btn,{ marginVertical: 5 }]}
                        activeOpacity={.7}
                        onPress={backToHome}
                    >
                        <Text style={styles.btnText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
            <Overlay 
                isVisible={visibleAdd}
                onBackdropPress={toggleOverlay}
                overlayStyle={{ borderRadius: 10 }}
            >
                <View style={{ backgroundColor: "#FFF", justifyContent: "center", alignItems: "center", width: 300}}>
                    <TextInput 
                        style={{backgroundColor:"#ddd", width:"95%", marginVertical: 5, borderRadius: 5 }}
                        value={newAttr}
                        placeholder="Tên thuộc tính"
                        placeholderTextColor="#000"
                        onChangeText={val => setNewAttr(val)}
                    />
                    { addErr ? <Text style={[styles.error, { marginVertical: 5 }]}>Bạn chưa nhập tên thuộc tính!!!</Text> : null }
                    <TouchableOpacity
                        style={[styles.btn,{ marginTop: 5, marginBottom: 5 }]}
                        activeOpacity={.7}
                        onPress={addAttribute}
                    >
                        <Text style={styles.btnText}>Thêm</Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}
            >
                <Text style={styles.infoText}>Hình ảnh mô tả:</Text>
                <View style={{ flexDirection:"row" }}>
                    <TouchableOpacity 
                        style={[styles.imgBtn, styles.imgBtnl]}
                        activeOpacity={.8}
                        onPress={() => showModal(1)}
                    >
                        {img1 !== "" ? <Image source={{ uri: img1 }} style={styles.imgCtn}/> : <Text style={[styles.plus, { fontSize:40 }]}>+</Text>}
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity 
                            style={[styles.imgBtn, { marginTop: 0}]}
                            activeOpacity={.8}
                            onPress={() => showModal(2)}
                        >
                            {img2 !== "" ? <Image source={{ uri: img2 }} style={styles.imgCtn}/> : <Text style={styles.plus}>+</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.imgBtn}
                            activeOpacity={.8}
                            onPress={() => showModal(3)}
                        >
                            {img3 !== "" ? <Image source={{ uri: img3 }} style={styles.imgCtn}/> : <Text style={styles.plus}>+</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection:"row" }}>
                    <TouchableOpacity
                        style={[styles.imgBtn, { marginLeft: 0 }]}
                        activeOpacity={.8}
                        onPress={() => showModal(4)}
                    >
                        {img4 !== "" ? <Image source={{ uri: img4 }} style={styles.imgCtn}/> : <Text style={styles.plus}>+</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.imgBtn}
                        activeOpacity={.8}
                        onPress={()=>showModal(5)}
                    >
                        {img5 !== "" ? <Image source={{ uri: img5 }} style={styles.imgCtn}/> : <Text style={styles.plus}>+</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.imgBtn}
                        activeOpacity={.8}
                        onPress={()=>showModal(6)}
                    >
                        {img6 !== "" ? <Image source={{ uri: img6 }} style={styles.imgCtn}/> : <Text style={styles.plus}>+</Text>}
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={propss}
                    renderItem={({ item }) => (
                        <View style={styles.info}>
                            <Text style={styles.infoText}>{item.key}:</Text>
                            <TextInput 
                                style={styles.input}
                                value={item.value}
                                keyboardType={item.key.substring(0,4) === "Giá" || item.key.substring(0,3) === "Số" ? "numeric" : "default"}
                                onChangeText={val => changeValue(item.id, val)}
                            />
                        </View>
                    )}
                    keyExtractor={(item) => `${item.key}`}
                />
                <View style={[styles.info, { flexDirection:"row", alignItems: "center", justifyContent: "space-between" }]}>
                    <Text style={styles.infoText}>Thêm thuộc tính mới:</Text>
                    <TouchableOpacity
                        onPress={() => setVisibleAdd(true)}
                    >
                        <Ionicons name="ios-add-circle" size={60} color="#00A878" />
                    </TouchableOpacity>
                </View>
                {
                    hasErr ? <Text style={styles.error}>Hãy nhập đầy đủ thông tin!!!</Text> : null
                }
                <TouchableOpacity 
                    style={styles.submitBtn}
                    activeOpacity={.8}
                    onPress={handleSave}
                >
                    <Text style={styles.submitText} activeOpacity={.8}>lưu sản phẩm</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
};

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        backgroundColor: "#F0F2EF",
        // padding: 16
    },
    scroll: {
        padding: 16
        // width: "100%"
    },
    imgCtn: {
        width: "100%",
        height: "100%"
    },
    imgBtnl: {
        width: "60rem",
        marginLeft: 0,
        marginTop: 0
    },
    imgBtn: {
        width: "28rem",
        aspectRatio: 1/1,
        justifyContent: "center",
        alignItems: "center",
        margin: "2rem",
        backgroundColor: "#fff",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2
    },
    plus: {
        fontSize: "5rem",
        fontWeight: "600"
    },
    info: {
        marginTop: "6rem"
    },
    infoText: {
        fontWeight: "bold",
        fontSize: "4.5rem",
        marginBottom: "2rem"
    },
    input: {
        backgroundColor: "#fff",
        height: "13rem",
        width: "100%",
        padding: "2rem",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 1,
    },
    submitBtn: {
        marginTop: "3rem",
        backgroundColor: "#00A878",
        paddingVertical: "4rem",
        width: "90%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2
    },
    submitText: {
        fontSize: "4.5rem",
        color:"#fff",
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    btn: {
        backgroundColor: "#00A878",
        width: "95%",
        alignItems: "center",
        paddingVertical: "4rem",
        borderRadius: 5
    },
    btnText: {
        fontSize: "4rem",
        color: "#fff",
        fontWeight: "700",
        textTransform: "uppercase",
    },
    error: {
        alignSelf: "center",
        color: "red",
        fontSize: "3.8rem",
        fontWeight: "bold"
    }
})

export default CreateNew;