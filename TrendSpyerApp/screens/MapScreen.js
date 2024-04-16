import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const windowHeight = Dimensions.get('window').height;

const MapScreen = ({ navigation }) => {

  const goToCrimeReport = () => {
    navigation.navigate('ReportScreen'); 
  };
  
  const goToSettings = () => {
    navigation.navigate('SettingsScreen'); 
  };
  
  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  
  
  return (
    <View style={styles.container}>
      {/*google map*/}
      <View style={styles.googleContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 33.8823,
            longitude: -117.8851,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
          }}
        />
      </View>
      <View style={styles.rectangle}>
        <Text style={styles.title}>TrendSpyer</Text>
        <View style={styles.buttonsContainer}>
          {/* Profile button */}
          <TouchableOpacity onPress={goToProfile} style={styles.profileButton}>
            <Image
              source={require('../assets/profile_pic.png')}
              style={styles.image_profile}
            />
          </TouchableOpacity>
          {/* Crime button */}
          <TouchableOpacity onPress={goToCrimeReport} style={styles.crimeButton}>
            <Image
              source={require('../assets/cimeAdd.png')}
              style={styles.image_crime}
            />
          </TouchableOpacity>
          {/* Gear button */}
          <TouchableOpacity onPress={goToSettings} style={styles.gearButton}>
            <Image
              source={require('../assets/gear.png')}
              style={styles.image_gear}
            />
          </TouchableOpacity>
        </View>
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
    marginRight: 10,
  },
  crimeButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 10,
  },
  gearButton: {
    width: 20,
    height: 20,
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
    width: 500,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;

