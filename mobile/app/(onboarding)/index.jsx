import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
router;

const SplashScreen = () => {
  useEffect(() => {
    const checkOnboarding = async () => {
      const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
      console.log("Onboarding flag reset successfully.");
      setTimeout(() => {
        if (hasSeenOnboarding) {
          router.replace("(screens)/");
        } else {
          router.replace("(onboarding)/onboardingScreen");
        }
      }, 3000);
    };

    checkOnboarding();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/ojapaylogo.jpg")}
        style={styles.logo}
      />
      <Text style={styles.text}>Task Manager App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: "contain",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SplashScreen;
