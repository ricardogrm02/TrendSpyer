
import React, { createContext, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, View, TextInput, Button, SafeAreaView, Text, ScrollView, Pressable, Dimensions, ImageBackground, Image, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator()
const AppContext = createContext()
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height




const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const updateUsername = (text) => {
      setUsername(text)
  }

  const updatePassword = (password) => {
    setPassword(password)
  }

  const Login = () => {
    console.log(`logging in with ${username} & ${password}`)
  }

  const apiAuthentification = async () => {

  }



  /* 
  <Pressable>
            <View style = {styles.pressSpace}>
              <Image style = {{height: 30, width: 30, resizeMode: 'contain'}}source = {require('./fullerton_logo.jpg')}></Image>
              <Text style = {{alignItems: 'center', justifyContent:'center'}}>Continue with CSUF</Text>
            </View>
          </Pressable>
  */

  

  return (
    <SafeAreaProvider style = {styles.screen}>
        <View>
          <Image style = {{justifyContent: 'center', alignContent: 'center', right: 110, height: 150, resizeMode: 'contain', bottom: 100}} source = {require('./spy.jpg')}></Image>
          <Text style = {{color: "#FFFFFF", fontWeight: "bold", fontSize: 50, bottom: 120, left: 62}}>TrendSpyer</Text>
          <View style = {styles.TextInputContainer}>
          <TextInput style = {styles.input}placeholder='Enter Username or Fullerton email' onChangeText={text => updateUsername(text)}></TextInput>
          <TextInput style = {styles.input}placeholder='Enter Password' onChangeText={text => updatePassword(text)}></TextInput>
          </View>
          <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
          <Pressable disabled = {username.length == 0 || password.length == 0} onPress={() => Login}>
            <View style = {styles.pressSpace}>
              <Text style = {{color: "#24A0ED"}}>Login</Text>
            </View> 
            </Pressable>
            <Pressable>
            <View style = {styles.pressSpace}>
              <Text style = {{color: "#24A0ED"}}>Register</Text>
            </View>
          </Pressable>
          </View>
          <Pressable>
          <View style = {styles.duoAuth}>
              <Text style = {{color: "#24A0ED"}}>Continue with CSUF</Text>
            </View> 
          </Pressable>
          <Text>PASSWORD: {password} </Text>
          <Text>USER EMAIL: {username} </Text>
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
    margin: 10

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
export default App;




