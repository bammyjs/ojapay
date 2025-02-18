import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

const ToRotateHandle = () => {
  const [orientation, setOrientation] = useState("Unknown");

  useEffect(() => {
    const getOrientation = async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();
      setOrientation(orientation);
    };

    const subscription = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        const newOrientation = event.orientationInfo.orientation;
        setOrientation(newOrientation);
      }
    );

    getOrientation();

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Orientation: {orientation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ToRotateHandle;
