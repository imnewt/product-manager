import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions
} from 'react-native';
import {
    Grayscale,
    Sepia,
    Tint,
    ColorMatrix,
    concatColorMatrices,
    invert,
    contrast,
    saturate,
  } from 'react-native-color-matrix-image-filters'
  
const Edit = (props) => {
    
    const { width, height } =Dimensions.get("window");
    const { url, ratio } = props.route.params;

    return (
        <View style={styles.container}>
            <Image 
                source={{uri:url}}
                style={{
                    width: width,
                    height: ratio !== "Full" ? width * ratio.split(":")[0] / ratio.split(":")[1] : height * 0.78
                }}
            />
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
      width: "100%",
      height: "100%",
      position: "absolute",
      backgroundColor: "red",
      opacity: 0.15
    }
})

export default Edit;