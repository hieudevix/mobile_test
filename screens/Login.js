import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { ThemeProvider, Input, Button } from "react-native-elements";
import styled from "styled-components/native";
import axios from "axios";
import { axiosInstance, setToken } from "../utils";
import axiosInstanceToken from "../axiosInstanceToken";
import { AppContext } from "../context/AppProvider";

/** styled component */
const LoginStyled = styled.View`
  margin: 200px auto;
  border-radius: 10px;
  border: 1px solid #ccc;
  min-height: 280px;
  min-width: 100%;
`;
const HeaderLogin = styled.View`
  height: 80px;
  border-radius: 10px;
  padding: 10px;
  background-color: #3c6dcc;
`;
const BodyLogin = styled.View`
  padding: 20px;
`;
const TextStyled = styled.Text`
  color: white;
  line-height: 60px;
  font-size: 20px;
  text-align: center;
`;
const WrapperStyled = styled.View`
  padding: 20px;
`;
const MesErrorStyled = styled.Text`
  margin: 10px 0;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  width: 100%;
  color: #721c24;
  font-size: 17px;
  font-weight: 600;
  text-align: center;
  background-color: #e2a4a9;
`;

/** end styled */

export default function Login({ navigation, route }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { isLogged, setIsLogged } = useContext(AppContext);
  const [err, setErr] = useState("");
  const loginHandle = async () => {
    try {
      let result = await axiosInstance.post("user/login", user);
      // let result = await axios({
      //   url: "http://192.168.18.172:5000/user/login",
      //   method: "POST",
      //   data: user,
      // });
      if (result.data.authenticated == false) {
        setErr(result.data.message);
      } else {
        await setToken("accessToken", result.data.accessToken);
        await setToken("refreshToken", result.data.refreshToken);
        setIsLogged(true);
        navigation.navigate("Home");
      }
    } catch (e) {
      console.log("loi ne", e);
    }
  };
  return (
    <ScrollView>
      <ThemeProvider>
        <WrapperStyled>
          <LoginStyled>
            <HeaderLogin>
              <TextStyled>Login</TextStyled>
            </HeaderLogin>
            <BodyLogin>
              <Input
                placeholder="Username"
                onChangeText={(value) => {
                  setUser({ ...user, username: value });
                }}
              />

              <Input
                placeholder="Password"
                errorStyle={{ color: "red" }}
                secureTextEntry={true}
                onChangeText={(value) => {
                  setUser({ ...user, password: value });
                }}
              />
              {err == "" ? (
                <Text></Text>
              ) : (
                <View>
                  <MesErrorStyled>{err}</MesErrorStyled>
                </View>
              )}
              <Button
                title="Login"
                type="outline"
                onPress={() => loginHandle()}
              />
            </BodyLogin>
          </LoginStyled>
        </WrapperStyled>
      </ThemeProvider>
    </ScrollView>
  );
}
