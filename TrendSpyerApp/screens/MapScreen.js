import React, { useState, useEffect , useContext} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useIsFocused } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import {AppContext, Appcontext} from '../TestDisplay'
const windowHeight = Dimensions.get('window').height;

const MapScreen = ({ navigation }) => {
  const [reports, setReports] = useState([]);
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarkerImage, setSelectedMarkerImage] = useState(null);
  const [staticMarker1ModalVisible, setStaticMarker1ModalVisible] = useState(false);

  const context = React.useContext(AppContext)
        {/* {context.imagePathList.map((image, index) =>
      <View key = {index}>
        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      </View>
    )} */}

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

  const getImage = (category) => {
    switch(category) {
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
  }

  const handleMarkerPress = (imageFilename) => {
  if (imageFilename) {
      setSelectedMarkerImage(imageFilename);
      setModalVisible(true);
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
        {reports.map((reports, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: reports.location.coordinates[1],
              longitude: reports.location.coordinates[0],
            }}
            onPress={() => handleMarkerPress(getMarkerImage(reports.image))}
            image={getMarkerImage(reports.category)} // Use the image based on the category
            imageStyle={styles.markerImage}
          >
            {/*<Image source={getMarkerImage(report.category)} style={styles.markerImage} />*/}
            <Callout>
              <View>
                <Text>{reports.crime}</Text>
                <Text>{reports.category}</Text>
              </View>
            </Callout>
          </Marker>

        ))}

        {/*static marker starts here
        {reports.length > 0 && (
        <Marker
          coordinate={{
          latitude: 33.8823,
          longitude: -117.8851,
        }}
        onPress={() => handleMarkerPress(reports[0].Image.data.data)}
        image={getMarkerImage(reports[0].category)} 
        imageStyle={styles.markerImage}
       />
        )}
        static marker end's here*/}      


        {/*static #1*/}
        {reports.length > 0 && (
        <Marker
          coordinate={{
         latitude: reports[0].location.coordinates[0],
         longitude: reports[0].location.coordinates[1]
        }}
        onPress={() => setStaticMarker1ModalVisible(true)} // Set modal visibility to true
        image={getMarkerImage(reports.category)} // Use the specific image for static marker #1
        imageStyle={styles.markerImage}
        />
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={staticMarker1ModalVisible} // Use state variable to control visibility
          onRequestClose={() => setStaticMarker1ModalVisible(false)}
          >
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => setStaticMarker1ModalVisible(false)} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          {/* Display the specific image for static marker #1 */}
          <Image source={require('../assets/crime1.png')} style={styles.modalImage} />
          </View>
         </Modal>
        {/*static #1*/}      


     </MapView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
            {selectedMarkerImage && (
      <Image
        source={require('../assets/crime1.png')} // Load the image dynamically
        style={styles.modalImage}
      />
    )} 
          </TouchableOpacity>
                  </View>
      </Modal>
      {/* End of Modal */}

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
  markerImage: {
    width: 0.5, 
    height: 0.5, 
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  reportImage: {
  width: 20,
  height: 20,
  },
});

export default MapScreen;

