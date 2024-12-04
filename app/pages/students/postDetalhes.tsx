import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import api from "@/app/api";

const PostDetails: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Obtém o parâmetro dinâmico `id`
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar o post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#800020" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Post não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/pages/students/alunosPosts")} // Navega de volta para a lista de posts
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{post.title || "Sem título"}</Text>
      <Text style={styles.description}>
        {post.description || "Sem descrição"}
      </Text>
      <Text style={styles.content}>{post.content || "Sem conteúdo"}</Text>
      <Text style={styles.author}>Autor: {post.author || "Desconhecido"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1c1c1c",
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
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#800020",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#d3d3d3",
    marginBottom: 10,
    lineHeight: 24,
  },
  content: {
    fontSize: 18,
    color: "#c9c9c9",
    marginBottom: 20,
    lineHeight: 26,
  },
  author: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "right",
    fontStyle: "italic",
  },
});

export default PostDetails;
