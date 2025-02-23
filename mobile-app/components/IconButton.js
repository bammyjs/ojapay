import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const ButtonIcon = ({ name, size, color }) => {
  return (
    <View className="">
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
};

const IconButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  name,
  size,
  color,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-typography-300 flex-row justify-between items-center  animate-bounce    ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <ButtonIcon name={name} size={size} color={color} />
      <Text
        className={` text-typography-300 font-Inter_700Bold text-lg ${textStyles}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default IconButton;
