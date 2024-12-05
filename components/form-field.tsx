import {
  Image,
  KeyboardTypeOptions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
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
  showPasswordStrength?: boolean;
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
  showPasswordStrength = false,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [checks, setChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    if (showPasswordStrength) {
      setChecks({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[^A-Za-z0-9]/.test(value),
      });
    }
  }, [value, showPasswordStrength]);

  return (
    <View className={`gap-2 ${otherStyles}`}>
      <Text className={`text-base font-pmedium ${labelStyles}`}>{title}</Text>
      <View className="border-2 border-black-200 w-full h-14 px-4 bg-white rounded-2xl focus:border-secondary flex-row items-center">
        <TextInput
          className="flex-1 text-black font-pmedium text-base h-full"
          value={value || undefined}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={type === "password" && !showPassword}
          keyboardType={keyboardType || "default"}
          {...props}
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

      {showPasswordStrength && (
        <View className="mt-2 gap-1">
          <Text className="text-xs font-pmedium text-gray-500">
            Password must contain:
          </Text>
          <View className="flex-row flex-wrap gap-2">
            <Text
              className={`text-xs ${checks.length ? "text-green-600" : "text-red-500"}`}
            >
              • At least 8 characters
            </Text>
            <Text
              className={`text-xs ${checks.uppercase ? "text-green-600" : "text-red-500"}`}
            >
              • One uppercase letter
            </Text>
            <Text
              className={`text-xs ${checks.lowercase ? "text-green-600" : "text-red-500"}`}
            >
              • One lowercase letter
            </Text>
            <Text
              className={`text-xs ${checks.number ? "text-green-600" : "text-red-500"}`}
            >
              • One number
            </Text>
            <Text
              className={`text-xs ${checks.special ? "text-green-600" : "text-red-500"}`}
            >
              • One special character
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default FormField;
