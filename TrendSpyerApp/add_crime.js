import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function CrimeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Crime Screen</Text>
      {/* Add your profile content here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CrimeScreen;

