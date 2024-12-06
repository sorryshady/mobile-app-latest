import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import FormField from "./form-field";
import ErrorMessage from "./error-message";
import CustomButton from "./custom-button";
import { router } from "expo-router";
import { resetPassword, verifySecurityAnswer } from "@/api/forgot-password";
import SuccessMessage from "./success-message";
import { setToken } from "@/lib/handle-session-tokens";
import { useGlobalContext } from "@/context/global-provider";

interface SecurityQuestionFormProps {
  userDetails: {
    id: string;
    name: string;
    securityQuestion: string;
  };
  onBack: () => void;
}

const SecurityAnswerForm = ({
  userDetails,
  onBack,
  onSuccess,
}: {
  userDetails: { id: string; name: string; securityQuestion: string };
  onBack: () => void;
  onSuccess: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [answer, setAnswer] = useState("");

  const continueHandler = async () => {
    try {
      setFormError("");
      if (!answer) {
        setFormError("Please enter your security answer");
        return;
      }
      setIsLoading(true);
      const response = await verifySecurityAnswer(userDetails.id, answer);
      if (response.error) {
        setFormError(response.error);
      } else {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      setFormError("Failed to verify security answer");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="gap-4">
      <FormField
        title={userDetails.securityQuestion
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (l) => l.toUpperCase())}
        value={answer}
        handleChangeText={setAnswer}
        placeholder="Enter your answer"
      />
      {formError && <ErrorMessage error={formError} />}
      <CustomButton
        title="Continue"
        loadingText="Verifying..."
        isLoading={isLoading}
        handlePress={continueHandler}
        containerStyles="bg-[#5386A4]"
        textStyles="text-white"
      />
      <View className="flex-row justify-center items-center">
        <TouchableOpacity onPress={onBack} className="ml-1">
          <Text className="text-blue-500 font-semibold">Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ResetPasswordForm = ({
  userDetails,
}: {
  userDetails: { id: string };
}) => {
  const { setUser, refetchData } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const resetPasswordHandler = async () => {
    try {
      setFormError("");
      if (!password || !confirmPassword) {
        setFormError("Please enter your new password and confirm it");
        return;
      }
      if (password !== confirmPassword) {
        setFormError("Passwords do not match");
        return;
      }
      setIsLoading(true);
      const response = await resetPassword(userDetails.id, password);
      if (response.error) {
        setFormError(response.error);
      } else {
        if (response?.token) {
          await setToken({
            key: "session",
            value: response.token,
          });
        }
        setUser(response.user);
        refetchData();
        setSuccess(true);
        setTimeout(() => {
          router.replace("/home");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setFormError("Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View className="gap-4">
      {!success ? (
        <>
          <FormField
            title="New Password"
            value={password}
            handleChangeText={setPassword}
            type="password"
            showPasswordStrength={true}
            placeholder="Enter your new password"
          />
          <FormField
            title="Confirm Password"
            value={confirmPassword}
            handleChangeText={setConfirmPassword}
            type="password"
            placeholder="Confirm your new password"
          />
          {formError && <ErrorMessage error={formError} />}
          <CustomButton
            title="Reset Password"
            loadingText="Confirming..."
            isLoading={isLoading}
            handlePress={resetPasswordHandler}
            containerStyles="bg-[#5386A4]"
            textStyles="text-white"
          />
        </>
      ) : (
        <SuccessMessage message="Password reset successful. Logging you in..." />
      )}
    </View>
  );
};

const SecurityQuestionForm = ({
  userDetails,
  onBack,
}: SecurityQuestionFormProps) => {
  const [step, setStep] = useState<"answer" | "reset">("answer");
  if (step === "answer") {
    return (
      <SecurityAnswerForm
        userDetails={userDetails}
        onBack={onBack}
        onSuccess={() => setStep("reset")}
      />
    );
  }
  return <ResetPasswordForm userDetails={userDetails} />;
};

export default SecurityQuestionForm;
