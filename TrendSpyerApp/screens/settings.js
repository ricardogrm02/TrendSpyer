import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Divider, Switch } from 'react-native-paper';

const SettingsScreen = ({ navigation }) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Settings</List.Subheader>
        <List.Item
          title="Notifications"
          right={() => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />}
        />
        <Divider />
        <List.Item
          title="Change Password"
          left={props => <List.Icon {...props} icon="lock-reset" />}
          onPress={() => navigation.navigate('ChangePassword')}
        />
        <Divider />
        <List.Item
          title="Update Personal Info"
          left={props => <List.Icon {...props} icon="account-edit" />}
          onPress={() => navigation.navigate('UpdatePersonalInfo')}
        />
        <Divider />
        <List.Item
          title="Log Out"
          left={props => <List.Icon {...props} icon="logout" />}
          onPress={() => {/* handle logout logic here */}}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SettingsScreen;
