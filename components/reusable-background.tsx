import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "./gradient-background";
import { KeyboardAvoidingView, Platform, StatusBar } from "react-native";

const ReusableBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className="h-full relative">
      <GradientBackground>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={
            Platform.OS === "ios" ? 64 : StatusBar.currentHeight! + 50
          } // 50 is Button height
          enabled
          className="h-full"
        >
          {children}
        </KeyboardAvoidingView>
      </GradientBackground>
    </SafeAreaView>
  );
};

export default ReusableBackground;
