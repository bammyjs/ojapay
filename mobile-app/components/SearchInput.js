import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, usePathname } from "expo-router";

const SearchInput = ({
  value,
  placeholder,
  handleChangeText,
  onChangeText,
  otherStyles,
  handlePress,
  isLoading,
  ...props
}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  return (
    <View
      className={` flex-row items-center  px-4 bg-transparent border focus:border-grayscale-400  border-gray-300 rounded-2xl  ${otherStyles}`}
    >
      <View className="w-full flex-row items-center   ">
        <Ionicons name="search-outline" size={24} color="white" />
        <TextInput
          className="font-Inter_400Regular text-base text-primary-50  "
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={"gray"}
        />
      </View>
    </View>
  );
};

export default SearchInput;
