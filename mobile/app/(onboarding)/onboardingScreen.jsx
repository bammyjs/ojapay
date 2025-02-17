import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const OnboardingScreen = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef();

  const pages = [
    {
      image: require("../../assets/images/screen3.jpg"),
      title: "Welcome",
      subtitle: "Discover the best products @Offaxe Store!",
    },
    {
      image: require("../../assets/images/screen4.jpg"),
      title: "Save Money",
      subtitle: "Get the best deals!",
    },
    {
      image: require("../../assets/images/screen5.jpg"),
      title: "Shop Smart",
      subtitle: "Enjoy the best shopping experience!",
    },
  ];
  const handleNext = async () => {
    if (currentIndex < pages.length - 1) {
      scrollRef.current.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      router.replace("(tabs)/home");
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    router.replace("(tabs)/home");
  };

  const onScrollEnd = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };
  return (
    <View style={styles.container}>
      {/* Onboarding Image and Text */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        onMomentumScrollEnd={onScrollEnd}
        bounces={false}
      >
        {pages.map((page, index) => (
          <View key={index} style={styles.page}>
            <Image source={page.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text
                style={styles.title}
                className=" bottom-0 text-center text-typography-gray text-5xl font-Inter_700Bold"
              >
                {page.title}
              </Text>
              <Text style={styles.subtitle}>{page.subtitle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleSkip}
          style={styles.skipButton}
          className={`${currentIndex == pages.length - 1 && "hidden"}`}
        >
          <Text
            style={styles.skipText}
            className="  text-typography-gray text-xl font-Inter_700Bold"
          >
            Skip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          style={styles.nextButton}
          className={`${
            currentIndex == pages.length - 1 && "w-full justify-center"
          }`}
        >
          <Text
            style={styles.nextText}
            className=" text-center text-typography-white text-xl font-Inter_700Bold"
          >
            {currentIndex === pages.length - 1 ? "Get Started" : "Next"}
          </Text>
          {currentIndex !== pages.length - 1 && (
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  page: {
    width: width,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textContainer: {
    position: "absolute",
    bottom: 200,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
  },
  paginationContainer: {
    position: "absolute",
    bottom: 120,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#555",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#f66743",
    width: 12,
    height: 12,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.9,
    alignItems: "center",
  },
  skipButton: {
    padding: 10,
    borderRadius: 20,
  },
  skipText: {
    fontSize: 16,
    color: "#fff",
  },
  nextButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f66743",
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 100,
  },
  nextText: {
    fontSize: 16,
    color: "#fff",
    marginRight: 5,
  },
});

export default OnboardingScreen;
