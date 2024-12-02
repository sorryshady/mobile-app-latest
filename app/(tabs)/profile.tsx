import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import ReusableBackground from "@/components/reusable-background";
import { useGlobalContext } from "@/context/global-provider";
import { removeToken } from "@/lib/handle-session-tokens";
import { router } from "expo-router";
import { CompleteUser } from "@/constants/types";
import { images, icons } from "@/constants";
import { getCompleteUser } from "@/api/user";
import { changeTypeToText } from "@/lib/utils";
import CustomButton from "@/components/custom-button";
import ImagePickerComponent from "@/components/image-picker";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [completeUserData, setCompleteUserData] = useState<CompleteUser | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompleteUserData = async () => {
      try {
        const response = await getCompleteUser();
        setCompleteUserData(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.membershipId) {
      fetchCompleteUserData();
    }
  }, [user?.membershipId]);

  const logout = async () => {
    await removeToken({ key: "sessionToken" });
    setUser(null);
    setIsLoggedIn(false);
    router.push("/sign-in");
  };

  if (isLoading) {
    return (
      <ReusableBackground>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      </ReusableBackground>
    );
  }

  return (
    <ReusableBackground>
      <ScrollView className="flex-1 px-4 pt-6">
        <View className="flex-1 my-[3rem]">
          <Text className="text-2xl font-pbold mb-6 text-white text-center">
            Your Profile
          </Text>

          {/* Profile Header */}
          <View className="items-center mb-6">
            <View className="relative">
              <Image
                source={{ uri: completeUserData?.photoUrl || images.avatar }}
                className="w-32 h-32 rounded-full"
                resizeMode="cover"
              />
              <TouchableOpacity
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full"
                onPress={() => {
                  /* Handle photo update */
                }}
              >
                <Image source={icons.camera} className="w-5 h-5" />
              </TouchableOpacity>
            </View>
            <Text className="text-xl text-white font-pbold mt-3">
              {completeUserData?.name}
            </Text>
            <Text className="text-white mt-1">
              Member since{" "}
              {new Date(completeUserData?.createdAt || "").getFullYear()}
            </Text>
          </View>

          {/* Personal Info Section */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-pbold text-white">
                Personal Info
              </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 space-y-4">
              <InfoRow
                label="Date of Birth"
                value={new Date(completeUserData?.dob!).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  },
                )}
              />
              <InfoRow
                label="Gender"
                value={changeTypeToText(completeUserData?.gender || "")}
              />
              <InfoRow
                label="Blood Group"
                value={changeTypeToText(completeUserData?.bloodGroup || "")}
              />
              <InfoRow
                label="User Role"
                value={changeTypeToText(completeUserData?.userRole || "")}
              />
              <InfoRow
                label="Membership ID"
                value={completeUserData?.membershipId?.toString() || "N/A"}
              />
            </View>
          </View>

          {/* Work Info Section */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-pbold text-white">
                Employment Information
              </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 space-y-4">
              <InfoRow
                label="Status"
                value={changeTypeToText(completeUserData?.userStatus || "")}
              />
              {completeUserData?.userStatus === "WORKING" && (
                <>
                  <InfoRow
                    label="Department"
                    value={completeUserData?.department}
                  />
                  <InfoRow
                    label="Designation"
                    value={changeTypeToText(
                      completeUserData?.designation || "",
                    )}
                  />
                  <InfoRow
                    label="Work District"
                    value={changeTypeToText(
                      completeUserData?.workDistrict || "",
                    )}
                  />
                  <InfoRow
                    label="Office Address"
                    value={completeUserData?.officeAddress}
                  />
                </>
              )}
            </View>
          </View>

          {/* Other Information */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-pbold text-white">
                Other Information
              </Text>
            </View>
            <View className="bg-gray-50 rounded-xl p-4 space-y-4">
              <InfoRow
                label="Committee Member"
                value={changeTypeToText(completeUserData?.committeeType || "")}
              />
              <InfoRow
                label="Committee Position"
                value={changeTypeToText(
                  completeUserData?.positionState ||
                    completeUserData?.positionDistrict ||
                    "",
                )}
              />
            </View>
          </View>

          {/* Permanent Address */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-pbold text-white">
                Permanent Address
              </Text>
              <TouchableOpacity>
                <Text className="text-accent">Edit</Text>
              </TouchableOpacity>
            </View>
            <View className="bg-gray-50 rounded-xl p-4 space-y-4">
              <InfoRow
                label="Permanent Address"
                value={completeUserData?.personalAddress}
              />
              <InfoRow
                label="Home District"
                value={changeTypeToText(completeUserData?.homeDistrict || "")}
              />
            </View>
          </View>

          {/* Contact Information */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-pbold text-white">
                Contact Information
              </Text>
            </View>
            <View className="bg-gray-50 rounded-xl p-4 space-y-4">
              <InfoRow label="Email" value={completeUserData?.email} />
              {completeUserData?.phoneNumber && (
                <InfoRow
                  label="Phone Number"
                  value={completeUserData?.phoneNumber}
                />
              )}
              <InfoRow
                label="Mobile Number"
                value={completeUserData?.mobileNumber}
              />
            </View>
          </View>

          <CustomButton
            title="Logout"
            handlePress={logout}
            containerStyles="bg-red-500"
            textStyles="text-white"
          />
        </View>
      </ScrollView>
    </ReusableBackground>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) => (
  <View className="flex-1 gap-1 my-1">
    <Text className="text-gray-500 text-sm">{label}</Text>
    <Text className="font-pmedium text-wrap">{value || "N/A"}</Text>
  </View>
);

export default Profile;
