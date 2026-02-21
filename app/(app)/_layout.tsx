import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#007AFF',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="mail" color={color} size={size} />
          ),
          headerTitle: 'Email AI Assistant',
        }}
      />
      <Tabs.Screen
        name="compose"
        options={{
          title: 'Compose',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="edit" color={color} size={size} />
          ),
          headerTitle: 'Compose Email',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
          headerTitle: 'Settings',
        }}
      />
    </Tabs>
  );
}
