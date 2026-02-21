import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

interface SettingItem {
  id: string;
  label: string;
  icon: string;
  onPress: () => void;
}

export default function SettingsScreen() {
  const router = useRouter();

  const settings: SettingItem[] = [
    {
      id: '1',
      label: 'Account Settings',
      icon: 'account-circle',
      onPress: () => {},
    },
    {
      id: '2',
      label: 'Email Preferences',
      icon: 'mail-outline',
      onPress: () => {},
    },
    {
      id: '3',
      label: 'Notifications',
      icon: 'notifications',
      onPress: () => {},
    },
    {
      id: '4',
      label: 'Privacy & Security',
      icon: 'lock-outline',
      onPress: () => {},
    },
    {
      id: '5',
      label: 'About',
      icon: 'info-outline',
      onPress: () => {},
    },
  ];

  const handleLogout = () => {
    // TODO: Implement logout logic
    router.replace('/(auth)/');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarText}>U</Text>
        </View>
        <Text style={styles.profileName}>User Account</Text>
        <Text style={styles.profileEmail}>user@example.com</Text>
      </View>

      <View style={styles.settingsList}>
        {settings.map((setting) => (
          <TouchableOpacity
            key={setting.id}
            style={styles.settingItem}
            onPress={setting.onPress}
          >
            <MaterialIcons name={setting.icon as any} size={24} color="#007AFF" />
            <Text style={styles.settingLabel}>{setting.label}</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    backgroundColor: '#fff',
    paddingVertical: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#999',
  },
  settingsList: {
    backgroundColor: '#fff',
    marginTop: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    marginHorizontal: 16,
    marginVertical: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
