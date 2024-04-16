import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View, Button } from 'react-native';
import axios from 'axios';

const DisplayCrimeScreen = () => {
    const [reports, setReports] = useState([]);

    const fetchReports = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:3000/api/report/info');
            setReports(response.data);
        } catch (error) {
            console.log("Axios config:", error.config);
            if (error.response) {
                // The server responded with a status outside the range of 2xx
                console.log("Error data:", error.response.data);
                console.log("Status code:", error.response.status);
                console.log("Headers:", error.response.headers);
                alert(`Failed to fetch reports: Received status code ${error.response.status}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.log("Error request:", error.request);
                alert("Failed to fetch reports: No response from the server");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error message:", error.message);
                alert(`Failed to fetch reports: ${error.message}`);
            }
        }
    };
    
    

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Crime Reports</Text>
            <Button title="Load Reports" onPress={fetchReports} color="#1E90FF" />
            {reports.map((report, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.reportTitle}>{report.crime}</Text>
                    <Text>Tag: {report.tag}</Text>
                    <Text>Date: {new Date(report.reportDate).toLocaleDateString()}</Text>
                    <Text>Category: {report.category}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    reportTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default DisplayCrimeScreen;
