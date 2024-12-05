import { Alert, Modal, Platform, Text, View, Image } from "react-native";
import React, { useState } from "react";
import ErrorMessage from "./error-message";
import CustomButton from "./custom-button";
import { RegistrationStep, ProfilePhoto } from "@/constants/types";
import { pickImage, takePhoto } from "@/lib/image-uploads";
import SuccessMessage from "./success-message";
import { uploadProfilePhoto } from "@/api/user";

interface Props {
  handleNext: (step: RegistrationStep) => void;
  handlePrevious: () => void;
  error: string;
  userName: string;
  profilePhoto: ProfilePhoto;
  setProfilePhoto: (profilePhoto: ProfilePhoto) => void;
}

const UploadPhotoForm = ({
  handleNext,
  handlePrevious,
  error,
  userName = `Test User ${Math.floor(Math.random() * 10000)}`,
  profilePhoto,
  setProfilePhoto,
}: Props) => {
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageSelect = async (
    imageFunction: () => Promise<string | null>,
  ) => {
    try {
      const result = await imageFunction();
      if (result) {
        setSelectedImage(result);
        setImageModalVisible(false);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Error", "Failed to select image");
    }
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      // Add your image upload logic here
      console.log("Confirming image:", selectedImage);
      if (selectedImage) {
        const response = await uploadProfilePhoto(selectedImage, userName);
        setProfilePhoto({
          photoUrl: response.photoUrl,
          photoId: response.photoId,
        });
        // After successful upload:
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error confirming image:", error);
      Alert.alert("Error", "Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
  };

  return (
    <View className="gap-4">
      <Text className="text-base font-pmedium mb-[1rem]">
        Upload Photo (optional)
      </Text>

      {selectedImage ? (
        <View className="items-center gap-4">
          <Image
            source={{ uri: selectedImage }}
            className="w-32 h-32 rounded-full mb-[1rem]"
            resizeMode="cover"
          />
          {!profilePhoto.photoUrl && (
            <View className="flex-row gap-4 w-full">
              <CustomButton
                title="Cancel"
                handlePress={handleCancel}
                containerStyles=" flex-1"
                textStyles="text-red-500"
              />
              <CustomButton
                title="Confirm"
                handlePress={handleConfirm}
                loadingText="Uploading..."
                isLoading={isLoading}
                containerStyles=" flex-1"
                textStyles="text-emerald-500"
              />
            </View>
          )}
        </View>
      ) : (
        <View className="w-full h-[100px] flex-1 items-center justify-center">
          <CustomButton
            title="Upload Photo"
            handlePress={() => setImageModalVisible(true)}
            textStyles="text-white"
            containerStyles="bg-[#5386A4] w-full"
          />
        </View>
      )}

      {error && <ErrorMessage error={error} />}
      {success && <SuccessMessage message="Photo uploaded successfully" />}

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
          isLoading={isLoading}
          handlePress={() => handleNext(4)}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            <Text className="text-xl font-pbold text-center mb-6">
              Select Image
            </Text>
            <View className="gap-4">
              <CustomButton
                title="Take Photo"
                handlePress={() =>
                  handleImageSelect(async () => {
                    let uri = null;
                    await takePhoto((selectedUri) => {
                      uri = selectedUri;
                    });
                    return uri;
                  })
                }
                containerStyles="bg-[#5386A4] w-full"
                textStyles="text-white font-pmedium"
              />
              <CustomButton
                title="Select from Gallery"
                handlePress={() =>
                  handleImageSelect(async () => {
                    let uri = null;
                    await pickImage((selectedUri) => {
                      uri = selectedUri;
                    });
                    return uri;
                  })
                }
                containerStyles="bg-[#5386A4] w-full"
                textStyles="text-white font-pmedium"
              />
              <CustomButton
                title="Cancel"
                handlePress={() => setImageModalVisible(false)}
                containerStyles="bg-gray-200 w-full"
                textStyles="text-gray-700 font-pmedium"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UploadPhotoForm;
