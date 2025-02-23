import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={` ${otherStyles}`}>
      <Text className="font-Inter_700Bold text-textLight dark:text-textDark text-base text-black mb-2">
        {title}
      </Text>
      <View className="w-full  dark:bg-typography-900 h-16  px-4 py-2 flex-row items-center  justify-between border  active::border focus::border focus::border-primary-500 rounded-xl">
        <TextInput
          className=" font-Inter_400Regular  w-full  text-base text-textLight dark:text-textDark  max-w-[220px] "
          value={value}
          placeholder={placeholder}
          placeholderTextColor="gray"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {/*Incase Password is later Needed for login and SignUp */}
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Ionicons name="eye" size={24} color="black" />
            ) : (
              <Ionicons name="eye-off" size={24} color="black" />
            )}
          </TouchableOpacity>
        )}
        {title === "Confirm Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Ionicons name="eye" size={24} color="black" />
            ) : (
              <Ionicons name="eye-off" size={24} color="black" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
