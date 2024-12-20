import { Image, Text, View } from "react-native";
import React from "react";
import { icons } from "../constants";
const SuccessMessage = ({ message }: { message: string }) => {
  return (
    <View className="w-full h-14 px-4 bg-emerald-400 rounded-2xl items-center flex-row mt-4 gap-2 justify-center">
      <Image source={icons.check} className="w-6 h-6" tintColor={"white"} />
      <Text className="text-white font-psemibold max-w-[90%] text-wrap">
        {message}
      </Text>
    </View>
  );
};

export default SuccessMessage;
