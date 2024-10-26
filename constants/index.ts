import { Dimensions } from "react-native";

export const kColorSize = 50

export const kColorPickerCount = Math.floor((Dimensions.get("window").width / kColorSize) * 1.75) - 2 ;