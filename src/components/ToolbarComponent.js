import React from "react";
import { View, Image } from "react-native";
import { Icon } from "react-native-elements";
import { NavigationBar } from "navigationbar-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function ComponentLeft() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
      }}
    >
      <Icon name="menu" style={{ marginLeft: 20 }} color="#FFFFFF" />
      <Icon name="search" style={{ marginLeft: 20 }} color="#FFFFFF" />
    </View>
  );
}

function ComponentRight() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TouchableOpacity>
        <Image
          source={require("../assets/logo.png")}
          style={{
            resizeMode: "contain",
            width: 180,
            height: 30,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function ToolbarComponent() {
  return (
    <NavigationBar
      componentLeft={() => <ComponentLeft />}
      componentRight={() => <ComponentRight />}
      navigationBarStyle={{
        backgroundColor: "#121212",
        marginTop: 30,
      }}
    />
  );
}
