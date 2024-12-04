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
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import DeleteModal from "../../../components/DeleteModal";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Detecta o tamanho da tela
  useEffect(() => {
    const updateScreenSize = () => {
      const { width } = Dimensions.get("window");
      setIsMobile(width < 768); // Considere telas menores que 768px como mobile
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
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleViewPost = (id: number, action: string) => {
    router.push({
      pathname: `../teachers/managePosts`,
      params: { id, action },
    });
  };

  const handleDeletePost = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await api.delete(`/posts/admin/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      console.log(setPosts);
      setSelectedPost(null);
    } catch (error) {
      console.error("Erro ao deletar o post:", error);
    }
  };

  const renderPost = ({ item }: { item: any }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.title || "Sem título"}</Text>
      <Text style={styles.cell}>{item.description || "Sem descrição"}</Text>
      <Text style={styles.cell}>{item.author || "Sem autor"}</Text>
      <Text style={styles.cell}>{item.subject || "Sem tema"}</Text>
      <Text style={styles.cell}>
        {item.createdDate
          ? new Date(item.createdDate).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "Sem data"}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleViewPost(item.id, "edit")}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setSelectedPost(item.id)}
        >
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Navbar
        title="Postagens"
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <Text style={styles.title}>Postagens</Text>

      {isMobile ? (
        <ScrollView horizontal>
          <View>
            <View style={styles.tableHeader}>
              <Text style={styles.headerCell}>Título</Text>
              <Text style={styles.headerCell}>Descrição</Text>
              <Text style={styles.headerCell}>Autor</Text>
              <Text style={styles.headerCell}>Tema</Text>
              <Text style={styles.headerCell}>Data</Text>
              <Text style={styles.headerCell}>Ações</Text>
            </View>

            <FlatList
              data={posts}
              renderItem={renderPost}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </ScrollView>
      ) : (
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Título</Text>
            <Text style={styles.headerCell}>Descrição</Text>
            <Text style={styles.headerCell}>Autor</Text>
            <Text style={styles.headerCell}>Tema</Text>
            <Text style={styles.headerCell}>Data</Text>
            <Text style={styles.headerCell}>Ações</Text>
          </View>

          <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}

      {selectedPost && (
        <DeleteModal
          Id={selectedPost}
          onConfirm={handleDeletePost}
          onClose={() => setSelectedPost(null)}
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
    minWidth: 120,
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
    minWidth: 120,
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
    minWidth: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#800020",
    paddingHorizontal: 15,
    borderRadius: 4,
    minWidth: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PostList;
