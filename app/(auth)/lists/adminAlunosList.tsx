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
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import DeleteModal from "../../../components/DeleteModal";

const PostAlunos: React.FC = () => {
  const [alunos, setAlunos] = useState<any[]>([]);
  const [selectedAluno, setselectedAluno] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Detecta o tamanho da tela
  useEffect(() => {
    const updateScreenSize = () => {
      const { width } = Dimensions.get("window");
      setIsMobile(width < 640); // Considere telas menores que 640px como mobile
    };
  
    updateScreenSize(); // Verifica no início
    const subscription = Dimensions.addEventListener("change", updateScreenSize);
  
    return () => {
      subscription?.remove(); // Remove listener corretamente
    };
  }, []);

  

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

  const handleViewAluno = (id: number, action: string) => {
    router.push({
      pathname: `../teachers/manageStudent`,
      params: { id, action },
    });
  };

  const handleDeleteAluno = async (id: number) => {
    try {
      await api.delete(`/students/${id}`);
      setAlunos((prevAlunos) => prevAlunos.filter((aluno) => aluno.id !== id));
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
          onPress={() => handleViewAluno(item.id, "edit")}
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
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <Text style={styles.title}>Alunos</Text>

      {isMobile ? (
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
      ) : (
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
      )}

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
    width: "100%",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2e2e2e",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    minWidth: 120,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    minWidth: 120,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#0d54c0",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: "#800020",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PostAlunos;
