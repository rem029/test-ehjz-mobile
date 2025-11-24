import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useAuth } from "../hooks/useAuth";

export default function Index() {
  const { user, isLoading, isInitialized, signOut } = useAuth();
  const [locationPermission, setLocationPermission] = useState<string | null>(
    null
  );
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    if (isInitialized && !user) {
      router.replace("/login");
    }
  }, [user, isInitialized]);

  useEffect(() => {
    if (user) {
      requestLocationPermission();
    }
  }, [user]);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);

      if (status !== "granted") {
        Alert.alert(
          "Location Permission",
          "Location permission is required for this app to function properly.",
          [
            {
              text: "OK",
              onPress: () => {
                // User can still use the app but with limited functionality
              },
            },
          ]
        );
      } else {
        // If permission granted, get current location
        getCurrentLocation();
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

  const getCurrentLocation = async () => {
    setLoadingLocation(true);
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setCurrentLocation(location);
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Failed to get current location");
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
            router.replace("/login");
          } catch (error: any) {
            console.error("Logout error:", error);
            Alert.alert("Error", "Failed to logout");
          }
        },
      },
    ]);
  };

  if (!isInitialized || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Email: {user.email}</Text>
      </View>

      {locationPermission && (
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            Location Permission:{" "}
            {locationPermission === "granted" ? "✓ Granted" : "✗ Denied"}
          </Text>
          {locationPermission !== "granted" && (
            <TouchableOpacity
              style={styles.permissionButton}
              onPress={requestLocationPermission}
            >
              <Text style={styles.permissionButtonText}>
                Request Permission
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {loadingLocation && (
        <View style={styles.locationLoading}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.locationLoadingText}>
            Getting your location...
          </Text>
        </View>
      )}

      {locationPermission === "granted" && currentLocation && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation
            showsMyLocationButton
          >
            <Marker
              coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
              }}
              title="You are here"
              description={`Lat: ${currentLocation.coords.latitude.toFixed(
                6
              )}, Lng: ${currentLocation.coords.longitude.toFixed(6)}`}
            />
          </MapView>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  permissionContainer: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  permissionText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  permissionButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 6,
    minWidth: 150,
    alignItems: "center",
  },
  permissionButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  locationLoading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  locationLoadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#666",
  },
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#dc3545",
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
