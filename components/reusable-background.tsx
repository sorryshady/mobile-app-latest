import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "./gradient-background";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform } from "react-native";

const ReusableBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className="h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="h-full"
      >
        <GradientBackground>{children}</GradientBackground>
        <StatusBar
          style={Platform.OS === "ios" ? "auto" : "light"}
          backgroundColor="#1F333E"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ReusableBackground;
