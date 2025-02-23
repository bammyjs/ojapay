import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
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
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import SearchInput from "../../components/SearchInput";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import IconButton from "../../components/IconButton";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import SwipeableTaskItem from "../../components/SwipeableTaskItem";

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

  useEffect(() => {
    const query = params.search || "";
    dispatch(setSearchQuery(query));
    if (query) {
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase())
      );
      setTaskList(filtered);
    } else {
      setTaskList(tasks);
    }
  }, [params.search, tasks]);

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
    <SwipeableTaskItem
      item={item}
      onDelete={deleteTask}
      onComplete={completeTask}
      onPress={() =>
        router.push({ pathname: "/(screens)/taskDetailScreen", params: item })
      }
    />
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="w-full p-5 h-full bg-backgroundLight dark:bg-backgroundDark">
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView className="flex-1">
          <View className="w-full mb-6 flex flex-row items-center">
            <IconButton
              handlePress={() => router.back()}
              name="arrow-back-circle-outline"
              size={40}
              color={"#F66743"}
              containerStyles="items-center rounded"
              textStyles="text-typography-700"
            />
            <Text className="w-full text-3xl  text-textLight dark:text-textDark font-Inter_600SemiBold ml-4">
              Task List
            </Text>
          </View>
          <SearchInput
            placeholder="Search Tasks Here"
            value={searchQuery}
            onChangeText={(text) => {
              dispatch(setSearchQuery(text));
              const filteredTasks = tasks.filter((task) =>
                task.title.toLowerCase().includes(text.toLowerCase())
              );
              setTaskList(filteredTasks);
            }}
            otherStyles="my-4 w-full dark:bg-typography-900 h-14 text-base rounded-xl font-Inter_400Regular"
          />

          {taskList.length === 0 ? (
            <View className="flex-1 items-center justify-center">
              <Ionicons
                name="information-circle-outline"
                size={80}
                color="gray"
              />
              <Text className="text-xl text-textLight dark:text-textDark mt-4">
                No tasks available.
              </Text>
            </View>
          ) : (
            <FlatList
              data={taskList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              refreshing={refreshing}
              onRefresh={onRefresh}
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            />
          )}
          <Pressable
            className="absolute bottom-16 right-4 bg-primary-500 p-4 rounded-full"
            onPress={() => bottomSheetRef.current?.expand()}
          >
            <Ionicons name="filter" size={30} color="#fff" />
          </Pressable>
          <BottomSheet ref={bottomSheetRef} snapPoints={["3%", "25%"]}>
            <BottomSheetView className="flex-1  p-4  items-center">
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
        <StatusBar backgroundColor="transparent" style="auto" />
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

// Render hidden actions (swipeable actions)
// const renderHiddenItem = (data) => (
//   <View className="flex-row h-full items-center justify-between">
//     {/* Complete button */}
//     <Pressable
//       className=" w-20 items-center justify-between"
//       onPress={() => completeTask(data.item.id)}
//     >
//       <Ionicons
//         name={`${
//           data.item.status === "completed"
//             ? "checkmark-done-circle-sharp"
//             : "checkmark-circle-outline"
//         }`}
//         size={24}
//         color="#fff"
//       />
//       <Text className="text-primary-100 font-Inter_400Regular">{`${
//         data.item.status === "completed" ? "Completed" : "Done "
//       }`}</Text>
//     </Pressable>

//     {/* Delete button */}
//     <Pressable
//       className=" w-20 b items-center "
//       onPress={() => deleteTask(data.item.id)}
//     >
//       <Ionicons name="trash-bin" size={24} color="red" />
//       <Text className="text-primary-100 font-Inter_400Regular">Delete</Text>
//     </Pressable>
//   </View>
// );
