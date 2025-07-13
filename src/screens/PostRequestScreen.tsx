import * as Location from 'expo-location'
import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../services/firebase'
import { Banner } from 'react-native-paper'

export default function PostRequestScreen() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [showSuccessBanner, setShowSuccessBanner] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'We need your location to post requests on the map.')
      }
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({})
        setLocation({
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
        })
      }
    })()
  }, [])

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert('Please fill in both fields.')
      return
    }

    try {
      await addDoc(collection(db, 'requests'), {
        title,
        description,
        status: 'open',
        createdAt: serverTimestamp(),
        location,
      })
      Alert.alert('Request submitted!')
      setTitle('')
      setDescription('')
      setShowSuccessBanner(true)
    } catch (err: any) {
      Alert.alert('Error submitting request', err.message)
    }
  }

  return (
    <>
      {showSuccessBanner && (
        <Banner
          visible={showSuccessBanner}
          actions={[
            {
              label: 'Dismiss',
              onPress: () => setShowSuccessBanner(false),
            },
          ]}
          icon="check-circle"
        >
          ✅ Your request was posted successfully!
        </Banner>
      )}
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
    </>
  )
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
})
