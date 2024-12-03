import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "./gradient-background";
import { KeyboardAvoidingView, Platform } from "react-native";

const ReusableBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className="h-full relative">
      <GradientBackground>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="h-full"
        >
          {children}
        </KeyboardAvoidingView>
      </GradientBackground>
    </SafeAreaView>
  );
};

export default ReusableBackground;
