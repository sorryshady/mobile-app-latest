import { setUpPassword, submitIdentifier, submitPassword } from "@/api/login";
import CustomButton from "@/components/custom-button";
import CustomDropDown from "@/components/custom-drop-down";
import ErrorMessage from "@/components/error-message";
import FormField from "@/components/form-field";
import ReusableBackground from "@/components/reusable-background";
import { images } from "@/constants";
import { SecurityQuestionType } from "@/constants/types";
import { useGlobalContext } from "@/context/global-provider";
import { setToken } from "@/lib/handle-session-tokens";
import { changeTypeToText } from "@/lib/utils";
import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

interface UserDetails {
  id: string;
  name: string;
  photoUrl: string | null;
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED";
  hasPassword: boolean;
}
interface SetupFormData {
  securityQuestion: SecurityQuestionType;
  securityAnswer: string;
  password: string;
  confirmPassword: string;
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
  const [setupFormData, setSetupFormData] = useState<SetupFormData>({
    securityQuestion: SecurityQuestionType.MOTHERS_MAIDEN_NAME,
    securityAnswer: "",
    password: "",
    confirmPassword: "",
  });

  const handleNext = async () => {
    try {
      setIsLoading(true);
      setError("");
      if (value === "") {
        return;
      }
      const response = await submitIdentifier(value);
      if (response?.error) {
        setError(response.error);
        return;
      }
      if (response.user.verificationStatus === "REJECTED") {
        setError("Your account has been rejected");
        return;
      } else if (response.user.verificationStatus === "PENDING") {
        setError("Your account is pending verification");
        return;
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
      if (password === "") {
        return;
      }
      const response = await submitPassword(value, password);
      if (response?.error) {
        setError(response.error);
        return;
      }
      if (response?.token) {
        await setToken({
          key: "session",
          value: response.token,
        });
        setUser(response.user);
        router.replace("/home");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSetup = async () => {
    try {
      setIsLoading(true);
      setError("");
      if (
        setupFormData.password === "" ||
        setupFormData.confirmPassword === ""
      ) {
        return;
      }
      if (setupFormData.password !== setupFormData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const submitForm = {
        userId: userDetails?.id ?? "",
        securityQuestion: setupFormData.securityQuestion,
        securityAnswer: setupFormData.securityAnswer,
        password: setupFormData.password,
      };
      const response = await setUpPassword(submitForm);
      if (response?.error) {
        setError(response.error);
        return;
      }
      if (response?.token) {
        await setToken({
          key: "session",
          value: response.token,
        });
        setUser(response.user);
        router.replace("/home");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ReusableBackground>
      <ScrollView>
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
                Sign In
              </Text>
              {step === "identifier" ? (
                <View className="mb-6">
                  <FormField
                    title="Email or Membership ID"
                    placeholder="Enter your email or membership ID"
                    value={value}
                    keyboardType="email-address"
                    otherStyles="mt-7"
                    handleChangeText={(e: string) => setValue(e)}
                  />
                  {error && <ErrorMessage error={error} />}
                  <CustomButton
                    title="Next"
                    loadingText="Checking..."
                    handlePress={handleNext}
                    isLoading={isLoading}
                    containerStyles="w-full bg-red-500 mt-[2rem]"
                    textStyles="text-white"
                  />
                </View>
              ) : (
                <View className="gap-5 mb-6">
                  <TouchableOpacity
                    onPress={() => {
                      setStep("identifier");
                      setError("");
                      setUserDetails(null);
                    }}
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
                    <ScrollView>
                      <View className="gap-4">
                        <CustomDropDown
                          placeholder="Security Question"
                          data={Object.values(SecurityQuestionType).map(
                            (question) => ({
                              label: changeTypeToText(question),
                              value: question as SecurityQuestionType,
                            }),
                          )}
                          value={setupFormData?.securityQuestion ?? ""}
                          handleValueChange={(value: string) =>
                            setSetupFormData((prev) => ({
                              ...prev!,
                              securityQuestion: value as SecurityQuestionType,
                            }))
                          }
                        />
                        <FormField
                          title="Security Answer"
                          placeholder="Enter your security answer"
                          value={setupFormData?.securityAnswer}
                          handleChangeText={(e: string) =>
                            setSetupFormData((prev) => ({
                              ...prev!,
                              securityAnswer: e,
                            }))
                          }
                        />
                        <FormField
                          title="Password"
                          placeholder="Enter your password"
                          showPasswordStrength={true}
                          value={setupFormData?.password}
                          handleChangeText={(e: string) =>
                            setSetupFormData((prev) => ({
                              ...prev!,
                              password: e,
                            }))
                          }
                          type="password"
                        />
                        <FormField
                          title="Confirm Password"
                          placeholder="Confirm your password"
                          value={setupFormData?.confirmPassword}
                          handleChangeText={(e: string) =>
                            setSetupFormData((prev) => ({
                              ...prev!,
                              confirmPassword: e,
                            }))
                          }
                          type="password"
                        />
                      </View>
                      {error && <ErrorMessage error={error} />}
                      <CustomButton
                        title="Setup"
                        loadingText="Setting up..."
                        handlePress={handleSetup}
                        isLoading={isLoading}
                        containerStyles="w-full bg-red-500 mt-[2rem]"
                        textStyles="text-white"
                      />
                    </ScrollView>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </ReusableBackground>
  );
};
export default SignIn;
