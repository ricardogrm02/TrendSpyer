import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useIsFocused } from '@react-navigation/native';
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

  const getMarkerImage = (category) => {
    switch (category) {
      case 'Sexual Assault':
        return require('../assets/assault.png');
      case 'Vandalism':
        return require('../assets/vandalism.png');
      case 'Reckless Driving':
        return require('../assets/car-crash.png');
      case 'Theft':
        return require('../assets/theft.png');
      case 'Vehicle':
        return require('../assets/car.png');
      case 'Drug Possession':
        return require('../assets/drugs.png');
      case 'Property Damage':
        return require('../assets/prop-damage.png');
      default:
        return require('../assets/refresh_icon.png');
    }
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
            image={getMarkerImage(report.category)}
            style={{ height: 50, width: 50 }}
          >
            <Callout>
              <View>
                <Text>{report.crime}</Text>
                <Text>{report.category}</Text>
                <Image style={{ height: 100, width:100 }} source={require('../assets/crime1.png')} resizeMode="cover" />
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    height: windowHeight * 0.8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerImage: {
    width: 10, 
    height: 10, 
  },
  calloutImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default MapScreen;

