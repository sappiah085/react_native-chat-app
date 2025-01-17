import { FlatList, SafeAreaView, Text, View } from "react-native";
import React, { useState } from "react";
import CustomInput from "@/components/common/custom_input";
import { Icons } from "@/constants/icons";
import Contact from "@/components/chat/contact";
import { useFilterEmail } from "@/hooks/filter";
import Keyboard from "@/components/common/keyboardAvoidance";
import {
  createRoom,
  getAllUsers,
  getRoom,
  getRooms,
  room,
} from "@/firebase/firebase";
import { user_type, UseUserContext } from "@/firebase/context";
import { useRouter } from "expo-router";

const AddContact = () => {
  const user = UseUserContext()[0];
  const router = useRouter();
  const [input, setInput] = useState("");
  const filter = useFilterEmail(input, 500, getAllUsers).filter(
    (other_user) => other_user.id != user.id
  );
  const open_chat = async (other_user: user_type) => {
    //check if room is created

    try {
      let rooms = await getRooms(user.id);
      let id =
        rooms.length > 0 &&
        rooms.filter((room) => room.members.includes(other_user.id))[0]?.id;

      if (!id) {
        id = `${other_user.id}-${user.id}`;
        //create room
        await createRoom(id, {
          members: [other_user.id, user.id],
          other_user: other_user,
          id,
          who_created: user,
          messages: [],
        });
      }
      router.push({
        pathname: `/[room_id]`,
        params: { room_id: id },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Keyboard>
      <SafeAreaView className="w-full h-full">
        <View className="flex flex-col items-center bg-white w-full h-full pt-2 px-4">
          <CustomInput
            onChangeText={(val) => setInput(val)}
            ph="Search contacts"
            Icon={<Icons.Search />}
          />
          <FlatList
            className="w-full mt-2"
            data={filter}
            keyExtractor={(f) => f.id}
            ListEmptyComponent={() => (
              <View className="flex items-center justify-center p-4">
                <Text>No contacts found</Text>
              </View>
            )}
            renderItem={(f) => (
              <Contact
                onPress={async () => await open_chat(f.item)}
                time=""
                unread={0}
                lm={"Start chatting"}
                name={f.item.name}
                me={false}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </Keyboard>
  );
};

export default AddContact;
