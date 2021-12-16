import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import {
  Header,
  Icon,
  Input,
  ListItem,
  SearchBar,
} from "react-native-elements";
import axiosInstanceToken from "../axiosInstanceToken";
import { AppContext } from "../context/AppProvider";
import { deleteToken, getToken } from "../utils";
import moment from "moment";

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

  const renderListUsers = (listUser) => {
    return listUser?.map((item, i) => {
      return (
        <ListItem
          key={i}
          bottomDivider
          onPress={() =>
            navigation.navigate("UserInfoDetail", {
              id: item.id,
              withAnimation: true,
            })
          }
        >
          {item.gender == "1" ? (
            <Icon name="male" type="fontisto" color="#5584AC" />
          ) : (
            <Icon name="female" type="fontisto" color="#F2789F" />
          )}

          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.id}</ListItem.Subtitle>
          </ListItem.Content>
          {item.pwd != null ? (
            <Icon
              size={18}
              name="checkcircleo"
              type="ant-design"
              color="#116530"
            />
          ) : (
            <Text></Text>
          )}
          <ListItem.Chevron />
        </ListItem>
      );
    });
  };
  const fSearch = (data) => {
    return data?.filter(
      (item) =>
        item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        item.id.indexOf(query) > -1
    );
  };

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      {/* <Header
        centerComponent={{
          text: route.params.name,
          style: { color: "#fff", fontSize: 20 },
        }}
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
        leftComponent={{ icon: "home", color: "#fff" }}
      /> */}

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
          renderListUsers(fSearch(listUser))
        )}
      </ScrollView>
    </View>
  );
}
