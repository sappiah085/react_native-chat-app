import { Stack } from "expo-router/stack";
import "../global.css";
import HeaderLeft, { HeaderRight } from "@/components/chat/headers";
import { UserContextProvider, UseUserContext } from "@/firebase/context";
import { TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "expo-router";
export default function Layout() {
  const router = useRouter();
  return (
    <UserContextProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="chat"
          options={{
            title: "Chats",
            headerLeft: () => {
              const setUser = UseUserContext()[1];
              return (
                <TouchableOpacity
                  onPress={() => {
                    signOut(auth);
                    setUser(undefined);
                    router.replace("/");
                  }}
                >
                  <HeaderLeft />
                </TouchableOpacity>
              );
            },
            headerRight: () => <HeaderRight />,
          }}
        />
        <Stack.Screen
          name="add_contact"
          options={{
            title: "Add Contact",
          }}
        />
        <Stack.Screen
          name="[room_id]"
          options={{
            title: "",
            headerShown: false,
          }}
        />
      </Stack>
    </UserContextProvider>
  );
}
