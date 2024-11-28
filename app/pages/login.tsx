import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function LoginComponent() {
  // const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //   const { setToken } = useAuth();

  const handleLogin = async () => {
    //     try {
    //       const response = await axios.post("http://localhost:3000/auth/login", {
    //         username,
    //         password,
    //       });
    //       // No React Native, use AsyncStorage ao invés de localStorage
    //       await AsyncStorage.setItem("token", response.data.token);
    //       setToken(response.data.token);
    //       navigation.navigate("AdminPosts", { action: "create" });
    //     } catch (error) {
    //       console.error("Login failed", error);
    //     }
  };

  const handleBack = () => {
    // navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Image
          source={require("../../assets/icons/backArrow.png")}
          style={styles.backIcon}
        />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.loginBox}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  loginBox: {
    backgroundColor: "#333",
    padding: 40,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    alignItems: "center",
    width: 350,
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#800020",
    borderRadius: 4,
    backgroundColor: "#222",
    color: "white",
  },
  button: {
    padding: 10,
    backgroundColor: "#800020",
    borderRadius: 4,
    marginTop: 20,
    width: 120,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    width: 26,
    height: 26,
    marginRight: 10,
  },
  backText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
