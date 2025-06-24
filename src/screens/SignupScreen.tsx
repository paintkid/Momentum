import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from "react-native";

import { supabase } from "../supabase";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../navigation/AuthNavigator";

type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, "Signup">;

const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      Alert.alert("Signup Error", error.message);
    } else {
      Alert.alert(
        "Success!",
        "Please check your email for a confirmation link to complete your registration."
      );
      navigation.navigate("Login");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Momentum</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        editable={!loading}
      />
      <Button
        title={loading ? "Signing Up..." : "Sign Up"}
        onPress={handleSignup}
        disabled={loading}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  linkText: {
    color: "blue",
    textAlign: "center",
    marginTop: 20,
  },
});

export default SignupScreen;
