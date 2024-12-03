import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Ou outra biblioteca de ícones


interface NavbarProps {
  title: string;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ title, sidebarOpen, toggleSidebar }) => {
  const navigation = useNavigation();

  const handleCreatePost = () => {
    navigation.navigate("Manage", { action: "create" });
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
          <Icon name="menu" size={24} color="#fff" /> {/* Substitua o nome do ícone conforme necessário */}
        </TouchableOpacity>
      )}


      {/* Título */}
      <Text style={styles.title}>{title}</Text>

      {/* Botão de criar */}
      <TouchableOpacity onPress={handleCreatePost} style={styles.actionButton}>
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
    position: "absolute", // Centraliza o título no eixo horizontal
    left: "50%",
    transform: [{ translateX: -50 }], // Corrige a centralização com base na largura
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

