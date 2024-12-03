import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function AdminPostsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Admin Posts Screen</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("../teachers/managePosts")}
      >
        <Text style={styles.buttonText}>Manage Posts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("../teachers/manageStudent")}
      >
        <Text style={styles.buttonText}>Manage Student</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("../teachers/manageTeacher")}
      >
        <Text style={styles.buttonText}>Manage Teacher</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    width: "80%",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
