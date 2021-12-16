import React, { useContext, useEffect, useState } from "react";

import { Image, StyleSheet, View } from "react-native";
import { deleteToken, getToken } from "../utils";
import axiosInstanceToken from "../axiosInstanceToken";
import { Badge, Header } from "react-native-elements";
import { AppContext } from "../context/AppProvider";
import moment from "moment";
import { ActivityIndicator } from "react-native";
import { encode as btoa } from "base-64";
import { Text } from "react-native";
import { Buffer } from "buffer";
export default function UserInfoDetail({ route, navigation }) {
  const { isLogged, setIsLogged } = useContext(AppContext);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const personId = route.params.id;

  const getUserInfo = async (personId) => {
    let accessToken = await getToken("accessToken");
    try {
      let promise = await axiosInstanceToken(
        "GET",
        `user/${personId}`,
        accessToken
      );
      return promise.data;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUserInfo(personId).then((res) => {
      setUserInfo(res);
      setIsLoading(!isLoading);
    });
  }, [personId]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };
  const renderInfoUser = (userInfo) => {
    let base64data = new Buffer(userInfo.image).toString("base64");
    if (userInfo.id == "29975" || userInfo.id == "30730") {
      base64data = "";
    }
    return (
      <View style={styles.wrapperCard}>
        <View style={styles.card}>
          <View style={styles.imgCard}>
            <Image
              style={styles.img}
              source={{ uri: `data:image/jpeg;base64,${base64data}` }}
            />
            <Text style={styles.badge}>{userInfo?.pos}</Text>
          </View>
          <View style={styles.info}>
            <View style={styles.title}>
              <Text style={styles.titleName}>{userInfo?.name}</Text>
              <Text style={styles.titleId}>{userInfo?.id}</Text>
            </View>
            <View style={styles.content}>
              {userInfo?.pwd != null ? (
                <View style={styles.row}>
                  <Text style={styles.infoTitle}>Password ERP: </Text>
                  <Text style={styles.infoContent}>{userInfo?.pwd}</Text>
                </View>
              ) : (
                <Text style={{ display: "none" }}></Text>
              )}

              <View style={styles.row}>
                <Text style={styles.infoTitle}>Gender: </Text>
                <Text style={styles.infoContent}>
                  {userInfo?.gender == 1 ? "Male" : "Female"}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.infoTitle}>Phone: </Text>
                <Text style={styles.infoContent}>{userInfo?.phone_number}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.infoTitle}>Date Come: </Text>
                <Text style={styles.infoContent} fontWeight="600">
                  {moment(userInfo?.date_come).format("DD/MM/YYYY")}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.infoTitle}>Birth Day: </Text>
                <Text style={styles.infoContent}>
                  {moment(userInfo?.birthday).format("DD/MM/YYYY")}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.infoTitle}>Address: </Text>
                <Text style={styles.infoContent}>{userInfo?.address}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      {isLoading ? (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size="large"
          color="#2089dc"
        />
      ) : (
        renderInfoUser(userInfo[0])
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperCard: {
    height: "100%",
    width: "100%",
    marginTop: 40,
  },
  card: {
    width: "90%",
    height: "auto",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    borderRadius: 10,
  },
  imgCard: {
    alignItems: "center",
    position: "relative",
  },
  img: {
    width: "100%",
    height: 400,
    borderRadius: 7,
  },
  badge: {
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 7,
    backgroundColor: "#2541B2",
    color: "white",
  },
  info: {
    width: "100%",
    marginTop: 20,
    alignItems: "flex-start",
  },
  title: {
    width: "100%",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  titleName: {
    fontWeight: "700",
    fontSize: 20,
  },
  titleId: {
    fontSize: 16,
  },
  content: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  infoTitle: {
    fontSize: 12,
    letterSpacing: 1,
    width: "40%",
  },
  infoContent: {
    fontSize: 14,
    fontWeight: "600",
    width: "60%",
  },
});
