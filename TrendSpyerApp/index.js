import {AppRegistry} from 'react-native';
import App from './TestDisplay';
import {name as appName} from './app.json';
import MapScreen from './MapScreen';


AppRegistry.registerComponent(appName, () => MapScreen);




/*import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './MapScreen';
import ProfileScreen from './profile.js';
import SettingsScreen from './settings.js';
import AddCrimeScreen from './add_crime.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={MapScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="AddCrimeScreen" component={AddCrimeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('TrendSpyerApp', () => App);
*/
