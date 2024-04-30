import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Alert, LogBox } from 'react-native';
import { Button, Text, Modal, Portal, TextInput, Provider as PaperProvider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';  
import { PermissionsAndroid } from 'react-native';

LogBox.ignoreLogs(['Using Math.random is not cryptographically secure! Use bcrypt.setRandomFallback to set a PRNG.']); //delete this later

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "This app needs access to your location to report crime.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
}

const CrimeReportScreen = ({ navigation }) => {
  const [crime, setCrime] = useState('');
  const [tag, setTag] = useState('');
  const [reportDateTime, setReportDateTime] = useState('');
  const [category, setCategory] = useState('');
  const [trend, setTrend] = useState('');
  const [location, setLocation] = useState(null);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [trendModalVisible, setTrendModalVisible] = useState(false);

  useEffect(() => {
    const currentDateTime = new Date().toISOString();
    setReportDateTime(currentDateTime);
    (async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        fetchLocation();
      } else {
        Alert.alert(
          "Location Permission Required",
          "Please enable location permissions in settings to use this feature.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => OpenSettings.openSettings() } // Requires 'react-native-open-settings' or similar library
          ]
        );
      }
    })();
  }, []);
  

  const fetchLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        Alert.alert('Error', 'Unable to fetch location');
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleSubmit = async () => {
    if (!location) {
      Alert.alert('Error', 'Location not available. Try again.');
      return;
    }
    try {
      const locationData = {
        type: "Point",
        coordinates: [location.longitude, location.latitude]
      };
  
      const reportData = {
        crime,
        tag: trend,
        reportDate: reportDateTime,
        category,
        reportID: Math.floor(Math.random() * 10000),
        location: locationData
      };
  
      console.log("Sending data:", reportData); // Log the data being sent
  
      const response = await axios.post('http://10.0.2.2:3000/api/user/upload/report', reportData);
      console.log(response.data);
      Alert.alert('Success', 'Report uploaded successfully!');
    } catch (error) {
      console.error('Failed to upload report', error);
      Alert.alert('Error', `Failed to upload report: ${error.message}`);
    }
  };
  
  

  return (
    <PaperProvider>
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Report a Crime</Text>
          <TextInput
            label="Crime Description"
            value={crime}
            onChangeText={setCrime}
            mode="outlined"
            style={styles.input}
          />
          <Text style={styles.label}>Report Date and Time: {new Date(reportDateTime).toLocaleString()}</Text>
          
          <Button 
            onPress={() => setCategoryModalVisible(true)} 
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Select Category: {category || "None"}
          </Button>
          <Portal>
            <Modal visible={categoryModalVisible} onDismiss={() => setCategoryModalVisible(false)} contentContainerStyle={styles.modalContainer}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => {
                  setCategory(itemValue);
                  setCategoryModalVisible(false);
                }}>
                <Picker.Item label="Other" value="Other" />
                <Picker.Item label="Reckless Driving" value="Reckless Driving" />
                <Picker.Item label="Property Damage" value="Property Damage" />
                <Picker.Item label="Theft" value="Theft" />
                <Picker.Item label="Vehicle" value="Vehicle" />
                <Picker.Item label="Vandalism" value="Vandalism" />
                <Picker.Item label="Sexual Assault" value="Sexual Assault" />
                <Picker.Item label="Drug Possession" value="Drug Possession" />
              </Picker>
            </Modal>
          </Portal>

          <Button 
            onPress={() => setTrendModalVisible(true)} 
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Select Trend: {trend || "None"}
          </Button>
          <Portal>
            <Modal visible={trendModalVisible} onDismiss={() => setTrendModalVisible(false)} contentContainerStyle={styles.modalContainer}>
              <Picker
                selectedValue={trend}
                onValueChange={(itemValue) => {
                  setTrend(itemValue);
                  setTrendModalVisible(false);
                }}>
               <Picker.Item label="Other" value="Other" />
                <Picker.Item label="Fleeing Frenzy" value="Fleeing Frenzy" />
                <Picker.Item label="Drink and Drive Danger" value="Drink and Drive Danger" />
                <Picker.Item label="Vandalism Alert" value="Vandalism Alert" />
                <Picker.Item label="Stealing Spree" value="Stealing Spree" />
                <Picker.Item label="Unlicensed Behind the Wheel" value="Unlicensed Behind the Wheel" />
                <Picker.Item label="Graffiti Blitz" value="Graffiti Blitz" />
                <Picker.Item label="Part Heist" value="Part Heist" />
                <Picker.Item label="Valuables Vanish" value="Valuables Vanish" />
                <Picker.Item label="Shoplift Shuffle" value="Shoplift Shuffle" />
                <Picker.Item label="Sexual Violence Report" value="Sexual Violence Report" />
                <Picker.Item label="Fraudulent Drug Acquisition" value="Fraudulent Drug Acquisition" />
                <Picker.Item label="Smash-and-grab" value="Smash-and-grab" />
                <Picker.Item label="Car hacking" value="Car hacking" />
              </Picker>
            </Modal>
          </Portal>

          <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
            Submit Report
          </Button>

          {/* Navigation button to go to DisplayCrimeScreen */}
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('DisplayCrime')}
            style={styles.navButton}>
            View Reports
          </Button>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#333',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#424242',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#ddd',
  },
  button: {
    marginBottom: 10,
    backgroundColor: '#1E90FF',
  },
  buttonContent: {
    height: 50,
    fontSize: 18
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: '#00C853',
  },
  navButton: {
    marginTop: 10,
    backgroundColor: '#008CBA', // Different color for navigation button
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  }
});

export default CrimeReportScreen;