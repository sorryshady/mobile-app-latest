import { Text, View } from "react-native";
import React from "react";
import {
  ProfessionalDetails,
  RegistrationStep,
  UserStatus,
  Department,
  Designation,
  District,
} from "@/constants/types";
import ErrorMessage from "./error-message";
import CustomButton from "./custom-button";
import FormField from "./form-field";
import CustomDropDown from "./custom-drop-down";
import { changeTypeToText } from "@/lib/utils";

const ProfessionalInfoForm = ({
  handleNext,
  handlePrevious,
  error,
  professionalDetails,
  setProfessionalDetails,
}: {
  handleNext: (step: RegistrationStep) => void;
  handlePrevious: () => void;
  error: string;
  professionalDetails: ProfessionalDetails;
  setProfessionalDetails: (professionalDetails: ProfessionalDetails) => void;
}) => {
  return (
    <View className="gap-4">
      <CustomDropDown
        data={[
          { label: "Working", value: "WORKING" },
          { label: "Retired", value: "RETIRED" },
        ]}
        placeholder="Working Status"
        value={professionalDetails.userStatus || ""}
        handleValueChange={(e) =>
          setProfessionalDetails({
            ...professionalDetails,
            userStatus: e as UserStatus,
          })
        }
      />
      {professionalDetails.userStatus === "WORKING" && (
        <>
          <CustomDropDown
            data={Object.values(Department).map((department) => ({
              label: changeTypeToText(department),
              value: department,
            }))}
            placeholder="Department"
            value={professionalDetails.department || ""}
            handleValueChange={(e) =>
              setProfessionalDetails({
                ...professionalDetails,
                department: e as Department,
              })
            }
          />
          <CustomDropDown
            data={Object.values(Designation).map((designation) => ({
              label: changeTypeToText(designation),
              value: designation,
            }))}
            placeholder="Designation"
            value={professionalDetails.designation || ""}
            handleValueChange={(e) =>
              setProfessionalDetails({
                ...professionalDetails,
                designation: e as Designation,
              })
            }
          />
          <FormField
            title="Office Address"
            placeholder="Office Address"
            value={professionalDetails.officeAddress}
            handleChangeText={(e) =>
              setProfessionalDetails({
                ...professionalDetails,
                officeAddress: e,
              })
            }
          />
          <CustomDropDown
            data={Object.values(District).map((district) => ({
              label: changeTypeToText(district),
              value: district,
            }))}
            placeholder="Work District"
            value={professionalDetails.workDistrict || ""}
            handleValueChange={(e) =>
              setProfessionalDetails({
                ...professionalDetails,
                workDistrict: e as District,
              })
            }
          />
        </>
      )}

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
          handlePress={() => handleNext(2)}
        />
      </View>
    </View>
  );
};

export default ProfessionalInfoForm;
