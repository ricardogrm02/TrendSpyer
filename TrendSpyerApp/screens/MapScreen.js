import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useIsFocused } from '@react-navigation/native';  // Import the useIsFocused hook
import axios from 'axios';  // Import Axios for API calls

const windowHeight = Dimensions.get('window').height;

const MapScreen = ({ navigation }) => {
  const [reports, setReports] = useState([]);  // State to hold the crime reports
  const isFocused = useIsFocused();  // Determines if the screen is currently focused

  useEffect(() => {
    if (isFocused) {  // Only fetch reports if the screen is focused
      const fetchReports = async () => {
        try {
          const response = await axios.get('http://10.0.2.2:3000/api/report/info');  // Adjust this to your actual API endpoint
          setReports(response.data);  // Store the fetched reports in state
        } catch (error) {
          console.error('Failed to fetch reports', error);
        }
      };

      fetchReports();
    }
  }, [isFocused]);  // Re-run the effect when isFocused changes

  const goToCrimeReport = () => {
    navigation.navigate('ReportScreen'); 
  };
  
  const goToSettings = () => {
    navigation.navigate('SettingsScreen'); 
  };
  
  const goToProfile = () => {
    navigation.navigate('ProfilePageScreen');
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 33.8823,  // Default starting location
          longitude: -117.8851,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {reports.map((report, index) => (
          <Marker
            key={index}  // Use index as a key if unique id is not available
            coordinate={{
              latitude: report.location.coordinates[1],  // Latitude
              longitude: report.location.coordinates[0],  // Longitude
            }}
            title={report.crime}  // Title of the marker
            description={report.category}  // Description shown in the callout
            pinColor="red"  // Color of the marker
          />
        ))}
      </MapView>
      <View style={styles.rectangle}>
        <Text style={styles.title}>TrendSpyer</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={goToProfile} style={styles.profileButton}>
            <Image source={require('../assets/profile_pic.png')} style={styles.image_profile} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToCrimeReport} style={styles.crimeButton}>
            <Image source={require('../assets/cimeAdd.png')} style={styles.image_crime} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToSettings} style={styles.gearButton}>
            <Image source={require('../assets/gear.png')} style={styles.image_gear} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
