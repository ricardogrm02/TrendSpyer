// DataScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

const DataScreen = () => {
  const [data, setData] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/data');
      const json = await response.json();
      setData(json.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <Text>{data}</Text>
      <Button title="Refresh" onPress={fetchData} />
    </View>
  );
};

export default DataScreen;
