import {
  Keyboard,
  SafeAreaView,
  Platform,
  Text,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import GradientBackground from "@/components/gradient-background";
import images from "@/constants/images";
import { router, useLocalSearchParams } from "expo-router";
import { fetchSecurityQuestion } from "@/api/forgot-password";
import SecurityQuestionForm from "@/components/security-question-form";
import ErrorMessage from "@/components/error-message";

const ForgotPassword = () => {
  const { userId }: { userId: string } = useLocalSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<{
    id: string;
    name: string;
    securityQuestion: string;
  } | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (userId) {
          const response = await fetchSecurityQuestion(userId);
          if (response?.error) {
            setError(response.error);
          } else {
            setUserDetails(response?.user);
          }
        } else {
          setError("User ID is required");
        }
      } catch (error) {
        setError("Something went wrong");
      }
    };
    fetchUserDetails();
  }, [userId]);

  return (
    <SafeAreaView className="h-full relative">
      <GradientBackground>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
            className="flex-1"
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="items-center p-6 gap-5">
                <Image
                  source={images.logo}
                  className="w-[150px] h-[150px]"
                  resizeMode="contain"
                />
                <View className="bg-white rounded-2xl w-full gap-5 relative mb-[5rem]">
                  <Image
                    source={images.background}
                    className="w-full h-full absolute opacity-10"
                    resizeMode="cover"
                  />
                  <View className="p-6 gap-5">
                    <Text className="text-black text-center font-psemibold text-2xl mt-5">
                      Forgot Password
                    </Text>

                    <View className="text-center gap-4">
                      {userDetails ? (
                        <Text className="text-black text-base font-semibold">
                          Hi{" "}
                          <Text className="text-primary font-psemibold">
                            {userDetails.name}
                          </Text>
                          , please answer your security question to reset your
                          password.
                        </Text>
                      ) : (
                        <Text className="text-black text-base font-semibold text-center">
                          Loading user details, please wait...
                        </Text>
                      )}
                      {error && <ErrorMessage error={error} />}
                      {userDetails && (
                        <SecurityQuestionForm
                          userDetails={userDetails}
                          onBack={() => router.back()}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </GradientBackground>
    </SafeAreaView>
  );
};

export default ForgotPassword;
