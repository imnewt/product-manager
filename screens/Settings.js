import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import { useNavigation } from "@react-navigation/native"
const Settings = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Trang Cài Đặt</Text>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("TestCamera")}
                activeOpacity={.7}
            >
                <Text>Thêm Ảnh</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F2EF",
        alignItems: "center",
        justifyContent: "center"
    },
    btn: {
        marginTop: "5rem",
        padding: "3rem",
        backgroundColor: "orange"
    }
})

export default Settings;