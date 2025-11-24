import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    try {
      await signIn({
        email: email.toLowerCase().trim(),
        password,
      });

      router.replace("/");
    } catch (error: any) {
      Alert.alert("Login Error", error.message || "Failed to login");
    }
  };

  return (
    <LinearGradient
      colors={["#0a0a0a", "#1a1a2e", "#16213e"]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            <View style={styles.glowEffect} />

            <Text style={styles.title}>WELCOME BACK</Text>
            <View style={styles.titleUnderline} />
            <Text style={styles.subtitle}>Enter the matrix</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="user@domain.com"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>PASSWORD</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#666"
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.disabledButton]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#00d4ff", "#0099ff", "#0066ff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                {isLoading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.loginButtonText}>SIGN IN</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>New user? </Text>
              <Link href="/register" style={styles.registerLink}>
                <Text style={styles.registerLinkText}>CREATE ACCOUNT</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  formContainer: {
    backgroundColor: "rgba(26, 26, 46, 0.95)",
    borderRadius: 20,
    padding: 32,
    borderWidth: 1,
    borderColor: "rgba(0, 212, 255, 0.2)",
    position: "relative",
    overflow: "hidden",
  },
  glowEffect: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(0, 153, 255, 0.1)",
    opacity: 0.5,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    color: "#ffffff",
    fontFamily: Platform.OS === "ios" ? "System" : "Poppins-Bold",
    letterSpacing: 2,
  },
  titleUnderline: {
    width: 60,
    height: 3,
    backgroundColor: "#00d4ff",
    alignSelf: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 40,
    color: "#00d4ff",
    fontFamily: Platform.OS === "ios" ? "System" : "Poppins-Regular",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 10,
    color: "#00d4ff",
    fontFamily: Platform.OS === "ios" ? "System" : "Poppins-SemiBold",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: "rgba(0, 212, 255, 0.3)",
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    overflow: "hidden",
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: "#ffffff",
    fontFamily: Platform.OS === "ios" ? "System" : "Poppins-Regular",
  },
  loginButton: {
    borderRadius: 12,
    marginTop: 16,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#00d4ff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradientButton: {
    padding: 18,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "System" : "Poppins-Bold",
    letterSpacing: 2,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    color: "#999",
    fontFamily: Platform.OS === "ios" ? "System" : "Poppins-Regular",
  },
  registerLink: {
    fontSize: 14,
  },
  registerLinkText: {
    color: "#00d4ff",
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "System" : "Poppins-Bold",
    letterSpacing: 1,
  },
});
