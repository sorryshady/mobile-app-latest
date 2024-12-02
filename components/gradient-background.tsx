import { LinearGradient } from "expo-linear-gradient";
import { ViewProps } from "react-native";

interface GradientBackgroundProps extends ViewProps {
  children: React.ReactNode;
}

export default function GradientBackground({
  children,
  style,
  ...props
}: GradientBackgroundProps) {
  return (
    <LinearGradient
      colors={["#5386A4", "#1F333E"]} // Replace with your primary/secondary colors
      style={[{ flex: 1 }, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      {...props}
    >
      {children}
    </LinearGradient>
  );
}
