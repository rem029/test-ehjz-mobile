import { useLogger } from "@/hooks/useLogger";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";

export const usePermissions = () => {
  const { error: errorMsg } = useLogger();
  const [locationPermission, setLocationPermission] = useState<string | null>(
    null
  );
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(false);

  useEffect(() => {
    // Configure notification behavior on mount
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  }, []);

  const requestNotificationPermission = async () => {
    try {
      console.log("Requesting notification permission...");
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      setNotificationPermission(finalStatus === "granted");

      if (finalStatus !== "granted") {
        Alert.alert(
          "Notification Permission",
          "Notification permission is required to receive location alerts."
        );
      }
    } catch (error) {
      await errorMsg("Error requesting notification permission:", error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      console.log("Requesting location permission...");
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
      await errorMsg("Error requesting location permission:", error);
    }
  };

  const getCurrentLocation = async () => {
    setLoadingLocation(true);
    try {
      console.log("Getting current location...");
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setCurrentLocation(location);
    } catch (error) {
      await errorMsg("Error getting location:", error);
      Alert.alert("Error", "Failed to get current location");
    } finally {
      setLoadingLocation(false);
    }
  };

  const sendLocationNotification = async () => {
    if (!notificationPermission) {
      console.log("Sending current location...");
      Alert.alert("Permission Required", "Please enable notifications first.");
      return;
    }

    if (!currentLocation) {
      Alert.alert(
        "Location Required",
        "Please wait for location to be fetched."
      );
      return;
    }

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Your Current Location 📍",
          body: `Latitude: ${currentLocation.coords.latitude.toFixed(
            6
          )}\nLongitude: ${currentLocation.coords.longitude.toFixed(6)}`,
          data: {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          },
        },
        trigger: null, // Send immediately
      });
    } catch (error) {
      await errorMsg("Error sending notification:", error);
      Alert.alert("Error", "Failed to send notification");
    }
  };

  return {
    locationPermission,
    currentLocation,
    loadingLocation,
    notificationPermission,
    requestLocationPermission,
    requestNotificationPermission,
    getCurrentLocation,
    sendLocationNotification,
  };
};
