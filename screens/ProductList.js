import React, { useEffect, useState } from "react"
import { View, FlatList, StyleSheet,TouchableOpacity, Text } from "react-native"
import ProductItem from "../components/ProductItem"
import AsyncStorage from "@react-native-async-storage/async-storage"
import EStyleSheet from "react-native-extended-stylesheet"
import { RNCamera } from 'react-native-camera';
// DEFAULT DATA
const temp = [
    {
        "id": "1", 
        "name": "Ống Nước", 
        "quantity": "20",
        "pricein": "20000",
        "priceout": "30000",
        "imageUrl": ["https://cf.shopee.vn/file/0a34e039aea49c8eca3a65ccb16521ab","https://thegioitho.com/wp-content/uploads/2019/12/028.png"]
    }, 
    {
        "id": "2", 
        "name": "Dây Điện", 
        "quantity": "5",
        "pricein": "12000",
        "priceout": "25000",
        "imageUrl": ["https://truongphatplastic.com.vn/wp-content/uploads/2019/08/bang-bao-gia-ong-nhua-HDPE-tai-Ha-Giang.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREb4zJl1IGWMkryEfsHMT5FGspn3vQh-hBxQ&usqp=CAU"]
    },
    {
        "id": "3", 
        "name": "Phụ Kiện", 
        "quantity": "5",
        "pricein": "12000",
        "priceout": "25000",
        "imageUrl": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREb4zJl1IGWMkryEfsHMT5FGspn3vQh-hBxQ&usqp=CAU","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYgHVty72Behx6-A1tEP67OEoG8zhanVkaYg&usqp=CAU"]
    },
    {
        "id": "4", 
        "name": "Phụ Kiện", 
        "quantity": "5",
        "pricein": "12000",
        "priceout": "25000",
        "imageUrl": ["https://dienmaythongminh.com/wp-content/uploads/2018/04/noi-nhanh-ong-nuoc-romine-12mm-1.jpg","https://cf.shopee.vn/file/afa5041470c641d18ecb90e813c3f480"]
    }
]

const ProductList = () => {
    const [products,setProducts] = useState([]);
    var [camera, setCamera] = useState(null);
    useEffect(() => {
        // storeData(temp);
        getData();
    },[products])

    // SAVE DATA TO STORAGE
    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('products', jsonValue)
        } catch (e) {
            console.log(e);
        }
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

    const takePicture = async () => {
        if (camera) {
          const options = { quality: 0.5, base64: true };
          const data = await camera.takePictureAsync(options);
          console.log(data.uri);
        }
    };
    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={products}
                renderItem={({ item }) => <ProductItem product={item}/>}
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={{ paddingVertical: 5 }}
            />
            <RNCamera
                ref={ref => {
                    camera = ref;
                }}
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
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={takePicture} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F2EF"
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
})

export default ProductList;