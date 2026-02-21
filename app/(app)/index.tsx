import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  timestamp: string;
}

const SAMPLE_EMAILS: Email[] = [
  {
    id: '1',
    from: 'hello@example.com',
    subject: 'Welcome to Email AI',
    preview: 'This is your first email in the assistant...',
    timestamp: 'Today',
  },
];

export default function InboxScreen() {
  const renderEmail = ({ item }: { item: Email }) => (
    <TouchableOpacity style={styles.emailItem}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>
          {item.from.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.emailContent}>
        <Text style={styles.from}>{item.from}</Text>
        <Text style={styles.subject} numberOfLines={1}>
          {item.subject}
        </Text>
        <Text style={styles.preview} numberOfLines={1}>
          {item.preview}
        </Text>
      </View>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {SAMPLE_EMAILS.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialIcons name="mail-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No emails yet</Text>
        </View>
      ) : (
        <FlatList
          data={SAMPLE_EMAILS}
          renderItem={renderEmail}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingVertical: 8,
  },
  emailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emailContent: {
    flex: 1,
  },
  from: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  subject: {
    fontSize: 13,
    color: '#333',
    marginBottom: 2,
  },
  preview: {
    fontSize: 12,
    color: '#999',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginLeft: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#999',
  },
});
