import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import ReportScreen from './screens/reportCrime';
import DisplayCrimeScreen from './screens/displayCrimeScreen';  
import MapScreen from './screens/MapScreen';  
import SettingsScreen from './screens/settings';  

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
            name="MapScreen"
            component={MapScreen}
            options={{ headerShown: false }} // This hides the header
          />
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{ title: 'Settings Screen' }}
          />
          <Stack.Screen
            name="ReportScreen"
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
