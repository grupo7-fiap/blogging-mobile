import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigationState } from "@react-navigation/native";
import { useRouter } from "expo-router";

import Icon from "react-native-vector-icons/MaterialIcons";

interface NavbarProps {
  title: string;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ title, sidebarOpen, toggleSidebar }) => {
  const router = useRouter();

  // Obtém a rota atual
  const currentRoute = useNavigationState((state) => state.routes[state.index]?.name);

  const handleCreate = (action: string) => {
    // Define a rota correta com base na rota atual
    let targetRoute = "";
    if (currentRoute === "lists/adminPostList") {
      targetRoute = "../teachers/managePosts";
    } else if (currentRoute === "lists/adminAlunosList") {
      targetRoute = "../teachers/manageStudent";
    } else if (currentRoute === "lists/adminProfessoresList") {
      targetRoute = "../teachers/manageTeacher";
    }

    // Redireciona apenas se a rota foi definida
    if (targetRoute) {
      router.push({
        pathname: targetRoute,
        params: { action },
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão do menu hambúrguer ou "X" */}
      {sidebarOpen ? (
        <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
          <Text style={styles.iconText}>X</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={toggleSidebar} style={styles.hamburgerIcon}>
          <Icon name="menu" size={24} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Título */}
      <Text style={styles.title}>{title}</Text>

      {/* Botão de criar */}
      <TouchableOpacity onPress={() => handleCreate("create")} style={styles.actionButton}>
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    backgroundColor: "#2e2e2e",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    position: "absolute",
    top: 0,
    zIndex: 100,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  hamburgerIcon: {
    position: "absolute",
    left: 10,
    zIndex: 102,
  },
  closeButton: {
    position: "absolute",
    left: 10,
    zIndex: 102,
  },
  iconText: {
    fontSize: 24,
    color: "#fff",
  },
  actionButton: {
    position: "absolute",
    backgroundColor: "#0d54c0",
    right: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Navbar;
