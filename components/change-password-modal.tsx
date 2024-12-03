import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FormField from "./form-field";
import CustomButton from "./custom-button";
import ErrorMessage from "./error-message";
import { changePassword } from "@/api/user";
import SuccessMessage from "./success-message";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ visible, onClose }: Props) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setError(null);
      setIsLoading(true);
      setSuccessMessage(null);

      // Validate passwords match
      if (formData.newPassword !== formData.confirmPassword) {
        setError("Passwords don't match");
        return;
      }

      // Validate all fields are filled
      if (!formData.currentPassword || !formData.newPassword) {
        setError("All fields are required");
        return;
      }

      const response = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (response?.error) {
        setError(response.error);
        return;
      }

      // Reset form and close modal on success
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setSuccessMessage("Password changed successfully");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="overFullScreen"
      statusBarTranslucent={true}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-end bg-black/50"
      >
        <View className="bg-white rounded-t-3xl p-6">
          <Text className="text-xl font-pbold text-center mb-6">
            Change Password
          </Text>

          <View className="gap-4">
            <FormField
              title="Current Password"
              type="password"
              value={formData.currentPassword}
              handleChangeText={(text) =>
                setFormData((prev) => ({ ...prev, currentPassword: text }))
              }
              placeholder="Enter current password"
            />

            <FormField
              title="New Password"
              type="password"
              value={formData.newPassword}
              handleChangeText={(text) =>
                setFormData((prev) => ({ ...prev, newPassword: text }))
              }
              placeholder="Enter new password"
              showPasswordStrength={true}
            />

            <FormField
              title="Confirm New Password"
              type="password"
              value={formData.confirmPassword}
              handleChangeText={(text) =>
                setFormData((prev) => ({ ...prev, confirmPassword: text }))
              }
              placeholder="Confirm new password"
            />

            {error && <ErrorMessage error={error} />}
            {successMessage && <SuccessMessage message={successMessage} />}
            <View className="gap-4 mt-4">
              <CustomButton
                title="Change Password"
                handlePress={handleSubmit}
                isLoading={isLoading}
                containerStyles="bg-[#5386A4]"
                textStyles="text-white"
              />

              <CustomButton
                title="Cancel"
                handlePress={onClose}
                containerStyles="bg-gray-200"
                textStyles="text-gray-700"
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ChangePasswordModal;
