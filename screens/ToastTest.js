import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import styled from "styled-components/native";
const mamau = {
  0: "#95d1cc",
  1: "#E2EAF4",
  2: "#BAC5D4",
  3: "#ADBACC",
  4: "#025525",
  5: "#0B1920",
  6: "#518E7E",
  7: "#3B605C",
};

export default function ToastTest({ navigation }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  return (
    <View style={{ backgroundColor: "#E2EAF4", height: "100%", width: "100%" }}>
      <View
        style={{
          height: "40%",
          width: "100%",
          backgroundColor: "#95d1cc",
          borderRadius: 30,
        }}
      >
        <View style={{ height: "100%", justifyContent: "center" }}>
          <TextInput
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "600",
              fontSize: 30,
            }}
          >
            Login
          </TextInput>
        </View>
        <View
          style={{
            height: 300,
            width: "80%",
            // position: "absolute",
            // top: "80%",
            // left: "10%",
            alignSelf: "center",
            marginTop: -70,
            borderRadius: 10,
            backgroundColor: "white",
            padding: 10,
          }}
        >
          <View style={{ marginTop: 10 }}>
            <Text style={{ marginLeft: 10 }}>Username</Text>
            <TextInput
              placeholder="username"
              style={{
                padding: 7,
                margin: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
              }}
            />
          </View>
          <View>
            <Text style={{ marginLeft: 10 }}>Password</Text>
            <TextInput
              placeholder="password"
              style={{
                padding: 7,
                margin: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
              }}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Button title="Sign In" color="#95d1cc" />
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{ marginRight: 10, marginLeft: 10 }}>
              You don't have account
            </Text>
            <TouchableOpacity
              onPress={() => alert("test")}
              style={{ color: "#3B605C", fontWeight: "600" }}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 300,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ marginRight: 10 }}>Contact Us:</Text>

        <Icon
          style={{ marginRight: 10 }}
          name="facebook-square"
          type="font-awesome"
          color="#95d1cc"
        />
        <Text>-</Text>
        <Icon
          style={{ marginLeft: 10 }}
          name="twitter-square"
          type="font-awesome"
          color="#95d1cc"
        />
      </View>
    </View>
  );
}

// import React from "react";
// import { Text, View } from "react-native";

// const LoginScreen = () => {
//   return (
//     <View>
//       <Text>test</Text>
//     </View>
//   );
// };

// export default LoginScreen;
