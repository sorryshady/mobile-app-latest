import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "./gradient-background";
import { StatusBar } from "expo-status-bar";

const ReusableBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className="h-full">
      <GradientBackground>
        {children}
        <StatusBar backgroundColor="#1F333E" style="light" />
      </GradientBackground>
    </SafeAreaView>
  );
};

export default ReusableBackground;
