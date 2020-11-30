import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';
import { Button} from "react-native-elements"
import { useNavigation } from "@react-navigation/native"

const Edit = (props) => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const { url, ratio, color, opacity } = props.route.params;
  return (
    <View style={styles.container}>
      <View
        style={{
          position: "relative",
          width: width,
          height: ratio !== "Full" ? width * ratio.split(":")[0] / ratio.split(":")[1] : height * 0.78
        }}
      >
        <Image 
          source={{ uri: url }}
          style={{
            width: "100%",
            height: "100%"
          }}
        />
        <View style={[styles.overlay, { backgroundColor: color, opacity: opacity }]}></View>
      </View>
      {/* <Button
        title="Save"
        // onPress={() => navigation.navigate("CreateNew", {
        //   url: url,
        //   imgId: imgId
        // })}
      /> */}
    </View>
  ) 
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    // position: "relative"
  },
  overlay: {
    // flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.12
  }
})

export default Edit;