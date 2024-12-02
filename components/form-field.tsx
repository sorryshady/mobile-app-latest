import {
  Image,
  KeyboardTypeOptions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

interface Props {
  title: string;
  type?: string;
  value: string;
  placeholder?: string;
  handleChangeText: (e: string) => void;
  otherStyles?: string;
  labelStyles?: string;
  keyboardType?: KeyboardTypeOptions;
  [key: string]: any;
}
const FormField = ({
  title,
  type = "text",
  value,
  handleChangeText,
  placeholder,
  otherStyles,
  keyboardType,
  labelStyles,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`gap-2 ${otherStyles}`}>
      <Text className={`text-base font-pmedium ${labelStyles}`}>{title}</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-white rounded-2xl focus:border-secondary flex-row items-center">
        <TextInput
          className="flex-1 text-black font-pmedium text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={type === "password" && !showPassword}
          keyboardType={keyboardType || "default"}
        />
        {type === "password" && (
          <TouchableOpacity
            className="text-gray-100 text-base font-psemibold"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              tintColor={"black"}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
