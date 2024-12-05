import { View } from "react-native";
import FormField from "./form-field";
import {
  BloodGroup,
  Gender,
  PersonalDetails,
  RegistrationStep,
} from "@/constants/types";
import CustomDropDown from "./custom-drop-down";
import { changeTypeToText } from "@/lib/utils";
import CustomButton from "./custom-button";
import ErrorMessage from "./error-message";

const PersonalInfoForm = ({
  personalDetails,
  setPersonalDetails,
  handleNext,
  error,
}: {
  personalDetails: PersonalDetails;
  setPersonalDetails: (personalDetails: PersonalDetails) => void;
  handleNext: (step: RegistrationStep) => void;
  error: string;
}) => {
  return (
    <View className="gap-4">
      <FormField
        title="Name"
        placeholder="Enter your name"
        value={personalDetails.name}
        handleChangeText={(e: string) =>
          setPersonalDetails({ ...personalDetails, name: e })
        }
      />
      <FormField
        title="Date of Birth"
        placeholder="Enter your date of birth"
        value={personalDetails.dob}
        handleChangeText={(e: string) =>
          setPersonalDetails({ ...personalDetails, dob: e })
        }
      />
      <CustomDropDown
        placeholder="Gender"
        data={Object.values(Gender).map((gender) => ({
          label: changeTypeToText(gender),
          value: gender,
        }))}
        value={personalDetails.gender ?? ""}
        handleValueChange={(value: string) =>
          setPersonalDetails({
            ...personalDetails,
            gender: value as Gender,
          })
        }
      />
      <CustomDropDown
        placeholder="Blood Group"
        data={Object.values(BloodGroup).map((bloodGroup) => ({
          label: changeTypeToText(bloodGroup),
          value: bloodGroup,
        }))}
        value={personalDetails.bloodGroup ?? ""}
        handleValueChange={(value: string) =>
          setPersonalDetails({
            ...personalDetails,
            bloodGroup: value as BloodGroup,
          })
        }
      />
      {error && <ErrorMessage error={error} />}
      <View className="items-end">
        <CustomButton
          title="Next"
          containerStyles="w-fit px-4 bg-[#1F333E]"
          textStyles="text-white"
          handlePress={() => handleNext(2)}
        />
      </View>
    </View>
  );
};

export default PersonalInfoForm;
