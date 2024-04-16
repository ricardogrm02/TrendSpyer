import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const UpdatePersonalInfoScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdate = () => {
    // Here you would typically handle the update logic,
    // such as sending data to a backend server
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
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
      />
      <Button mode="contained" onPress={handleUpdate} style={styles.button}>
        Update Info
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default UpdatePersonalInfoScreen;
