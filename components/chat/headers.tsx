import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import { UseUserContext } from "@/firebase/context";

export const HeaderLeft = ({ name = "" }: { name?: string }) => {
  if (name.length === 0) name = UseUserContext()[0]?.name;
  return (
    <View className="bg-gray-200 h-[40px] aspect-square rounded-full flex items-center justify-center">
      <Text>{name?.slice(0, 2).toUpperCase()}</Text>
    </View>
  );
};

export const HeaderRight = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/add_contact")}
      className="h-[40px] aspect-square rounded-full flex items-center justify-center"
    >
      <Icons.Plus />
    </TouchableOpacity>
  );
};

export default HeaderLeft;
