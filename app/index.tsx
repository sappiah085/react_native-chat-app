import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import CustomInput from "@/components/common/custom_input";
import CustomButton from "@/components/common/custom_button";
import * as SplashScreen from "expo-splash-screen";
import { useRouter } from "expo-router";
import { UseUserContext } from "@/firebase/context";
import { createUser, signIn_func, signUp } from "@/firebase/firebase";
SplashScreen.preventAutoHideAsync();
const App = () => {
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const [user, _, loading] = UseUserContext();
  const [input, setInput] = useState({ email: "", password: "", name: "" });
  function signUp_func() {
    setLoader(true);
    signUp(input.email, input.password)
      .then(async (user) => {
        if (user) {
          await createUser(user, {
            email: input.email,
            name: input.name,
            id: user,
          });
        }
      })
      .catch(() => {
        Alert.alert("oops! something went wrong");
      })
      .finally(() => {
        setLoader(false);
      });
  }
  function signIn() {
    setLoader(true);
    signIn_func(input.email, input.password)
      .catch(() => {
        Alert.alert("oops! something went wrong");
      })
      .finally(() => {
        setLoader(false);
      });
  }
  useEffect(() => {
    if (!loading) SplashScreen.hideAsync();
    if (user) {
      router.replace("/chat");
    }
  }, [user, loading]);

  return user ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <View className="w-full h-full p-4 flex gap-2 items-center justify-center px-4">
      <Image source={images.icon} resizeMode="contain" className="h-[100px]" />
      <Text className="text-3xl font-medium">Welcome to We Chat</Text>
      <View className="mt-10 flex-col gap-5">
        <CustomInput
          autoComplete="name"
          onChangeText={(val) => setInput((pre) => ({ ...pre, name: val }))}
          value={input.name}
          ph="Username eg.😂Realmann"
        />
        <CustomInput
          autoComplete="email"
          onChangeText={(val) => setInput((pre) => ({ ...pre, email: val }))}
          value={input.email}
          ph="Email address"
        />
        <CustomInput
          value={input.password}
          onChangeText={(val) => setInput((pre) => ({ ...pre, password: val }))}
          password
          ph="Password"
        />

        <CustomButton
          onPress={signIn}
          disabled={loader}
          label="Login"
          bg_blue
        />
        <CustomButton
          disabled={loader}
          onPress={signUp_func}
          label="Create a new account"
        />

        <TouchableOpacity onPress={() => router.replace("/chat")}>
          <Text className="text-primary_blue text-2xl text-center">
            Forgot password ?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
