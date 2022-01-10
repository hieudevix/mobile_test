import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Switch } from "react-native";
import { BottomSheet, Header, Input, SearchBar } from "react-native-elements";

import styled from "styled-components/native";
import { deleteToken, getToken } from "../utils";
import axiosInstanceToken from "../axiosInstanceToken";
import { AppContext } from "../context/AppProvider";
import Department from "../component/Department";
import ListUser from "../component/ListUser";
// import AnimatedEllipsis from 'react-native-animated-ellipsis';
// console.disableYellowBox = true; 
import {
  DotIndicator,
  PacmanIndicator
} from 'react-native-indicators';
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
  const [IsLoadingAddRow, setIsLoadingAddRow] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclose();
  const { isLogged, setIsLogged } = useContext(AppContext);
  const [query, setQuery] = useState("");
  const [typeQuery, setTypeQuery] = useState("department");
  const [isEnabled, setIsEnabled] = useState(false);
  const [endGet, setendGet] = useState(10);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (isEnabled) {
      setTypeQuery("department");
    } else {
      setTypeQuery("nameus");
    }

  };
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
  const getUsersByName = async (name) => {
    let accessToken = await getToken("accessToken");
    try {
      let promise = await axiosInstanceToken(
        "GET",
        `user/searchName?name=${name}&start=0&rows=${endGet}`,
        accessToken
      );
      return promise.data;
    } catch (e) {
      console.log(e);
    }
  };
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 0;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  useEffect(() => {
    setendGet(10);
    if (typeQuery == 'nameus') {
      setIsLoading(true);
      getUsersByName(query).then((data) => {
        setListUsers(data);
        setIsLoading(false);
      });
    } else if (
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
  const searchlimit = () => {
    if (isLoading) {
      return <ActivityIndicatorStyled size="large" color="#2089dc" />
    } else {
      if (typeQuery == 'department') {
        return <Department
          department={fSearch(department)}
          navigation={navigation}
        />
      } else if (typeQuery == 'userid') {
        return <ListUser
          listUsers={listUsers}
          navigation={navigation}
          showDepartmentName="true"
        />
      } else {
        return <ListUser
          listUsers={listUsers}
          navigation={navigation}
          showDepartmentName="true"
        />
      }
    }
  }
  useEffect(() => {
    if (typeQuery == 'nameus') {
      getUsersByName(query).then((data) => {
        setListUsers(data);
        searchlimit();
        setIsLoadingAddRow(false);
      });
    }
  }, [endGet])
  const scrollin = async () => {
    if (typeQuery == 'nameus') {
      setIsLoadingAddRow(true);
      setendGet(endGet + 10);
    }
  }
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
            // showLoading="true"
            placeholder="Search..."
            onChangeText={(value) => {
              setQuery(value);
            }}
            value={query}
          />
        </View>
        <ScrollView onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            scrollin();
          }
        }}
          scrollEventThrottle={400} >
          {searchlimit()}
          {IsLoadingAddRow ? <DotIndicator color="#2089dc" size={10} /> : <Text></Text>}


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
                Search name
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </Box>

          </Actionsheet.Content>
        </Actionsheet>
      </View>
    </NativeBaseProvider>
  );
};

export default HomeScreen;
