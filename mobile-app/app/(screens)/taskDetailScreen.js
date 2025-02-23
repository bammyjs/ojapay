import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Animated,
  Easing,
  Modal,
  StyleSheet,
  Keyboard,
} from "react-native";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import IconButton from "../../components/IconButton";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../../redux/taskSlice";
import Toast from "react-native-toast-message";
import FormField from "../../components/FormField";

const TaskDetailScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [taskDetails, setTaskDetails] = useState({
    id: params.id,
    title: params.title,
    description: params.description,
    dueDate: params.dueDate,
    status: params.status,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(taskDetails.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    taskDetails.description
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  // Handle Edit Task
  const handleEditTask = async () => {
    if (!updatedTitle.trim() || !updatedDescription.trim()) {
      Toast.show({
        type: "error",
        text1: "Invalid Input",
        text2: "Task title and description cannot be empty!",
      });
      return;
    }

    const updatedTasks = tasks.map((task) =>
      task.id === taskDetails.id
        ? { ...task, title: updatedTitle, description: updatedDescription }
        : task
    );

    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
      dispatch(setTasks(updatedTasks));
      setTaskDetails((prev) => ({
        ...prev,
        title: updatedTitle,
        description: updatedDescription,
      }));

      Toast.show({
        type: "success",
        text1: "Task Updated",
        text2: `Task "${updatedTitle}" updated successfully!`,
      });
      setIsEditing(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: "Could not update the task. Please try again.",
      });
      console.error("Update Task Error:", error);
    }
  };

  return (
    <View className="w-full p-5 h-full bg-backgroundLight dark:bg-backgroundDark">
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="w-full mb-6 flex flex-row items-center justify-between">
          <IconButton
            handlePress={() => router.back()}
            name="arrow-back-circle-outline"
            size={40}
            color={"#f66743"}
            containerStyles="items-center rounded"
            textStyles="text-typography-700"
          />
          <Pressable
            onPress={() => setIsEditing(true)}
            className="px-5 py-3 rounded-lg bg-primary-500"
          >
            <Text className="text-white font-Inter_500Medium">Edit Task</Text>
          </Pressable>
        </View>

        {/* Task Details */}
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}
          className="flex-1 justify-center items-center bg-grayscale-300 dark:bg-grayscale-800  rounded-3xl p-6"
        >
          <Text className="text-2xl font-Inter_600SemiBold text-textLight dark:text-textDark mb-4">
            {taskDetails.title}
          </Text>
          <Text className="text-lg font-Inter_400Regular text-textLight dark:text-textDark">
            {taskDetails.description}
          </Text>
          <Text className="text-sm  font-Inter_400Regular mt-2 text-textLight dark:text-textDark">
            Due Date: {taskDetails.dueDate}
          </Text>
          <Text
            className={`text-sm font-Inter_400Regular mt-4  ${
              taskDetails.status === "completed"
                ? "text-primary-100"
                : "text-primary-500"
            }`}
          >
            Status: {taskDetails.status}
          </Text>
        </Animated.View>

        {/* Edit Task Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isEditing}
          onRequestClose={() => setIsEditing(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text className="text-xl font-Inter_700Bold mb-4 ">
                Edit Task
              </Text>
              <FormField
                value={updatedTitle}
                handleChangeText={setUpdatedTitle}
                placeholder="Task Title"
                otherStyles=""
              />
              <FormField
                value={updatedDescription}
                handleChangeText={setUpdatedDescription}
                placeholder="Task Description"
                otherStyles=""
              />

              <View className="w-full flex-row items-center justify-between mt-6">
                <Pressable
                  className="bg-primary-500 px-5 py-3 rounded-lg"
                  onPress={() => setIsEditing(false)}
                >
                  <Text className=" font-Inter_400Regular">Cancel</Text>
                </Pressable>
                <Pressable
                  className="bg-typography-black px-5 py-3 rounded-lg"
                  onPress={handleEditTask}
                >
                  <Text className="text-primary-50 font-Inter_400Regular">
                    Update
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <StatusBar backgroundColor="transparent" style="auto" />
      </SafeAreaView>
    </View>
  );
};

export default TaskDetailScreen;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "gray",
    borderRadius: 15,
    alignItems: "center",
  },
});
