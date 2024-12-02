import { submitIdentifier, submitPassword } from "@/api/login";
import CustomButton from "@/components/custom-button";
import ErrorMessage from "@/components/error-message";
import FormField from "@/components/form-field";
import GradientBackground from "@/components/gradient-background";
import { images } from "@/constants";
import { useGlobalContext } from "@/context/global-provider";
import { setToken } from "@/lib/handle-session-tokens";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface UserDetails {
  id: string;
  name: string;
  photoUrl: string | null;
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED";
  hasPassword: boolean;
}
const SignIn = () => {
  const { setUser } = useGlobalContext();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [step, setStep] = useState<"identifier" | "password" | "setup">(
    "identifier",
  );
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [password, setPassword] = useState<string>("");

  const handleNext = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await submitIdentifier(value);
      if (response?.error) {
        setError(response.error);
      }
      if (response.user.verificationStatus === "REJECTED") {
        setError("Your account has been rejected");
      } else if (response.user.verificationStatus === "PENDING") {
        throw new Error("Your account is pending verification");
      }
      setUserDetails(response.user);
      setStep(response.user.hasPassword ? "password" : "setup");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await submitPassword(value, password);
      if (response?.error) {
        setError(response.error);
      }
      if (response?.token) {
        await setToken({
          key: "session",
          value: response.token,
        });
      }
      setUser(response.user);
      router.replace("/home");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView className="h-full">
      <GradientBackground>
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="items-center  h-full p-6 gap-5">
            <Image
              source={images.logo}
              className="w-[150px] h-[150px]"
              resizeMode="contain"
            />

            <View className="bg-white rounded-2xl w-full gap-5 relative">
              <Image
                source={images.background}
                className="w-full h-full absolute opacity-10"
                resizeMode="cover"
              />
              <View className="p-6 gap-5">
                <Text className="text-black text-center font-psemibold text-2xl mt-5">
                  Sign In
                </Text>
                {step === "identifier" ? (
                  <>
                    <FormField
                      title="Email or Membership ID"
                      placeholder="Enter your email or membership ID"
                      value={value}
                      otherStyles="mt-7"
                      handleChangeText={(e: string) => setValue(e)}
                    />
                    {error && <ErrorMessage error={error} />}
                    <CustomButton
                      title="Next"
                      loadingText="Checking..."
                      handlePress={handleNext}
                      isLoading={isLoading}
                      containerStyles="w-full bg-red-500 "
                      textStyles="text-white"
                    />
                  </>
                ) : (
                  <View className="gap-5">
                    <TouchableOpacity
                      onPress={() => setStep("identifier")}
                      className="self-start"
                    >
                      <Text className="text-black font-psemibold">← Back</Text>
                    </TouchableOpacity>
                    {userDetails && (
                      <View className="text-center gap-4">
                        <View className="relative h-28 w-28 mx-auto rounded-full overflow-hidden bg-muted border border-black flex items-center justify-center">
                          {userDetails.photoUrl ? (
                            <Image
                              src={userDetails.photoUrl}
                              alt={userDetails.name}
                              className="w-full h-full"
                              style={{ transform: [{ scale: 0.9 }] }}
                              resizeMode="cover"
                            />
                          ) : (
                            <Text className="text-black text-2xl font-semibold">
                              {userDetails.name[0].toUpperCase()}
                            </Text>
                          )}
                        </View>
                        <Text className="font-psemibold text-lg text-center">
                          {userDetails.name}
                        </Text>
                      </View>
                    )}
                    {step === "password" ? (
                      <View className="gap-4">
                        <FormField
                          title="Password"
                          placeholder="Enter your password"
                          value={password}
                          handleChangeText={(e: string) => setPassword(e)}
                          type="password"
                        />
                        {error && <ErrorMessage error={error} />}
                        <CustomButton
                          title="Login"
                          loadingText="Logging in..."
                          handlePress={handleLogin}
                          isLoading={isLoading}
                          containerStyles="w-full bg-red-500 "
                          textStyles="text-white"
                        />
                      </View>
                    ) : (
                      <View></View>
                    )}
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </GradientBackground>
    </SafeAreaView>
  );
};
export default SignIn;
