import React, { useContext, useState } from "react";
import { View } from "react-native";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
} from "native-base";
import { AppContext } from "../context/AppProvider";
import { axiosInstance, setToken } from "../utils";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
export default function LoginNativeBase({ navigation }) {
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
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Box safeArea p="2" py="8" w="90%" maxW="100%">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Sign in to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Username</FormControl.Label>
              <Input
                as={<MaterialIcons name="person" />}
                onChangeText={(value) => {
                  setUser({ ...user, username: value });
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={(value) => setUser({ ...user, password: value })}
              />
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500",
                }}
                alignSelf="flex-end"
                mt="1"
              >
                Forget Password?
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={() => loginHandle()}>
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                I'm a new user.{" "}
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                onPress={() => navigation.navigate("Register")}
              >
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
