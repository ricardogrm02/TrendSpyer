import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, TextInput, Text, Pressable, Image, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

// Regex patterns
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
const agePattern = /^(?:0|[1-9]\d?|1[0-1]\d|120)$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@csu\.fullerton\.edu$/;

const RegisterScreen = ({ navigation }) => {
  const [legalName, setLegalName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setConfirmation] = useState('');
  const [userAge, setAge] = useState('18');
  const [userSex, setSex] = useState('Male');

  const validateInput = () => {
    if (!emailPattern.test(email)) {
      alert("Please enter a valid CSU Fullerton email.");
      return false;
    }
    if (!passwordPattern.test(password)) {
      alert("Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.");
      return false;
    }
    if (password !== passwordConfirmation) {
      alert("Passwords do not match.");
      return false;
    }
    if (!agePattern.test(userAge)) {
      alert("Please enter a valid age.");
      return false;
    }
    return true;
  };

  const Register = async () => {
    if (!validateInput()) return;

    try {
      const response = await axios.post('http://10.0.2.2:3000/api/user/register', {
        userName: username,
        age: userAge,
        email: email,
        password: password,
        sex: userSex,
        personName: legalName
      });
      alert('Registration Successful');
      navigation.navigate("MapScreen");
    } catch (error) {
      console.error('Registration Error', error);
      alert("Failed to register. Please try again");
    }
  };

  const goBackToLogin = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <SafeAreaProvider style={styles.screen}>
      <View style={styles.container}>
        <Image source={require('./spy.jpg')} style={styles.logo} />
        <Text style={styles.title}>Register</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder='Legal Name' onChangeText={setLegalName} placeholderTextColor="#666" />
          <TextInput style={styles.input} placeholder='Username' onChangeText={setUsername} placeholderTextColor="#666" />
          <TextInput style={styles.input} placeholder='Email' onChangeText={setEmail} placeholderTextColor="#666" />
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Sex:</Text>
            <Picker
              selectedValue={userSex}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setSex(itemValue)}>
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Age:</Text>
            <Picker
              selectedValue={userAge}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setAge(itemValue)}>
              {Array.from({ length: 100 }, (_, i) => i + 18).map((age) => (
                <Picker.Item key={age} label={age.toString()} value={age.toString()} />
              ))}
            </Picker>
          </View>
          <TextInput style={styles.input} placeholder='Password' secureTextEntry onChangeText={setPassword} placeholderTextColor="#666" />
          <TextInput style={styles.input} placeholder='Confirm Password' secureTextEntry onChangeText={setConfirmation} placeholderTextColor="#666" />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={Register}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={goBackToLogin}>
          <Text style={styles.buttonText}>Back to Login</Text>
      </Pressable>
    </View>
  </View>
</SafeAreaProvider>
);
};

const styles = StyleSheet.create({
  screen: {
  flex: 1,
  backgroundColor: '#A0AABF', // Muted steel gray background
  alignItems: 'center',
  justifyContent: 'center',
  },
  container: {
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  width: screenWidth * 0.85, // Ensure consistent element width
  },
  logo: {
  width: 180,
  height: 180,
  marginBottom: 20,
  resizeMode: 'contain',
  },
  title: {
  color: "#FFF", // White text for contrast
  fontWeight: "600",
  fontSize: 24,
  marginBottom: 20,
  },
  inputContainer: {
  width: '100%',
  },
  input: {
  backgroundColor: "#FFFFFF",
  borderRadius: 25,
  paddingVertical: 12,
  paddingHorizontal: 20,
  fontSize: 16,
  marginBottom: 10,
  width: '100%',
  shadowOpacity: 0.2, // Subtle shadow for depth
  shadowRadius: 3,
  shadowOffset: { height: 1 },
  elevation: 2,
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '100%',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { height: 1 },
    elevation: 2,
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginRight: 10, 
  },
  picker: {
    flex: 1, 
  },
  buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: 10,
  },
  button: {
  backgroundColor: "#008080", // Teal for buttons
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 25,
  width: '48%', 
  alignItems: 'center',
  shadowOpacity: 0.2,
  shadowRadius: 3,
  shadowOffset: { height: 2 },
  elevation: 2,
  },
  buttonText: {
  color: "#FFF",
  fontWeight: 'bold',
  },
  });
  
  export default RegisterScreen;  