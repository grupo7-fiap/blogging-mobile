import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { AlunosStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import api from "../api";

type PostDetailsRouteProp = RouteProp<AlunosStackParamList, "postDetalhes">;

type NavigationProps = NativeStackNavigationProp<
  AlunosStackParamList,
  "postDetalhes"
>;

const PostDetails: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProps>();
  const { id } = route.params as { id: number };
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar o post:", error);
        setLoading(false);
      }
    };

    fetchPost();
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
        onPress={() => navigation.navigate("alunosPosts")}
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
    color: "#800020",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#4d4d4d",
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
    color: "#800020",
    textAlign: "right",
    fontStyle: "italic",
  },
});

export default PostDetails;
