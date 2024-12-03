import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import FormField from "./form-field";
import CustomButton from "./custom-button";
import CustomDropDown from "./custom-drop-down";
import ErrorMessage from "./error-message";
import {
  District,
  Designation,
  TransferRequest,
  CompleteUser,
  PromotionRequest,
  RetirementRequest,
  Request,
} from "@/constants/types";
import { changeTypeToText } from "@/lib/utils";
import { getToken } from "@/lib/handle-session-tokens";
import { submitRequest } from "@/api/user";
import SuccessMessage from "./success-message";
import { useGlobalContext } from "@/context/global-provider";

interface Props {
  visible: boolean;
  onClose: () => void;
}

type RequestType = "PROMOTION" | "TRANSFER" | "RETIREMENT";

const SubmitRequestModal = ({ visible, onClose }: Props) => {
  const { completeUserData } = useGlobalContext();
  const [requestType, setRequestType] = useState<RequestType>("PROMOTION");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Move initial state to useEffect
  const [transferData, setTransferData] = useState<TransferRequest>({
    newWorkDistrict: District.THIRUVANANTHAPURAM,
    newOfficeAddress: "",
  });

  const [promotionData, setPromotionData] = useState<PromotionRequest>({
    newPosition: Designation.ASSISTANT_ENGINEER,
  });

  const [retirementData, setRetirementData] = useState<RetirementRequest>({
    retirementDate: new Date().toLocaleDateString("en-GB"),
  });

  // Add useEffect to update form data when completeUserData changes
  useEffect(() => {
    if (completeUserData) {
      setTransferData({
        newWorkDistrict:
          completeUserData.workDistrict || District.THIRUVANANTHAPURAM,
        newOfficeAddress: completeUserData.officeAddress || "",
      });

      setPromotionData({
        newPosition:
          completeUserData.designation || Designation.ASSISTANT_ENGINEER,
      });

      setRetirementData({
        retirementDate: new Date().toLocaleDateString("en-GB"),
      });
    }
  }, [completeUserData]);

  const handleSubmit = async () => {
    try {
      setError(null);
      setSuccessMessage(null);
      setIsLoading(true);

      let requestData = {};

      // Validate and prepare data based on request type
      switch (requestType) {
        case "TRANSFER":
          if (!transferData.newWorkDistrict || !transferData.newOfficeAddress) {
            throw new Error("All fields are required");
          }
          requestData = {
            requestType: "TRANSFER",
            ...transferData,
          };
          break;

        case "PROMOTION":
          if (!promotionData.newPosition) {
            throw new Error("New position is required");
          }
          requestData = {
            requestType: "PROMOTION",
            ...promotionData,
          };
          break;

        case "RETIREMENT":
          if (!retirementData.retirementDate) {
            throw new Error("Retirement date is required");
          }
          requestData = {
            requestType: "RETIREMENT",
            ...retirementData,
          };
          break;
      }

      const response = await submitRequest(requestData as Request);

      if (response?.error) {
        setError(response.error);
        return;
      }

      // Reset form and close modal on success
      setTransferData({
        newWorkDistrict:
          completeUserData?.workDistrict || District.THIRUVANANTHAPURAM,
        newOfficeAddress: completeUserData?.officeAddress || "",
      });
      setPromotionData({
        newPosition:
          completeUserData?.designation || Designation.ASSISTANT_ENGINEER,
      });
      setRetirementData({
        retirementDate: new Date().toLocaleDateString("en-GB"),
      });

      setSuccessMessage("Request submitted successfully");
      setTimeout(() => {
        onClose();
        setSuccessMessage(null);
      }, 1000);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    switch (requestType) {
      case "TRANSFER":
        return (
          <View className="gap-4">
            <CustomDropDown
              placeholder="New Work District"
              data={Object.values(District).map((district) => ({
                label: changeTypeToText(district),
                value: district,
              }))}
              value={transferData.newWorkDistrict}
              handleValueChange={(value: string) =>
                setTransferData((prev) => ({
                  ...prev,
                  newWorkDistrict: value as District,
                }))
              }
            />
            <FormField
              title="New Office Address"
              value={transferData.newOfficeAddress}
              handleChangeText={(text) =>
                setTransferData((prev) => ({ ...prev, newOfficeAddress: text }))
              }
              placeholder="Enter new office address"
            />
          </View>
        );

      case "PROMOTION":
        return (
          <CustomDropDown
            placeholder="New Position"
            data={Object.values(Designation).map((designation) => ({
              label: changeTypeToText(designation),
              value: designation,
            }))}
            value={promotionData.newPosition}
            handleValueChange={(value: string) =>
              setPromotionData({ newPosition: value as Designation })
            }
          />
        );

      case "RETIREMENT":
        return (
          <FormField
            title="Retirement Date"
            value={retirementData.retirementDate}
            handleChangeText={(text: string) =>
              setRetirementData({ retirementDate: text })
            }
            placeholder="DD/MM/YYYY"
          />
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-end bg-black/50"
      >
        <View className="bg-white rounded-t-3xl p-6">
          <Text className="text-xl font-pbold text-center mb-6">
            Submit Request
          </Text>

          <View className="gap-4">
            <CustomDropDown
              placeholder="Request Type"
              data={[
                { label: "Promotion", value: "PROMOTION" },
                { label: "Transfer", value: "TRANSFER" },
                { label: "Retirement", value: "RETIREMENT" },
              ]}
              value={requestType}
              handleValueChange={(value) =>
                setRequestType(value as RequestType)
              }
            />

            {renderForm()}

            {error && <ErrorMessage error={error} />}
            {successMessage && <SuccessMessage message={successMessage} />}

            <View className="gap-4 mt-4">
              <CustomButton
                title="Submit Request"
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

export default SubmitRequestModal;
