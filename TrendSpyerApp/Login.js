

import React, { createContext, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, View, TextInput, Button, SafeAreaView, Text, ScrollView, Pressable, Dimensions, ImageBackground, Image, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios'
const Stack = createNativeStackNavigator()
const AppContext = createContext()
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height




const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setPassword] = useState('')

  const updateUserEmail = (email) => {
      setUserEmail(email)
  }

  const updatePassword = (password) => {
    setPassword(password)
  }

  const Login = async () => {
    try {
    const response = await axios.post('http://10.0.2.2:3000/api/user/login', {email: userEmail, password: userPassword});
    alert(`Login Successful. Welcome, ${response.data.user.personName}`);
    navigation.navigate("MapScreen")
    } catch (error) {
      console.error('Login Error', error);
      alert("Failed to login. Please Try again")
    }
  }

  const Register = () => {
    navigation.navigate("RegisterScreen")
  }

  const apiAuthentification = async () => {}
  
  return (
    <SafeAreaProvider style = {styles.screen}>
        <View>
          <Image style = {{justifyContent: 'center', alignContent: 'center', right: 110, height: 150, resizeMode: 'contain', bottom: 100}} source = {require('./spy.jpg')}></Image>
          <Text style = {{color: "#FFFFFF", fontWeight: "bold", fontSize: 50, bottom: 120, left: 62}}>TrendSpyer</Text>
          <View style = {styles.TextInputContainer}>
          <TextInput style = {styles.input}placeholder='Enter Fullerton Email' onChangeText={text => updateUserEmail(text)}></TextInput>
          <TextInput style = {styles.input}placeholder='Enter Password' onChangeText={text => updatePassword(text)}></TextInput>
          </View>
          <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
            <View style = {styles.pressSpace}>
            <Pressable disabled = {userEmail.length == 0 || userPassword.length == 0} onPress={Login}>
              <Text style = {{color: "#24A0ED"}}>Login</Text>
              </Pressable>
            </View> 
            <View style = {styles.pressSpace}>
            <Pressable onPress={Register}>
              <Text style = {{color: "#24A0ED"}}>Register</Text>
            </Pressable>
            </View>
          </View>
          <View style = {styles.duoAuth}>
          <Pressable>
              <Text style = {{color: "#24A0ED"}}>Continue with CSUF</Text>
            </Pressable> 
            </View> 
        </View>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#0D7D2D',
    alignContent: 'center',
    justifyContent: 'center',
  },

  input: {
    backgroundColor: "#EDFFD6",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },

  pressSpace: {
    backgroundColor: "#EDFFD6",
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    width: 94,
    height: 23,
    justifyContent: 'center',
    bottom: 80,
    marginHorizontal: 10

  },

  TextInputContainer: {
    width: 300,
    height: 50,
    rowGap: 30,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    marginBottom: 100,
    left: screenWidth / 2 - 150,
    bottom: 50
  },
  duoAuth: {
    backgroundColor: "#EDFFD6",
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    width: 150,
    height: 30,
    justifyContent: 'center',
    bottom: 60,
    left: screenWidth / 2 - 75,
  },

})
export default LoginScreen;
