import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { BottomSheet, Header, Input, SearchBar } from "react-native-elements";

import styled from "styled-components/native";
import { deleteToken, getToken } from "../utils";
import axiosInstanceToken from "../axiosInstanceToken";
import { AppContext } from "../context/AppProvider";
import Department from "../component/Department";
import ListUser from "../component/ListUser";

import {
  Button,
  Actionsheet,
  useDisclose,
  Text,
  Box,
  Center,
  NativeBaseProvider,
} from "native-base";
/* styled component */
const ActivityIndicatorStyled = styled.ActivityIndicator``;

const HomeScreen = ({ navigation }) => {
  const [department, setDepartment] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [isVisible, setIsVisible] = useState(false);
  const { isLogged, setIsLogged } = useContext(AppContext);
  const [query, setQuery] = useState("");
  const [typeQuery, setTypeQuery] = useState("department");
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
  const getUsers = async (userid) => {
    let accessToken = await getToken("accessToken");
    try {
      let promise = await axiosInstanceToken(
        "GET",
        `user/search/${userid}`,
        accessToken
      );
      return promise.data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (
      parseInt(query.length) > 2 &&
      Number.isInteger(parseInt(query)) == true
    ) {
      setIsLoading(true);
      setTypeQuery("userid");
      getUsers(query).then((data) => {
        setListUsers(data);
        setIsLoading(false);
      });
    } else {
      setTypeQuery("department");
    }
  }, [query]);
  useEffect(() => {
    getToken("accessToken").then((res) => {
      if (res == null) {
        navigation.navigate("LoginBase", {
          isSuccess: false,
          withAnimation: true,
        });
      } else {
        getDepartment(res).then((data) => {
          setDepartment(data);
          setIsLoading(false);
        });
      }
    });
  }, [isLogged]);
  const fSearch = (data) => {
    return data?.filter(
      (item) =>
        item.name.toLowerCase().indexOf(query.toLocaleLowerCase()) > -1 ||
        item.id.toLowerCase().indexOf(query.toLocaleLowerCase()) > -1
    );
  };
  return (
    <NativeBaseProvider>
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
          leftComponent={{
            icon: "home",
            color: "#fff",
            onPress: onOpen,
          }}
        />

        <View>
          <SearchBar
            round="true"
            style={{ borderBottomWidth: 1, borderColor: "#ccc" }}
            platform="android"
            showLoading="true"
            placeholder="Search..."
            onChangeText={(value) => {
              setQuery(value);
            }}
            value={query}
          />
        </View>
        <ScrollView>
          {isLoading ? (
            <ActivityIndicatorStyled size="large" color="#2089dc" />
          ) : typeQuery == "department" ? (
            <Department
              department={fSearch(department)}
              navigation={navigation}
            />
          ) : (
            <ListUser
              listUsers={listUsers}
              navigation={navigation}
              showDepartmentName="true"
            />
          )}
        </ScrollView>

        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text
                fontSize="16"
                color="gray.500"
                _dark={{
                  color: "gray.300",
                }}
              >
                Albums
              </Text>
            </Box>
            <Actionsheet.Item>Delete</Actionsheet.Item>
            <Actionsheet.Item>Share</Actionsheet.Item>
            <Actionsheet.Item>Play</Actionsheet.Item>
            <Actionsheet.Item>Favourite</Actionsheet.Item>
            <Actionsheet.Item>Cancel</Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </View>
    </NativeBaseProvider>
  );
};

export default HomeScreen;
