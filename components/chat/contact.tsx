import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
interface Props extends TouchableOpacityProps {
  lm: string;
  name: string;
  me: boolean;
  unread: number;
  time?: string;
}
const Contact = ({
  lm,
  name,
  me,
  unread,
  time = "4:15pm",
  ...props
}: Props) => {
  return (
    <View className="w-full border-b-[0.5px] border-gray-300">
      <TouchableOpacity
        {...props}
        className="w-full py-6 pb-5 flex flex-row relative  gap-5 items-center border-b-[1px] border-gray-300"
      >
        <View className="flex-grow-[2] aspect-square bg-slate-200 rounded-full flex items-center justify-center max-w-[50px]">
          <Text className="text-2xl font-light">
            {name.slice(0, 2).toLocaleUpperCase()}
          </Text>
        </View>
        <View className="flex flex-grow-[6]">
          <View className="flex items-center  flex-row w-full ">
            <Text className="font-medium text-xl flex-grow">
              {name.slice(2)}
            </Text>
            {unread > 0 && (
              <View className="aspect-square bg-green-500 rounded-full flex items-center justify-center w-[22px]">
                <Text className="text-[14px]  text-white">{unread}</Text>
              </View>
            )}
          </View>

          <View className="flex items-center  flex-row w-full ">
            {me && <Text className="text-xl text-gray-600">You: </Text>}
            <Text className="flex-grow-[2] text-xl text-gray-600">
              {`${lm.slice(0, 15)}${lm.length > 15 ? "..." : ""}`}
            </Text>
            {time.length > 0 && (
              <Text className="text-xl text-gray-600">{time}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Contact;
