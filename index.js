import { AppRegistry, TouchableOpacity, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import ProfileScreen from './profile.js';
import SettingsScreen from './settings.js';
import AddCrimeScreen from './add_crime.js';

const Stack = createNativeStackNavigator();
const windowHeight = Dimensions.get('window').height;

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="AddCrimeScreen" component={AddCrimeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen() {
  const navigation = useNavigation();
  const handleButtonPress = () => {
    navigation.navigate('Profile');
  };
  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };
  const handleCrimePress = () => {
    navigation.navigate('AddCrimeScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={styles.title}>TrendSpyer</Text>
        <View style={styles.buttonsContainer}>
          {/* Profile button */}
          <TouchableOpacity onPress={handleButtonPress} style={styles.profileButton}>
            <Image
              source={require('/Users/alexanderzavaleta/Desktop/Code/491/TrendSpyer/TrendSpyerApp/assets/profile_pic.png')}
              style={styles.image_profile}
            />
          </TouchableOpacity>
           {/* Move the crime icon outside the black rectangle */}
           <TouchableOpacity onPress={handleCrimePress} style={styles.crimeButton}>
            <Image
              source={require('/Users/alexanderzavaleta/Desktop/Code/491/TrendSpyer/TrendSpyerApp/assets/cimeAdd.png')}
              style={styles.image_crime}
            />
          </TouchableOpacity>
          {/* Gear button */}
          <TouchableOpacity onPress={handleSettingsPress} style={styles.gearButton}>
            <Image
              source={require('/Users/alexanderzavaleta/Desktop/Code/491/TrendSpyer/TrendSpyerApp/assets/gear.png')}
              style={styles.image_gear}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/*google map*/}
      <View style={styles.googleContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 33.88499,
            longitude: 117.88633,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    height: windowHeight * 0.8,
  },
  rectangle: {
    backgroundColor: 'grey',
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  profileButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  crimeButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  gearButton: {
    width: 20,
    height: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'top',
  },
  image: {
    width: '130%',
    height: '100%',
  },
  image_profile: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  image_gear: {
    width: 30,
    height: 30,
  },
  image_crime: {
    width: 30,
    height: 30,
  },
  googleContainer: {
    ...StyleSheet.absoluteFillObject,
    height: 900,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


AppRegistry.registerComponent('TrendSpyerApp', () => App);

