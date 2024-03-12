import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';

const DataScreen = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      // Replace 'your-ip-address' with your computer's local IP address or use '10.0.2.2' for Android emulators
      const response = await fetch('http://10.0.2.2:3000/data');
      const json = await response.json();
      setData(json); // Assuming json is an array of objects
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView>
      <View>
        {data.map((user, index) => (
          <View key={index} style={{ padding: 10 }}>
            <Text>Username: {user.username}</Text>
            <Text>Age: {user.age}</Text>
          </View>
        ))}
        <Button title="Refresh" onPress={fetchData} />
      </View>
    </ScrollView>
  );
};

export default DataScreen;
