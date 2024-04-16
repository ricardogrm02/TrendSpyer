import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ChangePasswordScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Change Password Screen</Text>
      {/* Implement your form and logic here */}
      <Button title="Update Password" onPress={() => console.log('Password Updated')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChangePasswordScreen;
