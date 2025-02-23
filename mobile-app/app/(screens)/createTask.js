import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/taskSlice";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import FormField from "../../components/FormField";
import PrimaryButton from "../../components/primaryButton";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/IconButton";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from "react-native-ui-datepicker";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import { darkMode } from "../../tailwind.config";

const PRIORITY_OPTIONS = [
  { label: "High", color: "bg-red-600" },
  { label: "Medium", color: "bg-orange-500" },
  { label: "Low", color: "bg-green-500" },
];

const TaskForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
  });

  const [selectedPriority, setSelectedPriority] = useState("Low");
  const [selectedDate, setSelectedDate] = useState(null);

  // Handle task submission
  const handleAddTask = async () => {
    if (!task.title || !task.description || !task.dueDate) {
      Toast.show({
        type: "error",
        text1: "Missing Information",
        text2: "Please fill out all fields.",
      });
      return;
    }

    const newTask = {
      id: Date.now(),
      ...task,
      title: String(task.title),
      status: "active",
    };

    try {
      const existingTasks =
        JSON.parse(await AsyncStorage.getItem("tasks")) || [];
      const updatedTasks = [...existingTasks, newTask];
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));

      dispatch(addTask(newTask));

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Task added successfully!",
      });

      setTask({ title: "", description: "", dueDate: "", priority: "Low" });

      setTimeout(() => {
        router.push("/(screens)");
      }, 1500);
    } catch (error) {
      console.error("AsyncStorage Error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to save task",
      });
    }
  };

  // Handle priority selection
  const handlePrioritySelection = (priority) => {
    setSelectedPriority(priority);
    setTask({ ...task, priority });
  };

  const handleDateChange = (params) => {
    const selected = params.date;

    // Ensure selected is a valid date string or object
    const date = new Date(selected);
    if (!isNaN(date.getTime())) {
      const formattedDate = date.toLocaleDateString("en-CA"); // YYYY-MM-DD
      setSelectedDate(date);
      setTask((prev) => ({ ...prev, dueDate: formattedDate }));
    } else {
      console.warn("Invalid date selected:", JSON.stringify(params));
    }
    console.log("Date Type:", typeof params.date, params.date);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="w-full p-5 h-full dark:bg-backgroundDark">
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView className="w-full  h-full flex items-center ">
          {/* Header */}
          <View className="w-full mb-6 flex flex-row items-center">
            <IconButton
              handlePress={() => router.back()}
              name="arrow-back-circle-outline"
              size={40}
              color={"#F66743"}
              containerStyles="items-center rounded"
              textStyles="text-typography-black dark:text-textDark"
            />
            <Text className="text-3xl text-textLight dark:text-textDark font-Inter_600SemiBold ml-4">
              Create a New Task
            </Text>
            {/* <ThemeToggleButton /> */}
          </View>

          {/* Date Picker */}
          <View className=" w-full   rounded-lg">
            <Text className="text-lg text-textLight dark:text-textDark font-Inter_600SemiBold mb-2">
              Select Due Date:
            </Text>
            <View
              style={styles.container}
              className=" w-full h-[300] bg-grayscale-100 dark:bg-typography-900 border-2 rounded-lg"
            >
              <DateTimePicker
                mode="single"
                date={selectedDate || new Date()}
                onChange={handleDateChange}
                textColor="#ffffff"
                selectedItemColor="#4F46E5"
              />
            </View>
            {task.dueDate && (
              <Text className="text-sm text-textLight dark:text-textDark font-Inter_600SemiBold mt-2">
                Selected Date: {task.dueDate}
              </Text>
            )}
          </View>

          {/* Task Title Input */}
          <FormField
            value={task.title}
            handleChangeText={(text) => setTask({ ...task, title: text })}
            placeholder="Task Title"
            otherStyles=""
          />

          {/* Task Description Input */}
          <FormField
            value={task.description}
            handleChangeText={(text) => setTask({ ...task, description: text })}
            placeholder="Task Description"
            otherStyles=""
          />

          {/* Priority Selection */}
          <Text className="w-full text-lg text-textLight dark:text-textDark  font-Inter_600SemiBold text-left mt-4 mb-2">
            Priority
          </Text>
          <View className="w-full  dark:bg-typography-900 border p-4 rounded-2xl flex-shrink items-center mt-2">
            <FlatList
              data={PRIORITY_OPTIONS}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ maxHeight: 50 }}
              keyExtractor={(item) => item.label}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item}
                  className={` border-2 w-28 h-fit  py-2 px-4 mr-3 rounded-2xl  justify-center items-center ${
                    selectedPriority === item.label
                      ? `${item.color} bg-primary-500  border-primary-400`
                      : "bg-gray-500 border-gray-600"
                  }`}
                  onPress={() => handlePrioritySelection(item.label)}
                >
                  <Text className="text-textLight dark:text-textDark font-Inter_500Medium text-lg">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Submit Button */}
          <PrimaryButton
            title="Add Task"
            handlePress={handleAddTask}
            containerStyles="w-full items-center min-h-[62px] rounded-2xl mt-6"
          />
        </SafeAreaView>
        <StatusBar backgroundColor="transparent" style="light" />
      </View>
    </ScrollView>
  );
};

export default TaskForm;

const styles = StyleSheet.create({
  container: {
    //   flex: 1,
    // backgroundColor: "#F5FCFF",
  },
});
