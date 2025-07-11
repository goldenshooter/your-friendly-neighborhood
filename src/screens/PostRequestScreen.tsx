// src/screens/PostRequestScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function PostRequestScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert('Please fill in both fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'requests'), {
        title,
        description,
        status: 'open',
        createdAt: serverTimestamp(),
      });
      Alert.alert('Request submitted!');
      setTitle('');
      setDescription('');
    } catch (err: any) {
      Alert.alert('Error submitting request', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g., Need help carrying groceries"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Provide more details..."
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Submit Request" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 16,
    fontSize: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
});
