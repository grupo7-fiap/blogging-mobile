import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import api from "@/app/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import DeleteModal from "../../../components/DeleteModal";

const ProfessoresList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Detecta o tamanho da tela
  useEffect(() => {
    const updateScreenSize = () => {
      const { width } = Dimensions.get("window");
      setIsMobile(width < 500); // Considere telas menores que 500px como mobile
    };

    updateScreenSize(); // Verifica no início
    const subscription = Dimensions.addEventListener(
      "change",
      updateScreenSize,
    );

    return () => {
      subscription?.remove(); // Remove listener corretamente
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await api.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleViewUser = (id: number, action: string) => {
    router.push({
      pathname: `../teachers/manageTeacher`,
      params: { id, action },
    });
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prevProfessores) =>
        prevProfessores.filter((professor) => professor.id !== id),
      );
      setSelectedUser(null);
    } catch (error) {
      console.error("Erro ao deletar o professor:", error);
    }
  };

  const renderProfessor = ({ item }: { item: any }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.username || "Sem Nome"}</Text>
      <Text style={styles.cell}>
        {item.created_at
          ? new Date(item.created_at).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "Sem data"}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleViewUser(item.id, "edit")}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setSelectedUser(item.id)}
        >
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Navbar
        title="Professores"
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <Text style={styles.title}>Professores</Text>

      {isMobile ? (
        <ScrollView horizontal>
          <View>
            <View style={styles.tableHeader}>
              <Text style={styles.headerCell}>Nome</Text>
              <Text style={styles.headerCell}>Data De Cadastro</Text>
              <Text style={styles.headerCell}>Ações</Text>
            </View>

            <FlatList
              data={users}
              renderItem={renderProfessor}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </ScrollView>
      ) : (
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Nome</Text>
            <Text style={styles.headerCell}>Data De Cadastro</Text>
            <Text style={styles.headerCell}>Ações</Text>
          </View>

          <FlatList
            data={users}
            renderItem={renderProfessor}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}

      {selectedUser && (
        <DeleteModal
          Id={selectedUser}
          onConfirm={handleDeleteUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2e2e2e",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    minWidth: 120, // Define uma largura mínima para cada coluna
  },
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    minWidth: 125, // Define uma largura mínima para cada célula
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  editButton: {
    backgroundColor: "#0d54c0",
    paddingHorizontal: 15,
    borderRadius: 4,
    marginRight: 5,
    minWidth: 80, // Largura mínima consistente
    height: 40, // Altura fixa
    justifyContent: "center", // Centraliza o texto verticalmente
    alignItems: "center", // Centraliza o texto horizontalmente
  },
  deleteButton: {
    backgroundColor: "#800020",
    paddingHorizontal: 15,
    marginRight: 70,
    borderRadius: 4,
    minWidth: 80, // Largura mínima consistente
    height: 40, // Altura fixa
    justifyContent: "center", // Centraliza o texto verticalmente
    alignItems: "center", // Centraliza o texto horizontalmente
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProfessoresList;
