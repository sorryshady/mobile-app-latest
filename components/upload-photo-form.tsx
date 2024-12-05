import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ErrorMessage from "./error-message";
import CustomButton from "./custom-button";
import { RegistrationStep } from "@/constants/types";

const UploadPhotoForm = ({
  handleNext,
  handlePrevious,
  error,
}: {
  handleNext: (step: RegistrationStep) => void;
  handlePrevious: () => void;
  error: string;
}) => {
  return (
    <View className="gap-4">
      <Text>UploadPhotoForm</Text>
      {error && <ErrorMessage error={error} />}
      <View className="flex flex-row justify-between gap-32">
        <CustomButton
          title="Previous"
          containerStyles="w-fit px-4 bg-white border border-[#1F333E] flex-1"
          textStyles="text-[#1F333E]"
          handlePress={handlePrevious}
        />
        <CustomButton
          title="Next"
          containerStyles="w-fit px-4 bg-[#1F333E] flex-1"
          textStyles="text-white"
          handlePress={() => handleNext(3)}
        />
      </View>
    </View>
  );
};

export default UploadPhotoForm;

const styles = StyleSheet.create({});
