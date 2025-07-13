// src/screens/MapScreen.tsx

import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../services/firebase'

type Request = {
  id: string
  title: string
  location: {
    lat: number
    lng: number
  }
}

export default function MapScreen() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequests = async () => {
      const snapshot = await getDocs(collection(db, 'requests'))
      const data: Request[] = snapshot.docs
        .map((doc) => {
          const { title, location } = doc.data()
          if (!location) return null
          return {
            id: doc.id,
            title,
            location,
          }
        })
        .filter(Boolean) as Request[]
      setRequests(data)
      setLoading(false)
    }

    fetchRequests()
  }, [])

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: requests[0]?.location.lat || -36.8485,
        longitude: requests[0]?.location.lng || 174.7633,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {requests.map((req) => (
        <Marker
          key={req.id}
          coordinate={{
            latitude: req.location.lat,
            longitude: req.location.lng,
          }}
        >
          <Callout>
            <View>
              <View style={{ padding: 4 }}>
                <View>
                  <Text>{req.title}</Text>
                </View>
              </View>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
