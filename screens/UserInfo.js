import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text } from "react-native";
import { View } from "react-native";
import { Icon, SearchBar } from "react-native-elements";
import axiosInstanceToken from "../axiosInstanceToken";
import ListUser from "../component/ListUser";
import { AppContext } from "../context/AppProvider";
import { getToken } from "../utils";

export default function UserInfo({ navigation, route }) {
  const { isLogged, setIsLogged } = useContext(AppContext);
  const [listUser, setListUser] = useState([]);
  const [query, setQuery] = useState("");
  const [checkExists, setCheckExists] = useState(false);
  const getUser = async (key) => {
    let accessToken = await getToken("accessToken");
    try {
      let promise = await axiosInstanceToken(
        "GET",
        `user/department/${key}`,
        accessToken
      );
      return promise.data;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUser(route.params.key).then((res) => {
      setListUser(res);
      setCheckExists(true);
    });
  }, [route.params.key]);

  const fSearch = (data) => {
    return data?.filter(
      (item) =>
        item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        item.id.indexOf(query) > -1
    );
  };

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <SearchBar
        style={{ borderBottomWidth: 1, borderColor: "#ccc" }}
        platform="android"
        showLoading="true"
        placeholder="Search..."
        onChangeText={(value) => {
          setQuery(value);
        }}
        value={query}
      />
      <ScrollView style={{}}>
        {listUser == "" ? (
          checkExists == false ? (
            <ActivityIndicator size="large" color="#2089dc" />
          ) : (
            <View>
              <Text style={{ textAlign: "center" }}>Không có dữ liệu !! </Text>
              <Icon name="trash-o" type="font-awesome" color="#517fa4" />
            </View>
          )
        ) : (
          <ListUser listUsers={fSearch(listUser)} navigation={navigation} />
        )}
      </ScrollView>
    </View>
  );
}
