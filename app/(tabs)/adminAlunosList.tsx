import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import api from "../api";

// Importação da Navbar, Sidebar e DeleteModal
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import DeleteModal from "../../components/DeleteModal";

const PostAlunos: React.FC = () => {
  const [alunos, setAlunos] = useState<any[]>([]);
  const [selectedAluno, setselectedAluno] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await api.get("/students");
        setAlunos(response.data);
      } catch (error) {
        console.error("Erro ao buscar Aluno:", error);
      }
    };

    fetchAlunos();
  }, []);

  const handleViewAluno = (id: number) => {
    //router.push(`/manage?action=edit&id=${id}`);
  };

  const handleDeleteAluno = async (id: number) => {
    try {
      await api.delete(`/students/${id}`);
      setAlunos((prevAlunos) => prevAlunos.filter((aluno) => aluno.id !== id));
      console.log(selectedAluno);
      setselectedAluno(null);
    } catch (error) {
      console.error("Erro ao deletar o Aluno:", error);
    }
  };

  const renderAlunos = ({ item }: { item: any }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.username || "Sem Nome"}</Text>
      <Text style={styles.cell}>{item.email || "Sem Email"}</Text>
      <Text style={styles.cell}>{item.cpf || "Sem CPF"}</Text>
      <Text style={styles.cell}>
        {item.created_at
          ? new Date(item.created_at).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "Sem Data"}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleViewAluno(item.id)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setselectedAluno(item.id)}
        >
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Navbar
        title="Alunos"
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <Text style={styles.title}>Alunos</Text>

      {/* ScrollView horizontal para a tabela */}
      <ScrollView horizontal>
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Nome</Text>
            <Text style={styles.headerCell}>Email</Text>
            <Text style={styles.headerCell}>CPF</Text>
            <Text style={styles.headerCell}>Data De Cadastro</Text>
            <Text style={styles.headerCell}>Ações</Text>
          </View>

          <FlatList
            data={alunos}
            renderItem={renderAlunos}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>

      {selectedAluno && (
        <DeleteModal
          Id={selectedAluno}
          onConfirm={handleDeleteAluno}
          onClose={() => setselectedAluno(null)}
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
    paddingVertical: 10,
    paddingHorizontal: 5,
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
    minWidth: 120, // Define uma largura mínima para cada célula
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

export default PostAlunos;
