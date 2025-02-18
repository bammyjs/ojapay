import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SearchInput from "../../components/SearchInput";
import { Ionicons } from "@expo/vector-icons";

const Search = () => {
  const { query } = useLocalSearchParams();

  const offsetY = useSharedValue(0);

  // Animated styles for header and search bar
  const headerStyle = useAnimatedStyle(() => {
    return {
      height: offsetY.value > 50 ? withTiming(100) : withTiming(190),
    };
  });

  // Animated style for the search bar

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerShown: false }} />
      <Animated.View
        style={[headerStyle, styles.fixedHeader]}
        className="p-6 rounded-b-3xl"
      >
        <View className=" mt-10 flex-row w-full items-center justify-start">
          <Link
            href={"../(screen)/index"}
            className="bg-typography-white p-3 rounded-xl justify-items-end"
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </Link>
          <Text className=" text-3xl  w-[80%] text-center text-typography-white font-Inter_700Bold">
            Search
          </Text>
        </View>
        {/* Animated Search Bar */}
        <SearchInput
          placeholder="Search products..."
          otherStyles="mt-4 w-full bg-typography-white h-14 text-base text-typography-black font-Inter_400Regular"
        />
      </Animated.View>
      <ScrollView
        keyboardDismissMode="on-drag"
        style={{ marginTop: "100px" }}
        className="w-full h-full  bg-primary-500 mt-4"
      >
        <View className=" text-2xl mt-10 p-6 ">
          <Text className="text-2xl">
            {query || "No search query provided"}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  gridContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap", // This allows wrapping items to the next row
    justifyContent: "space-between", // Adjust the spacing between items
  },
  scrollTopButton: {
    position: "absolute",
    bottom: 150,
    right: 20,
  },
  fixedHeader: {
    position: "absolute",

    left: 0,
    right: 0,
    backgroundColor: "#181718",
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    justifyContent: "space-between",
    width: "100%",
  },
  scrollContainer: {
    marginTop: 50,
    paddingVertical: 100,
  },
});
