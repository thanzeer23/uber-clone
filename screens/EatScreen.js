import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyle from "../Globalstyles/GlobalStyle";

const EatScreen = () => {
  return (
    <SafeAreaView style={GlobalStyle.AndroidSafeArea}>
      <View>
        <Text>EatScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default EatScreen;
