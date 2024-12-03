import { Image, ImageSourcePropType, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
}
const TabIcon = ({ icon, color }: TabIconProps) => {
  return (
    <View className="items-center justify-center gap-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-7 h-7"
      />
    </View>
  );
};
const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#FACE30",
          tabBarInactiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#1F333E",
            borderTopWidth: 1,
            borderTopColor: "#2E4450",
            paddingTop: 10,
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon icon={icons.home} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="news"
          options={{
            title: "News",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon icon={icons.news} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            title: "Events",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon icon={icons.events} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="downloads"
          options={{
            title: "Downloads",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon icon={icons.downloads} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon icon={icons.user} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
