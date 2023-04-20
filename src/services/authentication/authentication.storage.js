import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "@auth_token";
export const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem(key);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};
