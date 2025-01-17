import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import React, { ReactNode } from "react";
interface Props extends TextInputProps {
  ph: string;
  password?: boolean;
  Icon?: ReactNode;
}
const CustomInput = ({
  ph,
  password = false,
  Icon,
  onChange,
  ...prop
}: Props) => {
  const gap_for_icon = Icon && "pr-[55px]";
  return (
    <View className="flex items-center justify-center relative w-[100%]">
      <TextInput
        {...prop}
        placeholder={ph}
        returnKeyType="done"
        secureTextEntry={password}
        className={`placeholder:text-gray-500 px-4 py-3 min-w-full border-gray-500 border-[1px] text-xl rounded-[15px] ${gap_for_icon}`}
      />
      {Icon && (
        <TouchableOpacity className="absolute right-[14px]">
          {Icon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;
