import { Text, View } from "react-native";
import React from "react";

const Steps = ({ currentStep }: { currentStep: number }) => {
  return (
    <View className="flex flex-row justify-between">
      {[1, 2, 3, 4].map((step) => (
        <View
          key={step}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step === currentStep
              ? "bg-[#FACE30] "
              : currentStep > step
                ? "bg-green-600 "
                : "bg-gray-200 "
          }`}
        >
          <Text
            className={` text-center ${
              step === currentStep
                ? "text-black"
                : currentStep > step
                  ? "text-white"
                  : "text-gray-600"
            }`}
          >
            {step}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Steps;
