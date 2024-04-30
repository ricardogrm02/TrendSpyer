import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useIsFocused } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
const windowHeight = Dimensions.get('window').height;

const MapScreen = ({ navigation }) => {
  const [reports, setReports] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchReports();
    }
  }, [isFocused]);  

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/api/report/info');
      setReports(response.data);
    } catch (error) {
      console.error('Failed to fetch reports', error);
    }
  };

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
          latitude: 33.8823,
          longitude: -117.8851,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {reports.map((report, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: report.location.coordinates[1],
              longitude: report.location.coordinates[0],
            }}
            title={report.crime}
            description={report.category}
            pinColor="red"
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
          {/* Refresh Button */}
          <TouchableOpacity onPress={fetchReports} style={styles.refreshButton}>
            <Image source={require('../assets/refresh_icon.png')} style={styles.image_refresh} />
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
  refreshButton: {
    position: 'absolute',
    left: -250,  
    bottom: -700,  
    width: 50,  
    height: 50,  
    borderRadius: 25,  
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',  
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image_refresh: {
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
