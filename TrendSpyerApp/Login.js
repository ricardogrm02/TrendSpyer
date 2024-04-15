import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import ReportScreen from './screens/reportCrime';
import DisplayCrimeScreen from './screens/displayCrimeScreen';  // Import the new screen

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="CrimeReport"
            component={ReportScreen}
            options={{ title: 'Report a Crime' }}
          />
          <Stack.Screen
            name="DisplayCrime"
            component={DisplayCrimeScreen}
            options={{ title: 'Display Crimes' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
