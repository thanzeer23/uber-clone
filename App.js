import { Provider } from "react-redux";
import { store } from "./store";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "./screens/mapScreen";
import EatScreen from "./screens/EatScreen";
import { KeyboardAvoidingView, Platform } from "react-native";
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Provider store={store}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <Stack.Navigator>
              <Stack.Screen
                name="HomeScreen"
                options={{ headerShown: false }}
                component={HomeScreen}
              />
              <Stack.Screen
                name="MapScreen"
                options={{
                  headerShown: false,
                  gestureDirection: "horizontal",
                  gestureEnabled: true,
                }}
                component={MapScreen}
              />
              <Stack.Screen
                name="EatsScreen"
                options={{
                  headerShown: false,
                  gestureDirection: "horizontal",
                  gestureEnabled: true,
                }}
                component={EatScreen}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
