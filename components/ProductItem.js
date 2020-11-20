import React from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import EStyleSheet from "react-native-extended-stylesheet"

const ProductItem = (props) => {
    const navigation = useNavigation();
    const { product } = props;
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={.8}
            onPress={() => navigation.navigate("ProductDetail", { product })}
        >
            { product.imageUrl ? <Image source={{ uri:product.imageUrl[0] }} style={styles.image}/> : null }
            <View style={styles.info}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={{ marginVertical:5 }}>Giá: {product.priceout} VNĐ</Text>
                <Text>Số Lượng: {product.quantity}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = EStyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#fff",
        alignSelf: "center",
        flexDirection: "row",
        width: "100%",
        marginBottom: 12,
        // marginVertical: "1.5rem",
        borderRadius: 5,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2
    },
    image: {
        width: "40%",
        aspectRatio: 1/1
    },
    info: {
        justifyContent: "center",
        padding: "6rem"
    },
    name: {
        fontSize: "5rem",
        fontWeight: "bold",
        textTransform: "capitalize"
    }
})

export default ProductItem;