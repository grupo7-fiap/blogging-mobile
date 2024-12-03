import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api";
import { useRouter, useLocalSearchParams } from "expo-router";

const ManagePostComponent: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { action, id } = useLocalSearchParams();

  const subjects = [
    "Matemática",
    "Ciências",
    "História",
    "Geografia",
    "Literatura",
    "Esporte",
    "Saúde",
    "Artes",
    "Física",
    "Química",
    "Biologia",
    "Tecnologia",
    "Informática",
    "Economia",
    "Filosofia",
    "Sociologia",
    "Inglês",
    "Francês",
    "Espanhol",
    "Anúncios",
  ];

  useEffect(() => {
    setIsSaveDisabled(!(title && description && author && subject));

    const returnSelectPost = async () => {
      if (action === "edit" && id) {
        try {
          const response = await api.get(`/posts/${id}`);
          const post = response.data.data;
          setTitle(post.title);
          setDescription(post.description);
          setContent(post.content);
          setAuthor(post.author);
          setSubject(post.subject);
        } catch (error) {}
      }
    };
    returnSelectPost();
  }, [title, description, author, subject, id, action]);

  const handleSubmit = async () => {
    if (!isSaveDisabled) {
      if (action === "create") {
        await createPost();
        setShowCreateModal(false);
        resetForm();
        router.push("../lists/adminPostList");
      } else if (action === "edit") {
        await editPost();
        setShowCreateModal(false);
        resetForm();
        router.push("../lists/adminPostList");
      }
    } else {
      console.error(`Ação inválida: ${action}`);
    }
  };

  const createPost = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const body = {
        title,
        description,
        content,
        author,
        subject,
      };
      await api.post("/posts", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCreateSuccess(true);
    } catch (error) {
      console.error("Erro ao criar o post:", error);
      setCreateSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const editPost = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const body = {
        title,
        description,
        content,
        author,
        subject,
      };
      await api.put(`/posts/admin/update/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCreateSuccess(true);
    } catch (error) {
      console.error("Erro ao editar o post:", error);
      setCreateSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => setShowCreateModal(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setContent("");
    setAuthor("");
    setSubject("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#800020" />
      ) : (
        <View style={styles.form}>
          <Text style={styles.title}>
            {action === "create" ? "Criar Nova Postagem" : "Editar Postagem"}
          </Text>

          <View style={{ width: "60%", justifyContent: "center" }}>
            {/* Título */}
            <Text style={styles.label}>Título</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o título da postagem"
              value={title}
              onChangeText={setTitle}
            />

            {/* Descrição */}
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textareaDescription]}
              placeholder="Digite a descrição da postagem"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            {/* Conteúdo */}
            <Text style={styles.label}>Conteúdo</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Digite o conteúdo da postagem"
              value={content}
              onChangeText={setContent}
              multiline
            />

            {/* Autor */}
            <Text style={styles.label}>Autor</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o autor da postagem"
              value={author}
              onChangeText={setAuthor}
            />

            {/* Tema */}
            <Text style={styles.label}>Selecione um Tema</Text>
            <Picker
              selectedValue={subject}
              style={styles.picker}
              onValueChange={(itemValue) => setSubject(itemValue)}
            >
              <Picker.Item label="Selecione um tema" value="" />
              {subjects.map((subject) => (
                <Picker.Item key={subject} label={subject} value={subject} />
              ))}
            </Picker>

            {/* Botões */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton}>
                <Text style={styles.buttonText}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, isSaveDisabled && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={isSaveDisabled}
              >
                <Text style={styles.buttonText}>
                  {action === "create" ? "Criar" : "Salvar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Modal de Erro */}
      <Modal visible={showCreateModal} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {action === "create"
                ? "Erro ao criar postagem"
                : "Erro ao editar postagem"}
            </Text>
            <Text style={styles.modalBody}>
              {action === "create"
                ? " Não foi possível criar a postagem. Tente novamente mais tarde."
                : " Não foi possível editar a postagem. Tente novamente mais tarde."}
            </Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ManagePostComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#800020",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#800020",
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#800020",
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    width: "100%",
  },

  textareaDescription: {
    height: 60,
    textAlignVertical: "top",
  },

  textarea: {
    height: 80,
    textAlignVertical: "top",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  button: {
    backgroundColor: "#800020",
    padding: 10,
    borderRadius: 4,
    flex: 1,
    alignItems: "center",
    marginLeft: 10,
  },

  disabledButton: {
    backgroundColor: "#aaa",
  },

  backButton: {
    backgroundColor: "#800020",
    padding: 10,
    borderRadius: 4,
    flex: 1,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: 300,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  modalBody: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },

  closeButton: {
    fontSize: 16,
    color: "#800020",
    fontWeight: "bold",
  },

  picker: {
    borderWidth: 1.5,
    borderColor: "#800020",
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: "#FFF",
    height: 48,
  },
});
