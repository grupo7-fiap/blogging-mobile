import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Text, View } from "@/components/Themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.styledButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.mainText}>PROFESSORES E FUNCIONÁRIOS</Text>
          <View style={styles.divider} />
          <Text style={styles.buttonText}>
            Acesse o portal de professores e funcionários
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.styledButton}
          onPress={() => navigation.navigate("TabFlow2")}
        >
          <Text style={styles.mainText}>ALUNOS</Text>
          <View style={styles.divider} />
          <Text style={styles.buttonText}>Acesse o portal de estudantes</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    backgroundColor: "#111111",
  },

  styledButton: {
    backgroundColor: "#800020",
    color: "white",
    borderWidth: 0,
    width: 360,
    height: 180,
    paddingVertical: 20,
    paddingHorizontal: 40,
    fontSize: 24,
    marginHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    cursor: "pointer",
  },

  divider: {
    width: "100%",
    borderTopWidth: 2,
    borderTopColor: "#ddd",
    marginVertical: 10,
  },

  mainText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  buttonText: {
    fontSize: 18,
    color: "#ddd",
  },
});
