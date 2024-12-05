import GradientBackground from "@/components/gradient-background";
import PersonalInfoForm from "@/components/personal-info-form";
import ProfessionalInfoForm from "@/components/professional-info-form";
import images from "@/constants/images";
import {
  BloodGroup,
  Department,
  Designation,
  District,
  Gender,
  PersonalDetails,
  ProfessionalDetails,
  RegistrationStep,
  UserStatus,
} from "@/constants/types";
import { isValidDate } from "@/lib/utils";
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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const [error, setError] = useState<string>("");
  const [step, setStep] = useState<RegistrationStep>(1);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    name: "",
    dob: "",
    gender: null,
    bloodGroup: null,
  });
  const [professionalDetails, setProfessionalDetails] =
    useState<ProfessionalDetails>({
      userStatus: null,
      department: null,
      designation: null,
      officeAddress: "",
      workDistrict: null,
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
          if (isValidDate(personalDetails.dob)) {
            setError("");
            setStep(2);
          } else {
            setError("Invalid date of birth");
          }
        } else {
          setError("Please fill all the fields");
        }
        break;
      case 2:
        if (
          professionalDetails.userStatus &&
          (professionalDetails.userStatus === "WORKING"
            ? professionalDetails.department &&
              professionalDetails.designation &&
              professionalDetails.officeAddress.length > 0 &&
              professionalDetails.workDistrict
            : true)
        ) {
          setError("");
          setStep(3);
        } else {
          setError("Please fill all the fields");
        }
        break;
    }
  };
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
                    {step === 2 && (
                      <ProfessionalInfoForm
                        professionalDetails={professionalDetails}
                        setProfessionalDetails={setProfessionalDetails}
                        handleNext={() => handleNext(2)}
                        handlePrevious={() => setStep(1)}
                        error={error}
                      />
                    )}
                    {step === 3 && (
                      <ProfessionalInfoForm
                        professionalDetails={professionalDetails}
                        setProfessionalDetails={setProfessionalDetails}
                        handleNext={() => handleNext(2)}
                        handlePrevious={() => setStep(1)}
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
                        <Text className="text-blue-500 font-semibold">
                          Login
                        </Text>
                      </TouchableOpacity>
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
export default SignUp;
