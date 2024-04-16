import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { List, Divider, Switch } from 'react-native-paper';

const SettingsScreen = ({ navigation }) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      <List.Section>
        <List.Subheader style={styles.subheader}>Settings</List.Subheader>
        <List.Item
          title="Notifications"
          titleStyle={styles.title}
          right={() => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color="#6200ee" />}
          style={styles.listItem}
        />
        <Divider style={styles.divider} />
        <List.Item
          title="Change Password"
          titleStyle={styles.title}
          left={props => <List.Icon {...props} icon="lock" color="#fff" />}
          onPress={() => navigation.navigate('ChangePassword')}
          style={styles.listItem}
        />
        <Divider style={styles.divider} />
        <List.Item
          title="Update Personal Info"
          titleStyle={styles.title}
          left={props => <List.Icon {...props} icon="account-edit" color="#fff" />}
          onPress={() => navigation.navigate('UpdatePersonalInfo')}
          style={styles.listItem}
        />
        <Divider style={styles.divider} />
        <List.Item
          title="Log Out"
          titleStyle={styles.title}
          left={props => <List.Icon {...props} icon="logout" color="#fff" />}
          onPress={() => {/* handle logout logic here */}}
          style={styles.listItem}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',  // Dark gray background for the whole container
    paddingHorizontal: 10,
  },
  subheader: {
    fontSize: 18,
    color: '#fff',  // White color for text for better visibility
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#444',  // Slightly lighter gray for the subheader background
  },
  title: {
    fontSize: 16,
    fontWeight: '500',  // Medium font weight for better readability
    color: '#fff',  // White color for list item text
  },
  listItem: {
    backgroundColor: '#2a2a2a',  // Very dark gray for list items
    paddingVertical: 12,  // Increased vertical padding for better touchability
    marginVertical: 4,
    borderRadius: 5,
    elevation: 2,  // More pronounced shadow for a depth effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  divider: {
    backgroundColor: '#484848',  // Dark divider for subtle separation
  },
});

export default SettingsScreen;
