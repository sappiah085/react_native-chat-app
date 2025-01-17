import { View, Text } from "react-native";
import React from "react";
import HeaderLeft from "../chat/headers";
import { Timestamp } from "firebase/firestore";

const Bubble = ({
  me,
  message,
  time,
  name,
}: {
  me: boolean;
  message: string;
  time: Timestamp;
  name: string;
}) => {
  const change = me ? "bg-gray-400" : "bg-blue-600";
  const c = me ? "self-end" : "";
  let t = new Date(time.toDate());

  return (
    <View className={`max-w-[65%] flex flex-row gap-2 w-full ${c}`}>
      {!me && <HeaderLeft name={name} />}
      <View
        className={` flex-grow my-2 py-3 px-4 flex rounded-[10px] font-bold gap-2  ${change} `}
      >
        <Text className="text-white font-normal text-[20px]">{message}</Text>
        <Text className="self-end text-white font-medium">
          {`${t.getHours().toLocaleString()}:${t
            .getMinutes()
            .toLocaleString()}`}
        </Text>
      </View>
    </View>
  );
};

export default Bubble;
