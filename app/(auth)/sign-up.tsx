import GradientBackground from "@/components/gradient-background";
import PersonalInfoForm from "@/components/personal-info-form";
import images from "@/constants/images";
import {
  BloodGroup,
  Gender,
  PersonalDetails,
  RegistrationStep,
} from "@/constants/types";
import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const [error, setError] = useState<string>("");
  const [step, setStep] = useState<RegistrationStep>(1);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    name: "",
    dob: "",
    gender: Gender.MALE,
    bloodGroup: BloodGroup.A_POS,
  });
  const handleNext = (step: RegistrationStep) => {
    switch (step) {
      case 1:
        if (
          personalDetails.name.length > 0 &&
          personalDetails.dob.length > 0 &&
          personalDetails.gender &&
          personalDetails.bloodGroup
        ) {
          setStep(2);
        } else {
          setError("Please fill all the fields");
        }
        break;
    }
  };
  return (
    <SafeAreaView className="h-full relative">
      <GradientBackground>
        <ScrollView>
          <View className="items-center p-6 gap-5">
            <Image
              source={images.logo}
              className="w-[150px] h-[150px]"
              resizeMode="contain"
            />
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="bg-white rounded-2xl w-full gap-5 relative mb-[5rem]"
            >
              <Image
                source={images.background}
                className="w-full h-full absolute opacity-10"
                resizeMode="cover"
              />
              <View className="p-6 gap-5">
                <Text className="text-black text-center font-psemibold text-2xl mt-5">
                  Sign Up
                </Text>
                {step === 1 && (
                  <PersonalInfoForm
                    personalDetails={personalDetails}
                    setPersonalDetails={setPersonalDetails}
                    handleNext={() => handleNext(1)}
                    error={error}
                  />
                )}
                <View className="flex-row justify-center items-center">
                  <Text className="text-black font-semibold">
                    Already have an account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => router.push("/sign-in")}
                    className="ml-1" // Added margin to separate from the text
                  >
                    <Text className="text-blue-500 font-semibold">Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </GradientBackground>
    </SafeAreaView>
  );
};
export default SignUp;
