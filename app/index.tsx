import CustomButton from "@/components/custom-button";
import { Redirect, router } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { images } from "../constants";
import { useGlobalContext } from "@/context/global-provider";
import ReusableBackground from "@/components/reusable-background";
export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }
  return (
    <ReusableBackground>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
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
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full bg-red-500  mt-7"
            textStyles="text-white"
          />
        </View>
      </ScrollView>
    </ReusableBackground>
  );
}
