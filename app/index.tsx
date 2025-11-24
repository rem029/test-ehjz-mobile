import { useAuth } from "@/hooks/useAuth";
import { useLogger } from "@/hooks/useLogger";
import { usePermissions } from "@/hooks/usePermissions";
import styles from "@/styles/home";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function Index() {
  const { user, isLoading, isInitialized, signOut } = useAuth();
  const { error: errorMsg } = useLogger();
  const {
    locationPermission,
    currentLocation,
    loadingLocation,
    notificationPermission,
    requestLocationPermission,
    requestNotificationPermission,
    sendLocationNotification,
  } = usePermissions();

  useEffect(() => {
    if (isInitialized && !user) {
      router.replace("/login");
    }
  }, [user, isInitialized]);

  useEffect(() => {
    requestLocationPermission();
    requestNotificationPermission();
  }, []);

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
            await errorMsg("Logout error:", error);
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

      <TouchableOpacity
        style={[
          styles.notificationButton,
          !currentLocation && styles.disabledButton,
        ]}
        onPress={sendLocationNotification}
        disabled={!currentLocation || !notificationPermission}
      >
        <Text style={styles.notificationButtonText}>
          📍 Send Location Notification
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
