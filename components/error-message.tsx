import { Image, Text, View } from "react-native";
import React from "react";
import { icons } from "../constants";
const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-red-400 rounded-2xl focus:border-secondary items-center flex-row mt-4 gap-2 justify-center">
      <Image source={icons.alert} className="w-6 h-6" tintColor={"white"} />
      <Text className="text-white font-psemibold">{error}</Text>
    </View>
  );
};

export default ErrorMessage;
