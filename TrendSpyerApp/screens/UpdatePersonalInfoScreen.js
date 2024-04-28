import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios'
let emailPattern = /^[a-zA-Z0-9._%+-]+@csu\.fullerton\.edu$/;

const UpdatePersonalInfoScreen = () => {
  const [name, setName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [previousEmail, setPreviousEmail] = useState('');
  


  const handleUpdate = async () => {
    if (newEmail != confirmEmail) {
      alert('Emails do not match!');
      setConfirmEmail('')
      setNewEmail('')
      return;
    } 

    if (!emailPattern.test(newEmail)) {
      alert('Email must be a valid csu.fullerton.edu email.')
      return;
    }

    try {
      const response = await axios.patch('http://10.0.2.2:3000/api/user/update/profile', {oldEmail: previousEmail, email: newEmail, PersonName: name})
      alert("Updated Profile Infomration Successfuly!")
      console.log(response)
    } catch (error) {
      alert("Error Could Not Update Profile Information...")
    }
   
    console.log('Updated Info:', { name, email });
    alert('Info Updated Successfully!');
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
        mode="outlined"
        style={styles.input}
        theme={{ colors: { primary: '#1E90FF', underlineColor: 'transparent', background: '#fff' } }}
      />

      <TextInput
        label="Enter Previous Email"
        value={previousEmail}
        onChangeText={text => setPreviousEmail(text)}
        mode="outlined"
        style={styles.input}
        theme={{ colors: { primary: '#1E90FF', underlineColor: 'transparent', background: '#fff' } }}
      />
        <TextInput
        label="Enter New Email"
        value={newEmail}
        onChangeText={text => setNewEmail(text)}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        theme={{ colors: { primary: '#1E90FF', underlineColor: 'transparent', background: '#fff' } }}
      />
      <TextInput
        label="Confirm New Email"
        value={confirmEmail}
        onChangeText={text => setConfirmEmail(text)}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        theme={{ colors: { primary: '#1E90FF', underlineColor: 'transparent', background: '#fff' } }}
      />

      <Button mode="contained" onPress={handleUpdate} style={styles.button} disabled = {name.length == 0 || newEmail.length == 0 || confirmEmail.length == 0|| previousEmail.length == 0}>
        Update Info
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#333', // Dark gray background
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff', // Ensure background color for input is white for better readability
  },
  button: {
    marginTop: 10,
  },
});

export default UpdatePersonalInfoScreen;
