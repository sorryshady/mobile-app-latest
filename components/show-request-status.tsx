import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "@/constants";
import { Verification } from "@/constants/types";

interface ShowRequestStatusProps {
  latestRequest: {
    status: Verification;
    adminComments?: string;
    id: string;
    showAgain: boolean;
  };
  hideUserRequest: (id: string) => Promise<void>;
  setLatestRequest: React.Dispatch<React.SetStateAction<any>>;
}

const ShowRequestStatus: React.FC<ShowRequestStatusProps> = ({
  latestRequest,
  hideUserRequest,
  setLatestRequest,
}) => {
  return (
    <View
      className={`w-full h-14 px-4 rounded-2xl items-center flex-row my-4 gap-2 justify-between ${
        latestRequest.status === "VERIFIED"
          ? "bg-green-400"
          : latestRequest.status === "REJECTED"
            ? "bg-red-400"
            : "bg-yellow-400"
      }`}
    >
      <View className="flex-row items-center gap-2">
        <Image
          source={
            latestRequest.status === "VERIFIED"
              ? icons.check
              : latestRequest.status === "REJECTED"
                ? icons.alert
                : icons.clock
          }
          className="w-6 h-6"
          tintColor="white"
        />
        <View>
          <Text className="text-white font-psemibold">
            {latestRequest.status} Request
          </Text>
          {latestRequest.adminComments && (
            <Text className="text-white text-xs">
              {latestRequest.adminComments}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={async () => {
          try {
            if (latestRequest.status !== "PENDING") {
              await hideUserRequest(latestRequest.id);
            }
            setLatestRequest((prev: ShowRequestStatusProps["latestRequest"]) =>
              prev ? { ...prev, showAgain: false } : null,
            );
          } catch (error) {
            console.error("Error hiding request:", error);
          }
        }}
      >
        <Image source={icons.eyeHide} className="w-5 h-5" tintColor="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ShowRequestStatus;
