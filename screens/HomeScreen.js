import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Header, Input, SearchBar } from "react-native-elements";

import styled from "styled-components/native";
import { deleteToken, getToken } from "../utils";
import axiosInstanceToken from "../axiosInstanceToken";
import { AppContext } from "../context/AppProvider";
import Department from "../component/Department";
/* styled component */
const ActivityIndicatorStyled = styled.ActivityIndicator``;

const HomeScreen = ({ navigation }) => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLogged, setIsLogged } = useContext(AppContext);
  const [queryDepartment, setQueryDepartment] = useState("");

  const getDepartment = async () => {
    let accessToken = await getToken("accessToken");
    try {
      let promise = await axiosInstanceToken(
        "GET",
        `user/department`,
        accessToken
      );
      return promise.data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken("accessToken").then((res) => {
      if (res == null) {
        navigation.navigate("LoginBase", {
          isSuccess: false,
          withAnimation: true,
        });
      } else {
        getDepartment(res).then((data) => {
          setArticle(data);
          setIsLoading(false);
        });
      }
    });
    return;
  }, [isLogged, queryDepartment]);
  const fSearch = (data) => {
    return data?.filter(
      (item) =>
        item.name.toLowerCase().indexOf(queryDepartment.toLocaleLowerCase()) >
          -1 ||
        item.id.toLowerCase().indexOf(queryDepartment.toLocaleLowerCase()) > -1
    );
  };
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Header
        rightComponent={{
          icon: "logout",
          color: "#fff",
          onPress: async () => {
            await deleteToken("accessToken");
            await deleteToken("refreshToken");
            setIsLogged(false);
            navigation.navigate("LoginBase", { withAnimation: true });
          },
        }}
        centerComponent={{
          text: "Departments",
          style: { color: "#fff", fontSize: 20 },
        }}
        leftComponent={{ icon: "home", color: "#fff" }}
      />

      <View>
        <SearchBar
          round="true"
          style={{ borderBottomWidth: 1, borderColor: "#ccc" }}
          platform="android"
          showLoading="true"
          placeholder="Search..."
          onChangeText={(value) => {
            setQueryDepartment(value);
          }}
          value={queryDepartment}
        />
      </View>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicatorStyled size="large" color="#2089dc" />
        ) : (
          <Department department={fSearch(article)} navigation={navigation} />
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
