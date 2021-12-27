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
import Alert from "../component/Alert";
export default function LoginNativeBase({ navigation }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const colors = {
    primary: {
      50: "#ecfeff",
      100: "#cffafe",
      200: "#a5f3fc",
      300: "#67e8f9",
      400: "#22d3ee",
      500: "#06b6d4",
      600: "#0891b2",
      700: "#0e7490",
      800: "#155e75",
      900: "#164e63",
    },
  };
  const { isLogged, setIsLogged } = useContext(AppContext);
  const [err, setErr] = useState({ username: "", password: "" });
  const validation = () => {
    let valid = true;
    if (user.username == "") {
      setErr({ ...err, username: "Username is required!" });
      valid = false;
    }

    if (user.password == "") {
      setErr({ ...err, password: "Password is required!" });
      valid = false;
    }

    return valid;
  };
  const loginHandle = async () => {
    let valid = validation();
    if (valid) {
      try {
        let result = await axiosInstance.post("user/login", user);
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
    } else {
      return;
    }
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3" style={{ backgroundColor: "white" }}>
        <Box
          safeArea
          p="2"
          py="8"
          w="90%"
          maxW="100%"
          mt="4"
          style={{ marginTop: 100 }}
        >
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
            <FormControl isRequired>
              <FormControl.Label>Username</FormControl.Label>
              <Input
                as={<MaterialIcons name="person" />}
                onChangeText={(value) => {
                  setUser({ ...user, username: value });
                }}
              />
              {err.username != "" ? (
                <FormControl.ErrorMessage
                  _text={{
                    fontSize: "xs",
                    color: "error.500",
                    fontWeight: 500,
                  }}
                >
                  {err.username}
                </FormControl.ErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={(value) => setUser({ ...user, password: value })}
              />

              <FormControl.ErrorMessage
                _text={{
                  fontSize: "xs",
                  color: "error.500",
                  fontWeight: 500,
                }}
              >
                {err.password}
              </FormControl.ErrorMessage>

              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "info.600",
                }}
                alignSelf="flex-end"
                mt="1"
              >
                Forget Password?
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="info" onPress={() => loginHandle()}>
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
                  color: "info.600",
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
        <Alert title={""} content={""} />
      </Center>
    </NativeBaseProvider>
  );
}
