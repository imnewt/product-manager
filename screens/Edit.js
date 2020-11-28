import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions
} from 'react-native';
  
const Edit = (props) => {
    
  const { width, height } = Dimensions.get("window");
  const { url, ratio, color } = props.route.params;

  return (
    <View style={styles.container}>
      <Image 
          source={{ uri: url }}
          style={{
            width: width,
            height: ratio !== "Full" ? width * ratio.split(":")[0] / ratio.split(":")[1] : height * 0.78
          }}
      />
      <View style={[styles.overlay, { backgroundColor: color }]}></View>
    </View>
  ) 
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      position: "relative"
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