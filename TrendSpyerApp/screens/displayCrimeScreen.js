import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper'; // Importing Button from react-native-paper
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
                console.log("Error data:", error.response.data);
                console.log("Status code:", error.response.status);
                console.log("Headers:", error.response.headers);
                alert(`Failed to fetch reports: Received status code ${error.response.status}`);
            } else if (error.request) {
                console.log("Error request:", error.request);
                alert("Failed to fetch reports: No response from the server");
            } else {
                console.log("Error message:", error.message);
                alert(`Failed to fetch reports: ${error.message}`);
            }
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Crime Reports</Text>
            <Button
                mode="contained" // Button style is contained which uses the primary color
                onPress={fetchReports}
                style={styles.button}
                color="#1E90FF" // This can be adjusted if you use theme colors
            >
                Load Reports
            </Button>
            {reports.map((report, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.reportTitle}>{report.crime}</Text>
                    <Text style={styles.text}>Tag: {report.tag}</Text>
                    <Text style={styles.text}>Date: {new Date(report.reportDate).toLocaleDateString()}</Text>
                    <Text style={styles.text}>Category: {report.category}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#333', // Dark gray background
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff', // White color for the title for better visibility
    },
    button: {
        marginBottom: 20,
        paddingVertical: 8, // Increase padding for better touch area
    },
    card: {
        backgroundColor: '#424242', // Slightly lighter gray for cards to create depth
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
        color: '#fff', // White color for text for better visibility
    },
    text: {
        fontSize: 16,
        color: '#ccc', // Lighter gray color for other text to ensure readability
    },
});

export default DisplayCrimeScreen;
