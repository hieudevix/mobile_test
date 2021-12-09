import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const getToken = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export const setToken = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const deleteToken = async (key) => {
  try {
    const value = await AsyncStorage.removeItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export const axiosInstance = axios.create({
  baseURL: "http://192.168.18.172:5000/",
  timeout: 5000,
});

export const BASE_URL = "http://192.168.18.172:5000/";
