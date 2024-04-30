import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;

const MapScreen = ({ navigation }) => {
  const [reports, setReports] = useState([]);
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

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

  const handleMarkerPress = (report) => {
    setSelectedReport(report);
    setModalVisible(true);
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
            onPress={() => handleMarkerPress(report)}
            image={getMarkerImage(report.category)}
          />
        ))}
      </MapView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            {selectedReport && (
              <View style={styles.modalDetails}>
                <Text style={styles.modalTitle}>{selectedReport.crime}</Text>
                <Text style={styles.modalText}>Trend: {selectedReport.tag}</Text>
                <Text style={styles.modalText}>Date: {new Date(selectedReport.reportDate).toLocaleDateString()}</Text>
                <Text style={styles.modalText}>Category: {selectedReport.category}</Text>
                <Image
                  source={getMarkerImage(selectedReport.category)}
                  style={styles.modalImage}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>

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
    backgroundColor: '#121212',
    height: windowHeight * 0.8,
  },
  rectangle: {
    backgroundColor: 'gray', 
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
    width: 30,
    height: 30,
  },
  image_profile: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  image_crime: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  image_gear: {
    width: '100%',
    height: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
  },
  modalContent: {
    backgroundColor: '#282828', 
    borderRadius: 15,
    padding: 25,
    width: '90%',
    maxWidth: 400,
  },
  modalDetails: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#E0E0E0', 
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#BDBDBD', 
  },
  modalImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#E0E0E0',
  },
});

export default MapScreen;
