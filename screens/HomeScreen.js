import React, { useContext, useEffect, useState } from "react";
import { Linking, ScrollView, View } from "react-native";
import { Header, Input, Text } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListItem, Avatar } from "react-native-elements";
import Login from "./Login";
import axios from "axios";
import Aritcle from "../component/Aritcle";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { deleteToken, getToken } from "../utils";
import axiosInstanceToken from "../axiosInstanceToken";
import { AppContext } from "../context/AppProvider";

/* styled component */
const ActivityIndicatorStyled = styled.ActivityIndicator`
  margin-top: 50%;
`;

const HomeScreen = ({ navigation }) => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLogged, setIsLogged } = useContext(AppContext);
  const [query, setQuery] = useState("");

  const callArticle = async (res) => {
    let accessToken = await getToken("accessToken");
    let data = { query: query };
    try {
      let promise = await axiosInstanceToken(
        "POST",
        `article/search`,
        accessToken,
        data
      );
      return promise.data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken("accessToken").then((res) => {
      if (res == null) {
        navigation.navigate("LoginBase", { isSuccess: false });
      } else {
        callArticle(res).then((data) => {
          setArticle(data);
          setIsLoading(false);
        });
      }
    });
    return;
  }, [isLogged, query]);

  return (
    <View>
      <Header
        placement="left"
        rightComponent={{
          icon: "logout",
          color: "#fff",
          onPress: async () => {
            await deleteToken("accessToken");
            await deleteToken("refreshToken");
            setIsLogged(false);
          },
        }}
        centerComponent={{ text: "Hello", style: { color: "#fff" } }}
        leftComponent={{ icon: "home", color: "#fff" }}
      />

      <View>
        <Input
          placeholder="Tìm nội dung"
          onChangeText={(value) => {
            setQuery(value);
          }}
        ></Input>
      </View>
      {isLoading ? (
        <ActivityIndicatorStyled size="large" color="#2089dc" />
      ) : (
        <Aritcle article={article} />
      )}
    </View>
  );
};

export default HomeScreen;
