import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Animated, Platform } from "react-native"
import { ScrollView, TextInput } from "react-native-gesture-handler"
import ImagePicker from "react-native-image-crop-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

const CreateNew = () => {
    const navigation = useNavigation();
    const [products,setProducts] = useState([]);

    const [name,setName] = useState("");
    const [quantity,setQuantity] = useState("");
    const [pricein,setPricein] = useState("");
    const [priceout,setPriceout] = useState("");

    const [img1,setImg1] = useState("");
    const [img2,setImg2] = useState("");
    const [img3,setImg3] = useState("");
    const [img4,setImg4] = useState("");
    const [img5,setImg5] = useState("");
    const [img6,setImg6] = useState("");
    
    const [imgNum,setImgNum] = useState(0);
    const [visible1,setVisible1] = useState(false);
    const [visible2,setVisible2] = useState(false);
    
    
    // SHOW MODAL TO CHOOSE WAY TO GET IMAGE
    const showModal = (num) => {
        setVisible1(true);
        setImgNum(num);
    }
    
    const backToHome = () => {
        setVisible2(false);
        navigation.navigate("ProductList")
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
        }).then(setVisible1(false));
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
        }).then(setVisible1(false))
    }

    useEffect(() => {
        getData();
    },[])

    // ONPRESS SAVE BUTTON
    const handleSave = () => {
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
            name,
            quantity,
            pricein,
            priceout,
            imageUrl: imgList
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
        setName("");
        setQuantity("");
        setPricein("");
        setPriceout("");

        setVisible2(true);
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
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible1}
            >
                <View style={{ flex: 1, backgroundColor: "#171718D1", justifyContent: "center", alignItems: "center"}}>
                    <View style={{ backgroundColor: "#FFF", width: "75%", borderRadius: 25, justifyContent: "center", alignItems: "center"}}>
                        <TouchableOpacity
                            style={[styles.btn, { marginTop: 30, marginBottom: 10 }]}
                            activeOpacity={.7}
                            onPress={getFromCamera}
                        >
                            <Text style={styles.btnText}>Chụp Ảnh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btn, { marginTop: 10, marginBottom: 30 }]}
                            activeOpacity={.7}
                            onPress={getFromGallery}
                        >
                            <Text style={styles.btnText}>Lấy Từ Thư Viện</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible2}
            >
                <View style={{ flex: 1, backgroundColor: "#171718D1", justifyContent: "center", alignItems: "center"}}>
                    <View style={{ backgroundColor: "#FFF", width: "75%", borderRadius: 25, justifyContent: "center", alignItems: "center"}}>
                        <Text style={{ marginTop: 20 }}>Lưu thành công!!!</Text>
                        <TouchableOpacity
                            style={[styles.btn,{ marginVertical: 20 }]}
                            activeOpacity={.7}
                            onPress={backToHome}
                        >
                            <Text style={styles.btnText}>Về trang chủ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection:"row" }}>
                    <TouchableOpacity 
                        style={[styles.imgBtn, { width: 220 }]}
                        activeOpacity={.8}
                        onPress={() => showModal(1)}
                    >
                        {img1 !== "" ? <Image source={{ uri: img1 }} style={styles.imgCtn}/> : <Text style={[styles.plus, { fontSize:40 }]}>+</Text>}
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity 
                            style={styles.imgBtn}
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
                        style={styles.imgBtn}
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
                        {img5 !== "" ? <Image source={{uri:img5}} style={styles.imgCtn}/> : <Text style={styles.plus}>+</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.imgBtn}
                        activeOpacity={.8}
                        onPress={()=>showModal(6)}
                    >
                        {img6 !== "" ? <Image source={{uri:img6}} style={styles.imgCtn}/> : <Text style={styles.plus}>+</Text>}
                    </TouchableOpacity>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoText}>Tên sản phẩm:</Text>
                    <TextInput 
                        style={styles.input}
                        value={name}
                        onChangeText={name => setName(name)}
                    />
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoText}>Số lượng:</Text>
                    <TextInput 
                        style={styles.input}
                        value={quantity}
                        keyboardType="numeric"
                        onChangeText={quantity => setQuantity(quantity)}
                    />
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoText}>Giá nhập:</Text>
                    <TextInput 
                        style={styles.input}
                        value={pricein}
                        keyboardType="numeric"
                        onChangeText={pricein => setPricein(pricein)}
                    />
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoText}>Giá bán:</Text>
                    <TextInput 
                        style={styles.input}
                        value={priceout}
                        keyboardType="numeric"
                        onChangeText={priceout => setPriceout(priceout)}
                    />
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoText}>Thuộc tính mới:</Text>
                    <Text style={styles.addBtn}>+</Text>
                </View>
            </ScrollView>
            <TouchableOpacity 
                style={styles.submitBtn}
                activeOpacity={.8}
                onPress={handleSave}
            >
                <Text style={styles.submitText} activeOpacity={.8}>lưu</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#eee",
        marginHorizontal: 10
    },
    imgCtn: {
        width: "100%",
        height: "100%"
    },
    imgBtn: {
        width: 100,
        aspectRatio: 1/1,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2
    },
    plus: {
        fontSize: 20,
        fontWeight: "600"
    },
    info: {
        marginTop:20,
        flexDirection:"row",
        marginHorizontal: 10,
        justifyContent:"space-between",
        alignItems: "center"
    },
    infoText: {
        flex: 1,
        fontWeight: "bold"
    },
    addBtn: {
        backgroundColor: "#fff",
        borderRadius: 99,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    input: {
        backgroundColor: "#fff",
        flex:2,
        marginLeft: 10,
        padding: 5,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2
    },
    submitBtn: {
        marginVertical: 10,
        backgroundColor: "orange",
        paddingVertical: 15,
        width: "90%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    submitText: {
        fontSize: 18,
        fontWeight: "500",
        textTransform: "uppercase"
    },
    btn: {
        backgroundColor: "#84D9FA",
        width: "80%",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 10
    },
    btnText: {
        fontSize: 14,
        fontWeight: "700",
        textTransform: "uppercase",
    }
})

export default CreateNew;