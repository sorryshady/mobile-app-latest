import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ContactDetails, District, RegistrationStep } from "@/constants/types";
import ErrorMessage from "./error-message";
import CustomButton from "./custom-button";
import FormField from "./form-field";
import CustomDropDown from "./custom-drop-down";
import { changeTypeToText } from "@/lib/utils";

const ContactInfoForm = ({
  handleNext,
  handlePrevious,
  error,
  contactDetails,
  setContactDetails,
}: {
  handleNext: (step: RegistrationStep) => void;
  handlePrevious: () => void;
  error: string;
  contactDetails: ContactDetails;
  setContactDetails: (contactDetails: ContactDetails) => void;
}) => {
  return (
    <View className="gap-4">
      <FormField
        placeholder="Personal Address"
        title="Personal Address"
        value={contactDetails.personalAddress}
        handleChangeText={(e) =>
          setContactDetails({ ...contactDetails, personalAddress: e })
        }
      />
      <CustomDropDown
        data={Object.values(District).map((district) => ({
          label: changeTypeToText(district),
          value: district,
        }))}
        placeholder="Home District"
        value={contactDetails.homeDistrict || ""}
        handleValueChange={(e) =>
          setContactDetails({
            ...contactDetails,
            homeDistrict: e as District,
          })
        }
      />
      <FormField
        placeholder="Enter your email"
        title="Email"
        value={contactDetails.email}
        handleChangeText={(e) =>
          setContactDetails({ ...contactDetails, email: e })
        }
      />
      <FormField
        placeholder="Enter your phone number"
        title="Phone Number (optional)"
        value={contactDetails.phoneNumber || ""}
        handleChangeText={(e) =>
          setContactDetails({ ...contactDetails, phoneNumber: e })
        }
      />
      <FormField
        placeholder="Enter your mobile number"
        title="Mobile Number"
        value={contactDetails.mobileNumber || ""}
        handleChangeText={(e) =>
          setContactDetails({ ...contactDetails, mobileNumber: e })
        }
      />
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

export default ContactInfoForm;

const styles = StyleSheet.create({});
