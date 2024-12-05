import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
  Linking,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { images, icons } from "@/constants";
import CustomButton from "./custom-button";
import { updateProfilePhoto } from "@/api/user";
import { pickImage, takePhoto } from "@/lib/image-uploads";

interface ProfileImagePickerProps {
  currentPhotoUrl: string | null;
  onImageSelected: (imageUri: string) => void;
  name: string;
  createdAt: string;
}

const ProfileImagePicker: React.FC<ProfileImagePickerProps> = ({
  currentPhotoUrl,
  onImageSelected,
  name,
  createdAt,
}) => {
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    setImageModalVisible(false);
    setSelectedImage(null);
  };

  const confirmImage = async () => {
    if (selectedImage) {
      try {
        setIsLoading(true);
        const result = await updateProfilePhoto(selectedImage, name || "user");
        if (result.error) {
          Alert.alert("Error", result.error);
        }
        onImageSelected(result?.photoUrl);
        setImageModalVisible(false);
        setSelectedImage(null);
      } catch (error) {
        Alert.alert("Error", "Failed to update profile picture");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View className="items-center mb-6">
      <View className="relative">
        <Image
          source={
            selectedImage
              ? { uri: selectedImage }
              : currentPhotoUrl
                ? { uri: currentPhotoUrl }
                : images.avatar
          }
          className="w-32 h-32 rounded-full"
          resizeMode="cover"
        />
        <TouchableOpacity
          className="absolute bottom-0 right-0 bg-white p-2 rounded-full"
          onPress={() => setImageModalVisible(true)}
        >
          <Image source={icons.camera} className="w-5 h-5" />
        </TouchableOpacity>
      </View>
      <Text className="text-xl text-white font-pbold mt-3">{name}</Text>
      <Text className="text-white mt-1">
        Member since {new Date(createdAt).getFullYear()}
      </Text>

      {/* Image Picker Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            <Text className="text-xl font-pbold text-center mb-6">
              Select Image
            </Text>
            <View className="gap-4">
              <CustomButton
                title="Take Photo"
                handlePress={() => takePhoto(setSelectedImage)}
                containerStyles="bg-[#5386A4] w-full"
                textStyles="text-white font-pmedium"
              />
              <CustomButton
                title="Select from Gallery"
                handlePress={() => pickImage(setSelectedImage)}
                containerStyles="bg-[#5386A4] w-full"
                textStyles="text-white font-pmedium"
              />
              {selectedImage && (
                <CustomButton
                  title="Confirm"
                  handlePress={confirmImage}
                  loadingText="Updating..."
                  isLoading={isLoading}
                  containerStyles="bg-green-500 w-full"
                  textStyles="text-white font-pmedium"
                />
              )}
              <CustomButton
                title="Cancel"
                handlePress={closeModal}
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

export default ProfileImagePicker;
