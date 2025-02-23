import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const SWIPE_THRESHOLD = 900;

const SwipeableTaskItem = ({ item, onDelete, onComplete, onPress }) => {
  const translateX = useSharedValue(0);

  // Handle Pan Gesture using New Gesture API
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      // Swipe Right to Complete
      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withSpring(100, {}, () => {
          runOnJS(onComplete)(item.id);
        });
      }
      // Swipe Left to Delete
      else if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(-100, {}, () => {
          runOnJS(onDelete)(item.id);
        });
      } else {
        // Reset Position if swipe is not completed
        translateX.value = withSpring(0);
      }
    });

  // Animated Style for Task Item
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Background Actions */}
      <View style={styles.actions}>
        <View style={styles.completeAction}>
          <Ionicons name="checkmark-circle-outline" size={30} color="green" />
        </View>
        <View style={styles.deleteAction}>
          <Ionicons name="trash-bin" size={30} color="red" />
        </View>
      </View>

      {/* Swipeable Task Item */}
      <GestureDetector gesture={panGesture}>
      {/* TODO: Let the Priority controls the background color */}
        <Animated.View
          style={[animatedStyle]}
          key={item.id}
          className="w-full  bg-primary-300 rounded-xl justify-between"
        >
          <View className="flex flex-row bg-typography-900 ml-4 p-4 rounded-r-xl items-center justify-between gap-1">
            <Pressable onPress={() => onPress(item)} className="flex-1">
              <Text className="text-base font-Inter_600SemiBold text-primary-50">
                {item.title ? String(item.title) : "Untitled Item"}
              </Text>
              {/* <Text className="text-base font-Inter_400Regular text-primary-50 ">
                {item.description ? String(item.description) : "Untitled Item"}
              </Text> */}
              <View className="flex flex-row items-center gap-1">
                <Ionicons name="calendar" size={15} color="white" />
                <Text className="text-primary-50 font-Inter_500Medium text-base">
                  {item.dueDate ? String(item.dueDate) : "No due date"}
                </Text>
              </View>
              <Text className={`text-base font-Inter_600SemiBold uppercase  ${item.status === "completed" ? "text-primary-300" : "text-primary-50"}`}>Status:
                 {" "}{item.status ? String(item.status) : "Untitled Item"}
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  actions: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  completeAction: {
    justifyContent: "center",
    alignItems: "center",
  },
  deleteAction: {
    justifyContent: "center",
    alignItems: "center",
  },
  completed: {
    color: "green",
  },
  active: {
    color: "#ffcc00",
  },
});

export default SwipeableTaskItem;

// Render task item
const renderItem = ({ item }) => (
  <Pressable
    className="w-full bg-typography-900 mb-3 p-4 rounded-xl"
    onPress={() =>
      router.push({ pathname: "/(screens)/taskDetailScreen", params: item })
    }
  >
    <Text className="text-primary-50 font-Inter_600SemiBold text-lg">
      {item.title ? String(item.title) : "Untitled Task"}
    </Text>
    <Text className="text-primary-50 font-Inter_400Regular">
      {item.description ? String(item.description) : "N/A"}
    </Text>
    <Text className="text-primary-300 font-Inter_400Regular">
      Due: {item.dueDate ? String(item.dueDate) : "N/A"}
    </Text>
    <Text
      className={`text-sm uppercase font-Inter_400Regular ${
        item.status === "completed" ? "text-grayscale-50" : "text-primary-700"
      }`}
    >
      Status: {item.status ? String(item.status) : "Unknown"}
    </Text>
  </Pressable>
);
