import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Animated,
  Easing,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setTasks } from "../../redux/taskSlice";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/primaryButton";
import { StatusBar } from "expo-status-bar";
import SearchInput from "../../components/SearchInput";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import IconButton from "../../components/IconButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ViewTaskLists = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useLocalSearchParams();

  const { tasks, searchQuery } = useSelector((state) => state.tasks);
  const [taskList, setTaskList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Load tasks initially
  useEffect(() => {
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
          text2: "Failed to load tasks",
        });
      }
    };
    loadTasks();
  }, [dispatch]);

  //Here is to handle refresh
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

  const bottomSheetRef = useRef(null);
  const [filter, setFilter] = useState("all");

  const handleFilter = (status) => {
    setFilter(status);
    const filteredTasks = tasks.filter((task) =>
      status === "all" ? true : task.status === status
    );
    setTaskList(filteredTasks);
    bottomSheetRef.current?.close();
  };

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

  // Render hidden actions (swipeable actions)
  const renderHiddenItem = (data) => (
    <View className="flex-row h-full items-center justify-between">
      {/* Complete button */}
      <Pressable
        className=" w-20 items-center justify-between"
        onPress={() => completeTask(data.item.id)}
      >
        <Ionicons
          name={`${
            data.item.status === "completed"
              ? "checkmark-done-circle-sharp"
              : "checkmark-circle-outline"
          }`}
          size={24}
          color="#fff"
        />
        <Text className="text-primary-100 font-Inter_400Regular">{`${
          data.item.status === "completed" ? "Completed" : "Done ?"
        }`}</Text>
      </Pressable>

      {/* Delete button */}
      <Pressable
        className=" w-20 b items-center "
        onPress={() => deleteTask(data.item.id)}
      >
        <Ionicons name="trash-bin" size={24} color="red" />
        <Text className="text-primary-100 font-Inter_400Regular">Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="w-full p-5 h-full bg-typography-black">
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView className="flex-1">
          <View className="w-full mb-6 flex flex-row items-center">
            <IconButton
              handlePress={() => router.back()}
              name="arrow-back-circle-outline"
              size={40}
              containerStyles="items-center rounded"
              textStyles="text-typography-700"
            />
            <Text className="w-full text-3xl  text-primary-50 font-Inter_600SemiBold ml-4">
              Task List
            </Text>
          </View>
          <SearchInput
            placeholder="Search Tasks Here"
            value={setSearchQuery}
            onChangeText={(text) => {
              if (typeof text === "string") dispatch(setSearchQuery(text));
            }}
            otherStyles="my-4 w-full bg-typography-900 h-14 text-base rounded-xl font-Inter_400Regular"
          />
          {taskList.length === 0 ? (
            <View className="flex-1 items-center justify-center">
              <Ionicons
                name="information-circle-outline"
                size={80}
                color="gray"
              />
              <Text className="text-xl text-gray-300 mt-4">
                No tasks available.
              </Text>
            </View>
          ) : (
            <SwipeListView
              data={taskList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={75}
              rightOpenValue={-75}
              stopLeftSwipe={75}
              stopRightSwipe={-75}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )}
          <Pressable
            className="absolute bottom-16 right-4 bg-blue-500 p-4 rounded-full"
            onPress={() => bottomSheetRef.current?.expand()}
          >
            <Ionicons name="filter" size={30} color="#fff" />
          </Pressable>
          <BottomSheet ref={bottomSheetRef} snapPoints={["3%", "25%"]}>
            <BottomSheetView className="flex-1   p-4 items-center">
              <Text className="text-xl  mb-3 font-Inter_600SemiBold">
                Filter Tasks
              </Text>
              {["all", "active", "completed"].map((status) => (
                <Pressable
                  key={status}
                  className="p-3  w-full text-center"
                  onPress={() => handleFilter(status)}
                >
                  <Text className="text-center text-xl font-Inter_500Medium capitalize">
                    {status}
                  </Text>
                </Pressable>
              ))}
            </BottomSheetView>
          </BottomSheet>
        </SafeAreaView>
        <StatusBar backgroundColor="transparent" style="light" />
      </View>
    </GestureHandlerRootView>
  );
};

export default ViewTaskLists;

const styles = StyleSheet.create({
  hiddenContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
