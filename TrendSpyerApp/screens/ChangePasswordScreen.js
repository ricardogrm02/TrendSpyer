import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import bcrypt from 'react-native-bcrypt'

let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/

const ChangePasswordScreen = () => {
  const [accountUserName, setUsername] = useState('')
  const [prevPassword, setPrevPassword] = useState('')
  const [newPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updatePassword = async () => {
    if (!passwordPattern.test(newPassword)) {
      alert('New password MUST be at least 8 characters in length, contain a least one capital letter, and a special chracter')
      return
    }

    if (newPassword != confirmPassword) {
      alert("Passwords do not match")
      return
    }

    // Here you would typically call a backend service to update the password
    try{
      // const secureOldPassword = await bcrypt.hash(prevPassword, 15)
      // const secureNewPassword = await bcrypt.hash(newPassword, 15)
      const response = await axios.patch('http://10.0.2.2:3000/api/user/update/password', {username: accountUserName, oldPassword: prevPassword, password: newPassword})
      alert (`Your password was update successfuly, ${response.data.personName}`)
    } catch (error) {
      console.log(error)
      alert('Error could not update password')
    
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

    
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        secureTextEntry={false}
        onChangeText={setUsername}
        value={accountUserName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter old password"
        secureTextEntry={true}
        onChangeText={setPrevPassword}
        value={prevPassword}
      />


      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={newPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm new password"
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      <Button mode = "contained" title="Update Password" onPress={updatePassword} disabled = {prevPassword.length == 0 || newPassword.length == 0 || confirmPassword.length == 0 || accountUserName.length == 0}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#333', // Dark gray background
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default ChangePasswordScreen;
