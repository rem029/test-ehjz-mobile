import { useAuth } from "@/hooks/useAuth";
import { useLogger } from "@/hooks/useLogger";
import { usePermissions } from "@/hooks/usePermissions";
import { useAuthStore } from "@/stores/auth";
import { COLORS, globalStyles } from "@/styles";
import styles from "@/styles/home";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
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
  const { signOut } = useAuth();
  const { user, isLoading, isInitialized, profile } = useAuthStore();
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
        <View style={styles.header_left}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>
            {profile?.full_name || user.email}
          </Text>
        </View>
        <View style={styles.header_right}>
          <Link
            href="/login"
            onPress={async (e) => {
              e.preventDefault();
              handleLogout();
            }}
            style={globalStyles.link}
          >
            <MaterialIcons name="logout" size={24} color={COLORS.primary} />
          </Link>
        </View>
      </View>

      <View style={styles.mapContainer}>
        {loadingLocation ? (
          <View style={styles.locationLoading}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={styles.locationLoadingText}>Getting location...</Text>
          </View>
        ) : locationPermission === "granted" && currentLocation ? (
          // 2. The Standard Google Map
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE} // Use the Native Google Engine
            initialRegion={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            <Marker
              coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
              }}
              title="You are here"
              description="Current Location"
            />
          </MapView>
        ) : (
          // Fallback UI
          <View style={styles.locationLoading}>
            <Text>Location permission needed.</Text>
            <TouchableOpacity onPress={requestLocationPermission}>
              <Text style={{ color: "blue" }}>Tap to Enable</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.actionsContainer}>
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
      </View>
    </View>
  );
}
