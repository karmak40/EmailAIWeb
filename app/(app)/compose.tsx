import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function ComposeScreen() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSend = () => {
    // TODO: Implement send email logic
    console.log('Sending email:', { to, subject, body });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="To"
          placeholderTextColor="#ccc"
          value={to}
          onChangeText={setTo}
        />

        <TextInput
          style={styles.input}
          placeholder="Subject"
          placeholderTextColor="#ccc"
          value={subject}
          onChangeText={setSubject}
        />

        <TextInput
          style={[styles.input, styles.bodyInput]}
          placeholder="Compose message..."
          placeholderTextColor="#ccc"
          value={body}
          onChangeText={setBody}
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 12,
    paddingHorizontal: 0,
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  bodyInput: {
    minHeight: 200,
    marginBottom: 16,
    paddingVertical: 12,
    borderBottomWidth: 0,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
