import { Platform } from "react-native";

const LIVE_URL = "https://us-central1-meals-to-go-81601.cloudfunctions.net";
const DEV_URL = "http://127.0.0.1:5001/meals-to-go-81601/us-central1";

export const isAndroid = Platform.OS === "android";
export const isDevelopment = process.env.NODE_ENV === "development";
export const host = !isDevelopment || isAndroid ? LIVE_URL : DEV_URL;
export const isMock = isDevelopment;
