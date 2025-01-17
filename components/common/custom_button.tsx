import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
interface Prop extends TouchableOpacityProps {
  label: string;
  bg_blue?: boolean;
}
const CustomButton = ({ label, bg_blue = false, ...props }: Prop) => {
  const bg = bg_blue ? "text-white bg-primary_blue" : "text-black bg-gray-200";
  const tc = bg_blue ? "text-white" : "text-black";
  return (
    <TouchableOpacity
      {...props}
      className={`px-4 py-4 min-w-[100%]  rounded-[15px]  items-center justify-center ${bg} disabled:opacity-[0.6]` }
    >
      <Text className={`font-medium  text-2xl ${tc}`}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
