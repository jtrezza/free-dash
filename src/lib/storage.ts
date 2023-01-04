import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
  static instance = new Storage();

  store = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch(err) {
      console.log("storage store err", err);
      return false;
    }
  }

  get = async (key: string) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch(err) {
      console.log("storage get err", err);
      throw Error(err as string);
    }
  }

  multiGet = async (keys: string[]) => {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch(err) {
      console.log("storage multiGet err", err);
      throw Error(err as string);
    }
  }

  getAllkeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch(err) {
      console.log("storage getAllKeys err", err);
      throw Error(err as string);
    }
  }

  remove = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch(err) {
      console.log("storage remove err", err);
      return false;
    }
  }
}