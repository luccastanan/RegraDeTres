import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@/screens/Home";
import { ThemeProvider } from "styled-components/native";
import { lightTheme } from "@/constants/theme";

const Snack = createNativeStackNavigator();
/* import {
  AppOpenAd,
  TestIds,
  AdEventType,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.APP_OPEN
  : "ca-app-pub-3032392588437437/2358165170"; */
export default function App() {
  /*   const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ["fashion", "clothing"],
  });

  // Preload an app open ad
  appOpenAd.load();

  // Show the app open ad when user brings the app to the foreground.
  appOpenAd.show(); */
  return (
    <ThemeProvider theme={lightTheme}>
      <NavigationContainer>
        <Snack.Navigator>
          <Snack.Screen
            name="Regra de 3"
            component={Home}
            options={{
              headerStyle: {
                backgroundColor: lightTheme.colors.PRIMARY_COLOR,
              },
              headerTintColor: lightTheme.colors.BACKGROUND_COLOR,
            }}
          />
        </Snack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
