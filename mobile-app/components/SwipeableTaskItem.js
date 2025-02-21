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

const SWIPE_THRESHOLD = 80;

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
        <Animated.View style={[styles.taskItem, animatedStyle]}>
          <Pressable onPress={() => onPress(item)}>
            <Text style={styles.title}>
              {item.title ? String(item.title) : "Untitled Task"}
            </Text>
            <Text style={styles.description}>
              {item.description ? String(item.description) : "N/A"}
            </Text>
            <Text style={styles.dueDate}>
              Due: {item.dueDate ? String(item.dueDate) : "N/A"}
            </Text>
            <Text
              style={[
                styles.status,
                item.status === "completed" ? styles.completed : styles.active,
              ]}
            >
              Status: {item.status ? String(item.status) : "Unknown"}
            </Text>
          </Pressable>
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
  taskItem: {
    backgroundColor: "#292929",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  description: {
    color: "#ccc",
    marginTop: 5,
  },
  dueDate: {
    color: "#999",
    marginTop: 5,
  },
  status: {
    marginTop: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
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
