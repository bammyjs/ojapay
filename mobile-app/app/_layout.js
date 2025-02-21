import "react-native-reanimated";
import "../global.css";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import { Text, Pressable, StatusBar, View } from "react-native";
import Toast from "react-native-toast-message";
import store from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

export default function Layout() {
  const [loaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen
            name="(screens)/index"
            options={{
              headerTitle: "Task List",
            }}
          />
          <Stack.Screen
            name="(screens)/createTask"
            options={{ headerTitle: "Create Task" }}
          />
          <Stack.Screen
            name="(screens)/viewTaskLists"
            options={{ headerTitle: "View Task" }}
          />
          <Stack.Screen
            name="(screens)/taskDetailScreen"
            options={{ headerTitle: "View Task" }}
          />
        </Stack>
        <Toast />
      </Provider>
    </GestureHandlerRootView>
  );
}
