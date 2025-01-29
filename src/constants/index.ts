import { Tag } from "@/types";
import { Dimensions } from "react-native";

export const kDefaultProductColor = '#FF00FF'

export const kColorSize = 50

export const kColorPickerCount = Math.floor((Dimensions.get("window").width / kColorSize) * 1.75) - 2 ;

export const kDebug = process.env.EXPO_PUBLIC_DEBUG_MODE

export const kDatabaseName = 'database.sqlite'

export const kProductTags: Tag[] = [
    {text: 'Disponible', value: 'avaliable'},
    {text: 'Indisponible', value: 'unavaliable'}
] 

export const kFirstRunKey = 'first_run'