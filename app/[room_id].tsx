import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Icons } from "@/constants/icons";
import HeaderLeft from "@/components/chat/headers";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomInput from "@/components/common/custom_input";
import Keyboard from "@/components/common/keyboardAvoidance";
import Bubble from "@/components/common/bubble";
import { room, sendMessage } from "@/firebase/firebase";
import { user_type, UseUserContext } from "@/firebase/context";

const OpenChat = () => {
  const router = useRouter();
  const scroll = useRef<ScrollView>(null);
  const [user, _, l, rooms_data] = UseUserContext();
  const data = useLocalSearchParams();
  const room_id: string = data?.room_id as string;
  const room_data: room = rooms_data.filter((r: room) => r.id === room_id)[0];
  const [input, setInput] = useState("");
  useEffect(() => {
    scroll.current?.scrollToEnd();
  }, [room_data]);
  function message(text: string) {
    setInput(text);
  }
  async function handleSendMessage() {
    if (input.trim().length < 1) return;
    const mes = await sendMessage(room_id, {
      person: user as user_type,
      message: input,
    });
    if (mes) {
      setInput("");
    }
  }
  const who =
    room_data?.other_user.id === user.id
      ? room_data?.who_created
      : room_data?.other_user;

  return (
    <Keyboard>
      <SafeAreaView className="w-full h-full bg-white relative">
        <View className="flex w-full flex-row justify-between items-center px-3 border-b-[1px] border-gray-300 pb-5">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              className="flex items-center flex-row gap-2"
              onPress={() => router.back()}
            >
              <Icons.Back />
              <HeaderLeft name={who?.name.slice(0, 2).toUpperCase()} />
            </TouchableOpacity>
          </View>
          <Text className="font-medium mr-[45px] text-2xl">
            {who?.name.slice(2)}
          </Text>
          <TouchableOpacity>
            <Icons.Menu />
          </TouchableOpacity>
        </View>
        <ScrollView ref={scroll} className="py-1 px-2 flex">
          {room_data?.messages.map((message, key) => (
            <Bubble
              name={message.person.name}
              time={message.time}
              message={message.message}
              key={key}
              me={message.person.id === user.id}
            />
          ))}
        </ScrollView>
        <View className="flex flex-row w-full gap-3 items-center px-3 py-3">
          <TouchableOpacity className="w-[40px] flex items-center justify-center bg-primary_blue aspect-square rounded-full">
            <Icons.Plus color="white" />
          </TouchableOpacity>
          <View className="flex-[5]">
            <CustomInput
              returnKeyType="send"
              onSubmitEditing={handleSendMessage}
              value={input}
              onChangeText={message}
              ph="Start typing..."
            />
          </View>
          <TouchableOpacity>
            <Icons.Like />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Keyboard>
  );
};

export default OpenChat;
