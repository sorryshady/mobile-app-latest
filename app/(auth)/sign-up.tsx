import GradientBackground from "@/components/gradient-background";
import { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const [error, setError] = useState<string>("");
  return (
    <SafeAreaView>
      <GradientBackground>
        <View>
          <Text>Sign Up</Text>
        </View>
      </GradientBackground>
    </SafeAreaView>
  );
};
export default SignUp;
