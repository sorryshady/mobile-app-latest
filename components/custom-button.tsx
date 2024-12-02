import { TouchableOpacity, Text } from "react-native";
import React from "react";

interface Props {
  title: string;
  containerStyles?: string;
  handlePress: () => void;
  isLoading?: boolean;
  textStyles?: string;
  loadingText?: string;
}
const CustomButton = ({
  title,
  containerStyles,
  handlePress,
  isLoading,
  textStyles,
  loadingText = "Loading...",
}: Props) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-90" : ""}`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {isLoading ? loadingText : title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
