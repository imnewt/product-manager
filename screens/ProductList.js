import React, { useEffect, useState, useRef } from "react"
import { View, FlatList, TouchableOpacity } from "react-native"
import ProductItem from "../components/ProductItem"
import AsyncStorage from "@react-native-async-storage/async-storage"
import EStyleSheet from "react-native-extended-stylesheet"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import { useDidMountEffect } from "../utils"
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

const ProductList = (props) => {
    const navigation = useNavigation();
    const [products,setProducts] = useState([]);
    
    useEffect(() => {
        // storeData(temp);
        getData();
    },[])

    useDidMountEffect(() => {
        const { hasNew } = props.route.params;
        hasNew && getData();
    },[props.route.params])

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

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={products}
                renderItem={({ item }) => <ProductItem product={item}/>}
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={{ padding: 16, paddingBottom: 0 }}
            />
            <TouchableOpacity
                style={styles.btn}
                activeOpacity={.8}
                onPress={() => navigation.navigate("CreateNew")}
            >
                <Ionicons name="ios-add" color="white" size={30}/>
            </TouchableOpacity>
        </View>
    )
};

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F2EF"
    },
    btn: {
        position: "absolute",
        backgroundColor:"#00A878",
        borderRadius: 99,
        width: "18rem",
        height: "18rem",
        justifyContent: "center",
        alignItems: "center",
        bottom: "4rem",
        right: "4rem",
        opacity: 0.8,
        elevation: 5
      }
})

export default ProductList;