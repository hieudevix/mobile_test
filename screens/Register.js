import React, { useContext, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  HStack,
  Text,
  Link,
  NativeBaseProvider,
  useToast,
  ScrollView,
} from "native-base";
import { axiosInstance } from "../utils";
import { AppContext } from "../context/AppProvider";
import Alert from "../component/Alert";

export const Toast = ({ user }) => {
  const toast = useToast();
  const handleRegister = async () => {
    try {
      let result = await axiosInstance.post("user/register", user);
      if (result.data.status == true) {
        toast.show({
          title: "Success",
          status: "success",
          placement: "top",
          duration: 1500,
          description: result.data.message + " Please Go To Sign In!",
        });
      } else {
        toast.show({
          title: "Warning!",
          status: "warning",
          placement: "top",
          duration: 1500,
          description: result.data.message + " Please Choose Another Username!",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <VStack space={2}>
      <Button colorScheme="indigo" onPress={() => handleRegister()}>
        Register
      </Button>
    </VStack>
  );
};

export default function Register({ navigation }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
  });

  /** for alert  */
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { isOpenAlert, setIsOpenAlert } = useContext(AppContext);
  /** */

  /** login function */
  const handleRegister = async () => {
    try {
      let result = await axiosInstance.post("user/register", user);
      if (result.data.status == true) {
        // toast.show({
        //   title: "Success",
        //   status: "success",
        //   placement: "top",
        //   duration: 1500,
        //   description: result.data.message + " Please Go To Sign In!",
        // });
        setIsOpenAlert(true);
        setTitle("Success");
        setContent(result.data.message);
      } else {
        // toast.show({
        //   title: "Warning!",
        //   status: "warning",
        //   placement: "top",
        //   duration: 1500,
        //   description: result.data.message + " Please Choose Another Username!",
        // });
        setIsOpenAlert(true);
        setTitle("Fail");
        setContent(result.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  /** end login function */

  return (
    <NativeBaseProvider>
      <ScrollView style={{ backgroundColor: "white" }}>
        <Center flex={1} px="3" style={{ marginTop: 100 }}>
          <Box safeArea p="2" w="90%" maxW="100%" py="8">
            <Heading
              size="lg"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              fontWeight="semibold"
            >
              Welcome
            </Heading>
            <Heading
              mt="1"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="medium"
              size="xs"
            >
              Sign up to continue!
            </Heading>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Username</FormControl.Label>
                <Input
                  onChangeText={(value) => {
                    setUser({ ...user, username: value });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  type="password"
                  onChangeText={(value) => {
                    setUser({ ...user, password: value });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Full Name</FormControl.Label>
                <Input
                  onChangeText={(value) => {
                    setUser({ ...user, fullName: value });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  onChangeText={(value) => {
                    setUser({ ...user, email: value });
                  }}
                />
              </FormControl>

              <Button
                mt="2"
                colorScheme="info"
                onPress={() => handleRegister()}
              >
                Sign up
              </Button>
              {/* <Toast user={user} /> */}
            </VStack>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Already have account!.{" "}
              </Text>
              <Link
                _text={{
                  color: "info.600",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                onPress={() => navigation.navigate("LoginBase")}
              >
                Sign In
              </Link>
            </HStack>
          </Box>
        </Center>
        <Alert title={title} content={content} />
      </ScrollView>
    </NativeBaseProvider>
  );
}
