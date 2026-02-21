import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useCallback } from 'react';
import { useEmailAccounts } from '../../hooks/useEmailManager';

interface SettingItem {
  id: string;
  label: string;
  icon: string;
  onPress: () => void;
}

export default function SettingsScreen() {
  const router = useRouter();
  const { accounts, loading, addAccount, removeAccount, loadAccounts } = useEmailAccounts();
  const [selectedProvider, setSelectedProvider] = useState<'gmail' | 'outlook' | 'yahoo' | null>(null);

  // Load accounts when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadAccounts();
    }, [loadAccounts])
  );

  const handleAddAccount = async (provider: 'gmail' | 'outlook' | 'yahoo') => {
    try {
      const email = `user@${provider === 'gmail' ? 'gmail.com' : provider === 'outlook' ? 'outlook.com' : 'yahoo.com'}`;
      await addAccount(email, provider);
      Alert.alert('Success', `Account added: ${email}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to add account');
    }
  };

  const handleRemoveAccount = (accountId: string, email: string) => {
    Alert.alert(
      'Remove Account',
      `Are you sure you want to remove ${email}?`,
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Remove',
          onPress: async () => {
            await removeAccount(accountId);
            Alert.alert('Success', 'Account removed');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure?',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Sign Out',
          onPress: () => router.replace('/(auth)/'),
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarText}>U</Text>
        </View>
        <Text style={styles.profileName}>Email AI Assistant</Text>
        <Text style={styles.profileEmail}>{accounts.length} account(s) connected</Text>
      </View>

      {/* Connected Accounts */}
      {accounts.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connected Accounts</Text>
          {accounts.map((account) => (
            <View key={account.id} style={styles.accountItem}>
              <View style={styles.accountInfo}>
                <Text style={styles.accountEmail}>{account.email}</Text>
                <Text style={styles.accountProvider}>{account.provider.toUpperCase()}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleRemoveAccount(account.id, account.email)}
                style={styles.removeButton}
              >
                <MaterialIcons name="delete" size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Add Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Email Account</Text>
        <TouchableOpacity
          style={styles.providerButton}
          onPress={() => handleAddAccount('gmail')}
          disabled={loading}
        >
          <MaterialIcons name="mail" size={24} color="#EA4335" />
          <Text style={styles.providerButtonText}>Gmail</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.providerButton}
          onPress={() => handleAddAccount('outlook')}
          disabled={loading}
        >
          <MaterialIcons name="mail" size={24} color="#0078D4" />
          <Text style={styles.providerButtonText}>Outlook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.providerButton}
          onPress={() => handleAddAccount('yahoo')}
          disabled={loading}
        >
          <MaterialIcons name="mail" size={24} color="#6B21A8" />
          <Text style={styles.providerButtonText}>Yahoo</Text>
        </TouchableOpacity>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="notifications" size={24} color="#007AFF" />
          <Text style={styles.settingLabel}>Notifications</Text>
          <MaterialIcons name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="lock-outline" size={24} color="#007AFF" />
          <Text style={styles.settingLabel}>Privacy & Security</Text>
          <MaterialIcons name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="info-outline" size={24} color="#007AFF" />
          <Text style={styles.settingLabel}>About</Text>
          <MaterialIcons name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sign Out</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>EmailAI v1.0.0</Text>
        <Text style={styles.footerSubtext}>Backend: http://localhost:5000</Text>
      </View>
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
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    marginHorizontal: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginLeft: 0,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  accountInfo: {
    flex: 1,
  },
  accountEmail: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  accountProvider: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  removeButton: {
    padding: 8,
  },
  providerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  providerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
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
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});
