import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@/screens/Home";

const Snack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Snack.Navigator>
        <Snack.Screen name="Home" component={Home} />
      </Snack.Navigator>
    </NavigationContainer>
  );
}
