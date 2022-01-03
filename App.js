import React, { useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppProvider from "./context/AppProvider";
import LoginNativeBase from "./screens/LoginNativeBase";
import Register from "./screens/Register";
import UserInfo from "./screens/UserInfo";
import UserInfoDetail from "./screens/UserInfoDetail";

import { CardStyleInterpolators } from "@react-navigation/stack";
import { deleteToken } from "./utils";
import Test from "./screens/Test";

const Stack = createNativeStackNavigator();
/**
 * animation
 */
const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen
              name="Test"
              component={QRCode}
              options={({ route: { params } }) => ({
                headerLeft: null,
                headerShown: false,
              })}
            /> */}
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ route: { params } }) => ({
                headerLeft: null,
                headerShown: false,
              })}
            />
            <Stack.Screen
              name="LoginBase"
              component={LoginNativeBase}
              options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={({ route: { params } }) => ({
                headerLeft: null,
                headerShown: false,
              })}
            />
            <Stack.Screen
              name="UserInfo"
              component={UserInfo}
              options={({ route }) => ({
                title: route.params.name,
                headerTitleStyle: {
                  color: "white",
                },
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: "#2089dc",
                },
                headerBackTitleStyle: {
                  color: "white",
                },
                headerTintColor: "#ffffff",
                headerBackTitleVisible: "true",
                headerRight: () => (
                  <Icon
                    // onPress={async () => {
                    //   await deleteToken("accessToken");
                    //   await deleteToken("refreshToken");
                    //   navigation.navigate("LoginBase", { withAnimation: true });
                    // }}
                    size={20}
                    name="log-out"
                    type="entypo"
                    color="white"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="UserInfoDetail"
              component={UserInfoDetail}
              options={({ route }) => ({
                title: route.params.id,
                headerTitleStyle: {
                  color: "white",
                },
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: "#2089dc",
                },
                headerBackTitleStyle: {
                  color: "white",
                },
                headerTintColor: "#ffffff",
                headerBackTitleVisible: "true",
                headerRight: () => (
                  <Icon
                    // onPress={async () => {
                    //   await deleteToken("accessToken");
                    //   await deleteToken("refreshToken");
                    //   navigation.navigate("LoginBase", { withAnimation: true });
                    // }}
                    size={20}
                    name="log-out"
                    type="entypo"
                    color="white"
                  />
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
