import ContactInfoForm from "@/components/contact-info-form";
import GradientBackground from "@/components/gradient-background";
import PersonalInfoForm from "@/components/personal-info-form";
import ProfessionalInfoForm from "@/components/professional-info-form";
import UploadPhotoForm from "@/components/upload-photo-form";
import images from "@/constants/images";
import {
  BloodGroup,
  ContactDetails,
  Department,
  Designation,
  District,
  Gender,
  PersonalDetails,
  ProfessionalDetails,
  ProfilePhoto,
  RegistrationStep,
  UserStatus,
} from "@/constants/types";
import {
  isValidDate,
  isValidEmail,
  isValidMobileNumber,
  isValidPhoneNumber,
} from "@/lib/utils";
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
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    personalAddress: "",
    homeDistrict: null,
    email: "",
    phoneNumber: "",
    mobileNumber: "",
  });
  const [profilePhoto, setProfilePhoto] = useState<ProfilePhoto>({
    photoUrl: "",
    photoId: "",
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
      case 3:
        if (
          contactDetails.personalAddress.length > 0 &&
          contactDetails.homeDistrict &&
          contactDetails.email.length > 0 &&
          contactDetails.mobileNumber.length > 0
        ) {
          if (!isValidEmail(contactDetails.email)) {
            setError("Invalid email");
          } else if (!isValidMobileNumber(contactDetails.mobileNumber)) {
            setError("Invalid mobile number");
          } else if (
            contactDetails.phoneNumber &&
            contactDetails.phoneNumber.length > 0 &&
            !isValidPhoneNumber(contactDetails.phoneNumber)
          ) {
            setError("Invalid phone number");
          } else {
            setError("");
            setStep(4);
          }
        } else {
          setError("Please fill all the fields");
        }
        break;
      case 4:
        const userData = {
          personalDetails,
          professionalDetails,
          contactDetails,
          profilePhoto,
        };
        console.log("User Data: ", userData);
    }
  };
  return (
    <SafeAreaView className="flex-1">
      <GradientBackground>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="flex-1 items-center p-6 gap-5">
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
                      <ContactInfoForm
                        contactDetails={contactDetails}
                        setContactDetails={setContactDetails}
                        handleNext={() => handleNext(3)}
                        handlePrevious={() => setStep(2)}
                        error={error}
                      />
                    )}
                    {step === 4 && (
                      <UploadPhotoForm
                        userName={personalDetails.name}
                        profilePhoto={profilePhoto}
                        setProfilePhoto={setProfilePhoto}
                        handleNext={() => handleNext(4)}
                        handlePrevious={() => setStep(3)}
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
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </GradientBackground>
    </SafeAreaView>
  );
};
export default SignUp;
