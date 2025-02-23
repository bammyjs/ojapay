import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  setSearchQuery,
  setLoading,
  setError,
} from "../../redux/taskSlice";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/primaryButton";
import SearchInput from "../../components/SearchInput";
import IconButton from "../../components/IconButton";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Progress from "react-native-progress";
import "react-native-polyfill-globals/auto";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import SwipeableTaskItem from "../../components/SwipeableTaskItem";

const TaskList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tasks, filter, searchQuery, loading, error } = useSelector(
    (state) => state.tasks
  );
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      dispatch(setLoading(true));
      try {
        const savedTasks = await AsyncStorage.getItem("tasks");
        const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
        const validTasks = parsedTasks.filter((task) => task && task.title);
        dispatch({ type: "tasks/setTasks", payload: validTasks });
        setTimeout(() => dispatch(setLoading(false)), 3000);
      } catch (err) {
        dispatch(setError("Failed to load tasks."));
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to load tasks",
        });
      }
    };
    loadTasks();
  }, [dispatch]);

  useEffect(() => {
    const result = tasks.filter((task) => {
      if (!task || typeof task.title !== "string") return false;
      const matchesFilter = filter === "all" || task.status === filter;
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    setFilteredTasks(result);
  }, [tasks, filter, searchQuery]);

  const today = new Date().toISOString().split("T")[0]; // Get today's date

  const todaysTasks = tasks
    .filter((task) => task.dueDate === today)
    .slice(0, 3);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split("T")[0];

  const tomorrowsTasks = tasks
    .filter((task) => task.dueDate === tomorrowDate)
    .slice(0, 3);

  const onRefresh = async () => {
    setRefreshing(true);
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem("tasks");
        const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
        const validTasks = parsedTasks.filter((task) => task && task.title);
        dispatch(setTasks(validTasks));
        setTaskList(validTasks);
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to refresh tasks",
        });
      } finally {
        setRefreshing(false);
      }
    };
    loadTasks();
  };

  const checkStorage = async () => {
    const tasks = await AsyncStorage.getItem("tasks");
    console.log("Stored Tasks:", JSON.parse(tasks));
  };
  useEffect(() => {
    checkStorage();
  }, []);

  // Swipe to delete task
  const deleteTask = async (taskId) => {
    const updatedTasks = taskList.filter((task) => task.id !== taskId);
    setTaskList(updatedTasks);
    dispatch(setTasks(updatedTasks));
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    Toast.show({
      type: "success",
      text1: "Deleted",
      text2: "Task deleted successfully!",
    });
  };

  // Swipe to complete task
  const completeTask = async (taskId) => {
    const updatedTasks = taskList.map((task) =>
      task.id === taskId ? { ...task, status: "completed" } : task
    );
    setTaskList(updatedTasks);
    dispatch(setTasks(updatedTasks));
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    Toast.show({
      type: "success",
      text1: "Task Completed",
      text2: "Good job! 🎯",
    });
  };

  // Render task item
  const renderItem = ({ item }) => (
    <SwipeableTaskItem
      item={item}
      onDelete={deleteTask}
      onComplete={completeTask}
      onPress={() =>
        router.push({ pathname: "/(screens)/taskDetailScreen", params: item })
      }
    />
  );

  const toggleTaskCompletion = async (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: task.status === "completed" ? "pending" : "completed",
          }
        : task
    );

    dispatch({ type: "tasks/setTasks", payload: updatedTasks });
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));

    Toast.show({
      type: "success",
      text1: "Task Updated",
      text2: "Task completion status changed successfully 🎯",
    });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="mt-4 font-Inter_500Medium">Loading tasks...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-600 text-xl">{error}</Text>
      </View>
    );
  }

  if (tasks.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Stack.Screen options={{ headerShown: false }} />
        <Ionicons name="information-circle" size={100} color="gray" />
        <Text className="text-xl mb-2 font-Inter_500Medium">
          No tasks available Yet!.
        </Text>
        <Text className=" font-Inter_500Medium">
          Start by creating a new task below
        </Text>
        <PrimaryButton
          title="Create New Task"
          handlePress={() => router.push("(screens)/createTask")}
          containerStyles="w-full mt-7 items-center min-h-[50px]"
        />
        <StatusBar backgroundColor="transparent" style="dark" />
      </View>
    );
  }

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const progress = tasks.length > 0 ? completedTasks / tasks.length : 0;

  return (
    <View contentContainerStyle={{ flexGrow: 1 }}>
      <View className="w-full p-5 h-full dark:bg-backgroundDark ">
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView className="relative h-full w-full top-0 flex items-start mt-4">
          {/* Header */}
          <View className="w-full mb-6 flex flex-row items-center justify-between">
            <Text className="text-3xl text-typography-black dark:text-textDark font-Inter_600SemiBold ">
              Welcome
            </Text>
            <ThemeToggleButton />
          </View>
          <View className="w-full flex flex-row items-center justify-between ">
            <Text className="text-4xl max-w-[280] text-typography-black dark:text-textDark font-Inter_700Bold">
              You have {todaysTasks.length} tasks today
            </Text>
          </View>

          <SearchInput
            placeholder="Search Tasks Here"
            value={searchQuery}
            onChangeText={(text) => {
              dispatch(setSearchQuery(text));
              if (text.trim().length > 0) {
                router.push({
                  pathname: "/(screens)/viewTaskLists",
                  params: { search: text },
                });
              }
            }}
            otherStyles="my-4 w-full bg-typography-900 h-14 text-base rounded-xl font-Inter_400Regular"
          />

          <View className="w-full bg-typography-900 rounded-xl p-4 justify-between gap-1">
            <Text className="text-xl font-Inter_600SemiBold text-primary-50">
              Daily Task Progress
            </Text>
            <Progress.Bar
              progress={progress}
              width={null}
              height={10}
              color="green"
              borderRadius={5}
            />
            <Text className="text-primary-50 font-Inter_500Medium text-base">
              {completedTasks}/{tasks.length} Task(s) Completed
            </Text>
          </View>

          <View className="h-4"></View>

          {/* Render Today's Tasks */}
          <View className="w-full flex flex-row justify-between mb-2">
            <Text className="text-typography-black dark:text-textDark font-Inter_600SemiBold text-xl">
              Today's Task
            </Text>
            <Pressable onPress={() => router.push("(screens)/viewTaskLists")}>
              <Text className="text-primary-500 font-Inter_500Medium text-base text-right mt-2">
                See All
              </Text>
            </Pressable>
          </View>
          <View className=" w-full ">
            {todaysTasks.length > 0 ? (
              <FlatList
                data={todaysTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            ) : (
              <Text className="text-typography-black dark:text-textDark text-center">
                No tasks due for today
              </Text>
            )}
          </View>

          {/* Floating Add Button */}
          <IconButton
            title={"Create Task"}
            size={25}
            name={"add-circle"}
            handlePress={() => router.push("(screens)/createTask")}
            containerStyles="px-5 py-3  absolute bottom-10 right-4 bg-primary-500 rounded-full shadow-lg"
          />
        </SafeAreaView>
        <StatusBar backgroundColor="transparent" style="auto" />
      </View>
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 150,
    right: 40,
  },
});
