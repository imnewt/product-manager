import React from "react"
import { View, Text, FlatList, StyleSheet } from "react-native"
import { SliderBox } from "react-native-image-slider-box";
import EStyleSheet from "react-native-extended-stylesheet"

const ProductDetail = (props) => {
    const { product } = props.route.params;
    const test = product ? Object.keys(product) : null;
    const filtered = test.filter(item => item !== "id" && item !== "imageUrl");

    const sub = (en) => {
        switch (en) {
            case "name":
                return "Tên sản phẩm"
            case "quantity":
                return "Số lượng"
            case "pricein":
                return "Giá nhập"
            case "priceout":
                return "Giá bán"
            default:
                return en
        }
    }

    return (
        <View style={{backgroundColor: "#F0F2EF"}}>
            { 
                product.imageUrl && 
                    <SliderBox
                        images={product.imageUrl}
                        ImageComponentStyle={{ height: 300 }}
                    />
            }
            <FlatList
                data={filtered}
                renderItem={({ item }) => (
                    product[item] !== "" &&
                    <View style={styles.block}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>{sub(item)}:</Text>
                        <Text style={[styles.text, {}]}>{item.substring(0,5) == "price" ? product[item] + " VNĐ" : product[item]}</Text>
                    </View>
                )}
                keyExtractor={(item) => `${item}`}
                style={{ marginTop: 20 }}
            />
            
        </View>
    )
}

const styles = EStyleSheet.create({
    block: {
        width: "90%",
        marginBottom: 0,
        alignSelf: "center",
        flexDirection:"row",
        justifyContent: "space-between"
    },
    text: {
        fontSize: "4.5rem",
        marginBottom: 5
    }
})

export default ProductDetail;