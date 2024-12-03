import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "./gradient-background";
const ReusableBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className="h-full relative">
      <GradientBackground>{children}</GradientBackground>
    </SafeAreaView>
  );
};

export default ReusableBackground;
