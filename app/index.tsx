import CustomButton from "@/components/custom-button";
import { Redirect, router } from "expo-router";
import { Image, Platform, ScrollView, Text, View } from "react-native";
import { images } from "../constants";
import { useGlobalContext } from "@/context/global-provider";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "@/components/gradient-background";
export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }
  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <GradientBackground>
          <View className="w-full min-h-[85vh] justify-center items-center  px-4">
            <Image
              source={images.logo}
              className="w-[200px] h-[200px]"
              resizeMode="contain"
            />
            <View className=" mt-5">
              <Text className="text-3xl text-white font-bold text-center">
                Association of Engineers Kerala
              </Text>
            </View>
            <Text className="text-white mt-7 text-center text-base ">
              A non-profit politically neutral organization.
            </Text>
            <CustomButton
              title={"Continue to login"}
              isLoading={isLoading}
              loadingText="Verifying Session"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-full bg-red-500  mt-7"
              textStyles="text-white"
            />
          </View>
        </GradientBackground>
      </ScrollView>
      <StatusBar
        backgroundColor="#1F333E"
        style={Platform.OS === "ios" ? "dark" : "light"}
      />
    </SafeAreaView>
  );
}
