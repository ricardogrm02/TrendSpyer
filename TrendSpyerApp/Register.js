
import React, { createContext, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, View, TextInput, Button, SafeAreaView, Text, ScrollView, Pressable, Dimensions, ImageBackground, Image, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios'
// const Stack = createNativeStackNavigator()
const AppContext = createContext()
const screenWidth = Dimensions.get('window').width
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
let  agePattern = /^(?:0|[1-9]\d?|1[0-1]\d|120)$/;
let emailPattern = /^[a-zA-Z0-9._%+-]+@csu\.fullerton\.edu$/;




const RegisterScreen = ({navigation}) => {
  const [legalName, setLegalName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setConfirmation] = useState('')
  const [userAge, setAge] = useState(-1)
  const [userSex, setSex] = useState('')

  const updateLegalName = (name) => {
    if (name.length > 0) {
     setLegalName(name)
    }
}

  const updateUsername = (user) => {
     if (user.length > 8) {
      setUsername(user)
     } else {
      console.log("Username must be at least 8 characters in length")
     }
  }

  const updateEmail = (email) => {
    if (emailPattern.test(email)){
     setEmail(email)
    } else {
      console.log("Email must contain a csu.fullerton.edu domain to register with this app.")
    }
  }

  const updatePassword = (password) => {
    if (passwordPattern.test(password)) {
        setPassword(password)
    }else {
      console.log("Please ensure your password contains at least 8 characters, at least 1 capital, and at least 1 special character")
    }
}

const updateSex = (sex) => {
  if (sex.toUpperCase() == "M" || sex.toUpperCase() == "F") {
    setSex(sex)
  } else {
    console.log("Please Enter M or F")
  }
}

const updateAge = (user_age) => {
  if (agePattern.test(user_age)) {
    setAge(user_age)
  } else {
    console.log("Please Enter a valid age below 120")
  }
} 

const confrimPassword = (confirmation) => {
  if (confirmation == password) {
    setConfirmation(confirmation)
  } else {
    console.log("Please ensure your input matches with the previous password field.")
  }
}

const Login = () => {
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
      userName: username,
      age: userAge,
      email: email,
      password: password,
      sex: userSex,
      personName: legalName});
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
          <TextInput style = {styles.input}placeholder='Enter Legal Name' onChangeText={text => updateLegalName(text)}></TextInput>
          <TextInput style = {styles.input}placeholder='Enter Username' onChangeText={text => updateUsername(text)}></TextInput>
          <TextInput style = {styles.input}placeholder='Enter Email' onChangeText={text => updateEmail(text)}></TextInput>
          <TextInput style = {styles.input}placeholder='Enter Sex' onChangeText={text => updateSex(text)}></TextInput>
          <TextInput style = {styles.input}placeholder='Enter Age' onChangeText={text => updateAge(text)}></TextInput>
          <TextInput style = {styles.input}placeholder='Enter Password' onChangeText={text => updatePassword(text)}></TextInput>
          <TextInput style = {styles.input}placeholder='Re-Enter Password' onChangeText={text => confrimPassword(text)}></TextInput>
          </View>
          <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
            <View style = {styles.pressSpace}>
              <Pressable onPress={Login}>
              <Text style = {{color: "#24A0ED"}}>Login</Text>
               </Pressable>
            </View> 
            <View style = {styles.pressSpace}>
              <Pressable onPress ={Register} disabled = {legalName.length == 0 || username.length == 0 || email.length == 0 || userAge == -1 || userSex.length >= 2 || userSex.length < 0 || password.legnth == 0 || passwordConfirmation == 0}>
                <Text style = {{color: "#24A0ED"}}>Register</Text>
              </Pressable>
            </View>
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

  //margin was originally 10
  pressSpace: {
    backgroundColor: "#EDFFD6",
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    width: 94,
    height: 23,
    justifyContent: 'center',
    marginHorizontal: 10,
    top: 90
  },

  TextInputContainer: {
    top: 30, 
    width: 300,
    height: 40,
    rowGap: 10,
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
    top: 100
  },

})
export default RegisterScreen;




