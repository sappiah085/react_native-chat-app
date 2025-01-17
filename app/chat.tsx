import { FlatList, SafeAreaView, Text, View } from "react-native";
import React from "react";
import CustomInput from "@/components/common/custom_input";
import { Icons } from "@/constants/icons";
import Contact from "@/components/chat/contact";
import { UseUserContext } from "@/firebase/context";
import { useRouter } from "expo-router";
import { room } from "@/firebase/firebase";

const Chat = () => {
  const router = useRouter();
  const [user, setUser, loading, data] = UseUserContext();
  return (
    <SafeAreaView className="w-full h-full">
      <View className="flex flex-col items-center bg-white w-full h-full pt-2 px-4">
        <CustomInput ph="Search contacts" Icon={<Icons.Search />} />
        <FlatList
          className="w-full mt-2"
          data={data}
          keyExtractor={(f) => f.id}
          ListEmptyComponent={() => (
            <View className="flex items-center justify-center p-4">
              <Text>No contacts found</Text>
            </View>
          )}
          renderItem={({ item }) => {
            let t = new Date(item?.time?.toDate());
            const who =
              item.other_user.id === user.id
                ? item.who_created
                : item.other_user;
            return (
              <Contact
                time={`${t.getHours().toLocaleString()}:${t
                  .getMinutes()
                  .toLocaleString()}`}
                onPress={() => router.push(`/${item.id}`)}
                unread={0}
                lm={`${
                  item.messages[item.messages.length - 1]?.message ||
                  "Start chatting"
                }`}
                name={who.name}
                me={item.messages[0]?.person.id === user.id}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Chat;
