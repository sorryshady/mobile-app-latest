import { Pressable, ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";

import ReusableBackground from "@/components/reusable-background";

type Item = {
  currentSlug: string;
  title: string;
};
const Downloads = () => {
  const categories = [
    {
      title: "Technical Writing",
      value: "technical-writing",
    },
    {
      title: "Circulars and Orders",
      value: "circulars-and-orders",
    },
    {
      title: "Election Nomination",
      value: "election-nomination",
    },
    {
      title: "IS Code",
      value: "is-code",
    },
    {
      title: "IRC Code",
      value: "irc-code",
    },
    {
      title: "Handbooks",
      value: "handbooks",
    },
    {
      title: "Others",
      value: "others",
    },
  ];

  return (
    <ReusableBackground>
      <ScrollView>
        <View className="flex-1 p-4 ">
          {categories.map((item) => (
            <Link
              href={`/downloads/${item.value}`}
              key={item.title}
              asChild
              className="flex-1 gap-2"
            >
              <Pressable className="bg-white p-4 rounded-lg mb-4 shadow-sm">
                <Text className="text-xl font-pbold">{item.title}</Text>
                <Text className="text-base">See More &rarr;</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </ScrollView>
    </ReusableBackground>
  );
};

export default Downloads;
