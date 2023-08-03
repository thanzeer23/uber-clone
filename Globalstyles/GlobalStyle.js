import { StyleSheet, StatusBar } from "react-native";

export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
