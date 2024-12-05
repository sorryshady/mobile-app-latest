import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "./gradient-background";
const ReusableBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className="flex-1">
      <GradientBackground>{children}</GradientBackground>
    </SafeAreaView>
  );
};

export default ReusableBackground;
