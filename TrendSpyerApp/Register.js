
import React, { createContext, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, View, TextInput, Button, SafeAreaView, Text, ScrollView, Pressable, Dimensions, ImageBackground, Image, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios'
// const Stack = createNativeStackNavigator()
const AppContext = createContext()
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height



const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setConfirmation] = useState('')

  const updateUsername = (user) => {
      setUsername(user)
  }

  const updateEmail = (email) => {
    setEmail(email)
  }

  const updatePassword = (password) => {
    setPassword(password)
}

const confrimPassword = (confirmation) => {
    setConfirmation(confirmation)
}

const Login = () => {
  console.log("login clicked")
  navigation.navigate("LoginScreen")

}
/*
   userName: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    sex: {type: String, required: true},
    personName: {type: String, required: true},
 */
  const Register = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/api/user/register', {
      
      });
      console.log(response.data);
      alert('Registered Successfuly');
    } catch (error) {
      console.error('Register Error', error);
      alert('Failed to Register');
    }
  };

  const apiAuthentification = async () => {

  }

  return (
    <SafeAreaProvider style = {styles.screen}>
        <View>
          <Image style = {{justifyContent: 'center', alignContent: 'center', right: 110, height: 150, resizeMode: 'contain', bottom: 100}} source = {require('./spy.jpg')}></Image>
          <Text style = {{color: "#FFFFFF", fontWeight: "bold", fontSize: 50, bottom: 120, left: 62}}>TrendSpyer</Text>
          <View style = {styles.TextInputContainer}>
          <TextInput style = {styles.input}placeholder='Enter Username' onChangeText={text => updateUsername(text)}></TextInput>
          <TextInput style = {styles.input}placeholder='Enter Email' onChangeText={text => updateEmail(text)}></TextInput>
          <TextInput style = {styles.input}placeholder='Enter Password' onChangeText={text => updatePassword(text)}></TextInput>
          <TextInput style = {styles.input}placeholder='Re-Enter Password' onChangeText={text => confrimPassword(text)}></TextInput>
          </View>
          <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
          <Pressable onPress={Login}>
            <View style = {styles.pressSpace}>
              <Text style = {{color: "#24A0ED"}}>Login</Text>
            </View> 
            </Pressable>
            <Pressable onPress ={Login}>
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
          <View style = {{top: 60}}>
          <Text>USERNAME: {username} </Text>
          <Text>USER EMAIL: {email} </Text>
          <Text>PASSWORD: {password} </Text>
          <Text>RE-ENTER PASSWORD: {passwordConfirmation} </Text>
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
    alignContent: 'center',
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
    margin: 10,
    top: 40
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
    left: screenWidth / 2 - 75,
    top: 50
  },

})
export default RegisterScreen;




