import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import api from "@/app/api";

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const cardWidth = screenWidth / numColumns - 15;

const AlunosPost: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data.data);
      setFilteredPosts(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredPosts(results);
  }, [searchTerm, posts]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPost = ({ item }: { item: any }) => (
    <View style={styles.postCard}>
      <Text style={styles.postTitle}>{item.title || "Sem título"}</Text>
      <Text style={styles.postDescription}>
        {item.description || "Sem descrição"}
      </Text>
      <Text style={styles.postAuthor}>
        Autor: {item.author || "Desconhecido"}
      </Text>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() =>
          router.push({
            pathname: "/pages/students/postDetalhes",
            params: { id: item.id },
          })
        }
      >
        <Text style={styles.buttonText}>Visualizar</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#800020" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar por título, descrição ou autor..."
        placeholderTextColor="#aaa"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
        numColumns={numColumns}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum post encontrado</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#1c1c1c",
  },
  searchBar: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#800020",
    color: "#ffffff",
    backgroundColor: "#333333",
    marginBottom: 20,
  },
  postCard: {
    flex: 1,
    backgroundColor: "#2e2e2e",
    padding: 15,
    borderRadius: 8,
    margin: 5,
    width: cardWidth,
    alignItems: "center",
  },
  postTitle: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 14,
    color: "#c9c9c9",
    marginBottom: 5,
  },
  postAuthor: {
    fontSize: 14,
    color: "#d3d3d3",
    fontStyle: "italic",
  },
  viewButton: {
    backgroundColor: "#800020",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    textTransform: "uppercase",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#800020",
    fontSize: 18,
  },
  emptyText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

export default AlunosPost;
