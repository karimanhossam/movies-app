import React from "react";
import { Dimensions } from "react-native";
import { View } from "react-native";

import MoviesList from "./src/components/MoviesList";
import ToolbarComponent from "./src/components/ToolbarComponent";
const { width, height } = Dimensions.get("window");
export default function App() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#121212",
        width: width,
        height: height,
      }}
    >
      <ToolbarComponent />
      <MoviesList />
    </View>
  );
}
