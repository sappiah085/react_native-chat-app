import { KeyboardAvoidingView, Platform } from "react-native";
import React, { ReactNode } from "react";

const Keyboard = ({ children }: { children: ReactNode }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default Keyboard;
