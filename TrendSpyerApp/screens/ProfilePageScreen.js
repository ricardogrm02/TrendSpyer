import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Switch } from 'react-native';
import { List, Avatar } from 'react-native-paper';

const ProfilePageScreen = ({ navigation }) => {
    const [userName, setUserName] = useState("John Doe");
    const [userReports, setUserReports] = useState([]);
    const [showReports, setShowReports] = useState(false);

    useEffect(() => {
        // Simulate fetching user data and reports
        setUserReports([
            { id: 1, title: 'Vandalism', date: '2024-04-14' },
            { id: 2, title: 'Theft', date: '2024-04-13' }
        ]);
    }, []);

    const toggleSwitch = () => setShowReports(!showReports);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileHeader}>
                <Avatar.Image 
                    size={100} 
                    source={{ uri: 'https://example.com/profile.jpg' }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>{userName}</Text>
            </View>
            <List.Section>
                <List.Subheader style={styles.subheader}>Settings</List.Subheader>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Show Reports</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#b6c1f2" }}
                        thumbColor={showReports ? "#819cff" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={showReports}
                    />
                </View>
                {showReports && userReports.map((report) => (
                    <List.Item
                        key={report.id}
                        title={report.title}
                        description={`Reported on: ${report.date}`}
                        left={props => <List.Icon {...props} icon="folder" color="#819cff" />}
                        titleStyle={styles.listTitle}
                        descriptionStyle={styles.listDescription}
                        style={styles.listItem}
                    />
                ))}
            </List.Section>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#333', // Dark gray background
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // White color for visibility
    },
    subheader: {
        fontSize: 18,
        fontWeight: '500',
        color: '#b6c1f2', // Soft blue for a gentle contrast
        paddingBottom: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#424242', // Slightly lighter gray for switch background
        borderRadius: 8,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    switchLabel: {
        fontSize: 16,
        fontWeight: '400',
        color: '#fff', // White color for label text for better visibility
    },
    listTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff', // White color for list item titles
    },
    listDescription: {
        fontSize: 14,
        color: '#ccc', // Light gray for descriptions for better visibility
    },
    listItem: {
        backgroundColor: '#2c2c2c', // Even darker shade for list items
        borderRadius: 8,
        marginVertical: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    }
});

export default ProfilePageScreen;
