import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "react-native-vector-icons/Ionicons"

import ProductListScreen from "./screens/ProductList"
import CreateNewScreen from "./screens/CreateNew"
import ProductDetailScreen from "./screens/ProductDetail"

import CameraScreen from "./screens/Camera"
import EditScreen from "./screens/Edit"

import SettingsScreen from "./screens/Settings"


console.disableYellowBox = true;
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native'; 

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 100});

const ProductStack = createStackNavigator();
const ProductStackScreen = () => {
  return (
    <ProductStack.Navigator 
      initialRouteName="ProductList" 
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          textTransform: "uppercase",
          fontSize: 20,
        }
      }}
    >
      <ProductStack.Screen name="ProductList" component={ProductListScreen} options={{ headerTitle:"Quản Lý Sản Phẩm" }}/>
      <ProductStack.Screen name="CreateNew" component={CreateNewScreen} options={{ headerTitle:"Thêm Sản Phẩm Mới" }}/>
      {/* <ProductStack.Screen name="Camera" component={CameraScreen} options={{headerShown:false}}/>
      <ProductStack.Screen name="Edit" component={EditScreen} options={{headerShown:false}}/> */}
      {/* <ProductStack.Screen name="TestCamera" component={TestCameraStackScreen} options={{headerShown:false}}/> */}

      <ProductStack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerTitle:"Chi Tiết Sản Phẩm" }}/>
    </ProductStack.Navigator>
  )
}

const SettingsStack = createStackNavigator();
const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator 
      initialRouteName="Settings" 
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
          textTransform: "uppercase"
        },
        tabBarVisible: false
      }}
    >
      <SettingsStack.Screen name="Settings" component={SettingsScreen} options={{headerShown:false}}/>
    </SettingsStack.Navigator>
  )
}

const TestCameraStack = createStackNavigator();
const TestCameraStackScreen = () => {
  return (
    <TestCameraStack.Navigator 
      initialRouteName="Camera" 
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
          textTransform: "uppercase"
        }
      }}
    >
      <TestCameraStack.Screen name="Camera" component={CameraScreen} options={{headerShown:false}}/>
      <TestCameraStack.Screen name="Edit" component={EditScreen} options={{headerShown:false}}/>
    </TestCameraStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();
const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "Quản Lý") {
            iconName = "ios-list";
          } 
          else {
            iconName = "ios-cog";
          }
          return <Ionicons name={iconName} size={25} color={color} />
        }
      })}
      tabBarOptions={{
        activeTintColor: "#00A878",
        inactiveTintColor: "gray",
        style: { height: 60 },
        labelStyle: {
          fontSize: 14,
          paddingBottom: 3
        },
        keyboardHidesTabBar: true
      }}
    >
      <Tab.Screen name="Quản Lý" component={ProductStackScreen}/>
      <Tab.Screen name="Cài Đặt" component={SettingsStackScreen}/>
    </Tab.Navigator>
  )
}

const RootStack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Main">
        <RootStack.Screen name="Main" component={Main} options={{headerShown:false}}/>
        <RootStack.Screen name="TestCamera" component={TestCameraStackScreen} options={{headerShown:false}}/>
      </RootStack.Navigator>
    </NavigationContainer>
  )
}