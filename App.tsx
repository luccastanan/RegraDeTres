import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '@/screens/Home';
import {ThemeProvider} from 'styled-components/native';
import {lightTheme} from '@/constants/theme';
import 'i18n.config';
import {useTranslation} from 'react-i18next';

const Snack = createNativeStackNavigator();

export default function App() {
  const {t} = useTranslation();

  return (
    <ThemeProvider theme={lightTheme}>
      <StatusBar backgroundColor={lightTheme.colors.PRIMARY_COLOR} />
      <NavigationContainer>
        <Snack.Navigator>
          <Snack.Screen
            name={t('appName')}
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
