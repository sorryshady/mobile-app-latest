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
import { images, icons } from "@/constants";
import CustomButton from "./custom-button";

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

  const closeModal = () => {
    setImageModalVisible(false);
    setSelectedImage(null);
  };

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'ios') return true;

    const { status: existingStatus } = await ImagePicker.getCameraPermissionsAsync();

    if (existingStatus === 'granted') return true;

    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        "Permission Required",
        "Please grant camera access to take photos.",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Settings",
            onPress: () => Linking.openSettings(),
          },
        ],
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image from gallery");
    }
  };

  const takePhoto = async () => {
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return;

      const result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo");
    }
  };

  const confirmImage = () => {
    if (selectedImage) {
      onImageSelected(selectedImage);
    }
    setImageModalVisible(false);
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
                handlePress={takePhoto}
                containerStyles="bg-[#5386A4] w-full"
                textStyles="text-white font-pmedium"
              />
              <CustomButton
                title="Select from Gallery"
                handlePress={pickImage}
                containerStyles="bg-[#5386A4] w-full"
                textStyles="text-white font-pmedium"
              />
              {selectedImage && (
                <CustomButton
                  title="Confirm"
                  handlePress={confirmImage}
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
