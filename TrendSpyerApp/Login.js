import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, TextInput, Text, Pressable, Image, Dimensions } from 'react-native';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

// Regex patterns
const emailPattern = /^[a-zA-Z0-9._%+-]+@csu\.fullerton\.edu$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const validateInput = () => {
    if (!emailPattern.test(userEmail)) {
      alert("Please enter a valid CSU Fullerton email.");
      return false;
    }
    if (!passwordPattern.test(userPassword)) {
      alert("Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.");
      return false;
    }
    return true;
  };

  const Login = async () => {
    if (!validateInput()) return;

    try {
      const response = await axios.post('http://10.0.2.2:3000/api/user/login', { email: userEmail, password: userPassword });
      alert(`Login Successful. Welcome, ${response.data.user.personName}`);
      navigation.navigate("MapScreen");
    } catch (error) {
      console.error('Login Error', error);
      alert("Failed to login. Please try again");
    }
  };

  const Register = () => {
    navigation.navigate("RegisterScreen");
  };

  return (
    <SafeAreaProvider style={styles.screen}>
      <View style={styles.container}>
        <Image source={require('./spy.jpg')} style={styles.logo} />
        <Text style={styles.title}>TrendSpyer</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Email'
            onChangeText={setUserEmail}
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry
            onChangeText={setUserPassword}
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, !(userEmail && userPassword) && styles.buttonDisabled]}
            disabled={!(userEmail && userPassword)}
            onPress={Login}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={Register}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#A0AABF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: screenWidth * 0.85,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    color: "#FFF",
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
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { height: 1 },
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#008080",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '48%',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { height: 2
    }, elevation: 2,
  },
  buttonText: {
  color: "#FFF",
  fontWeight: 'bold',
  },
  buttonDisabled: {
  backgroundColor: "#ccc",
  }
  });
  
  export default LoginScreen;