import React, { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../redux/taskSlice";
import { useColorScheme } from "nativewind";

const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const { colorScheme, setColorScheme } = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState(colorScheme);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        setCurrentTheme(savedTheme);
        setColorScheme(savedTheme);
      }
    };
    loadTheme();
  }, [setColorScheme]);

  const handleThemeToggle = async () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    setColorScheme(newTheme);
    dispatch(toggleTheme());
    await AsyncStorage.setItem("theme", newTheme);
  };

  return (
    <Pressable
      onPress={handleThemeToggle}
      className="px-4 py-2 rounded-2xl"
      style={{
        backgroundColor: currentTheme === "dark" ? "#444" : "#ccc",
      }}
    >
      <Text className={currentTheme === "dark" ? "text-white" : "text-black"}>
        {currentTheme === "dark" ? "🌙" : "☀️"}
      </Text>
    </Pressable>
  );
};

export default ThemeToggleButton;
