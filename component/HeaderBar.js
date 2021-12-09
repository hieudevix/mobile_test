import React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";
export default function HeaderBar() {
  return (
    <View>
      <Header
        placement="left"
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
        rightComponent={{ icon: "home", color: "#fff" }}
      />
    </View>
  );
}
