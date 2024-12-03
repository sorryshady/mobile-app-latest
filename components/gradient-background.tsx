import { LinearGradient } from "expo-linear-gradient";
import { Platform, ViewProps } from "react-native";

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
      colors={["#5386A4", "#1F333E"]}
      style={[
        {
          flex: 1,
          marginBottom: Platform.OS === "ios" ? -34 : 0
        },
        style
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      {...props}
    >
      {children}
    </LinearGradient>
  );
}
