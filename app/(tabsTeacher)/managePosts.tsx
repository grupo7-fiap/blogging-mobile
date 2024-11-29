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
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import api from "../api";

const ManagePostComponent: React.FC = () => {
  const route = useRoute();
  //   const { action, postId } = route.params as { action: string, postId: number };

  const [title, setTitle] = useState("");
  const [descricao, setDescricao] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [autor, setAutor] = useState("");
  const [theme, setTheme] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //   MOCK PARA TESTE
  const dataTest: "create" | "edit" = "create";
  const action = dataTest;
  const postId = 1;
  //   MOCK PARA TESTE

  const themes = [
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
    setIsSaveDisabled(!(title && descricao && autor && theme));
  }, [title, descricao, autor, theme]);

  const handleSubmit = async () => {
    if (isSaveDisabled) {
      if (action === "create") {
        await createPost();
        setShowCreateModal(false);
        setTitle("");
        setDescricao("");
        setConteudo("");
        setAutor("");
        setTheme("");
        // navigation.navigate("TabFlow2") --> navegar para a tela do Matheus
      } else if (action === "edit") {
        await editPost();
        setShowCreateModal(false);
        setTitle("");
        setDescricao("");
        setConteudo("");
        setAutor("");
        setTheme("");
        // navigation.navigate("TabFlow2") --> navegar para a tela do Matheus
      }
    } else {
      console.error(`Ação inválida: ${action}`);
    }
  };

  const createPost = async () => {
    setIsLoading(true);
    try {
      const body = {
        title,
        description: descricao,
        content: conteudo,
        author: autor,
        subject: theme,
      };
      console.log("Enviando dados:", body);
      const response = await api.post("/posts", body);
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
      const body = {
        title: title,
        description: descricao,
        content: conteudo,
        author: autor,
        subject: theme,
      };
      console.log("Enviando dados:", body);
      const response = await api.put(`/posts/admin/update/${postId}`, body);
      setCreateSuccess(true);
    } catch (error) {
      console.error("Erro ao editar o post:", error);
      setCreateSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => setShowCreateModal(false);

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
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />

            {/* Conteúdo */}
            <Text style={styles.label}>Conteúdo</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Digite o conteúdo da postagem"
              value={conteudo}
              onChangeText={setConteudo}
              multiline
            />

            {/* Autor */}
            <Text style={styles.label}>Autor</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o autor da postagem"
              value={autor}
              onChangeText={setAutor}
            />

            {/* Tema */}
            <Text style={styles.label}>Selecione um Tema</Text>
            <Picker
              selectedValue={theme}
              style={styles.picker}
              onValueChange={(itemValue) => setTheme(itemValue)}
            >
              <Picker.Item label="Selecione um tema" value="" />
              {themes.map((theme) => (
                <Picker.Item key={theme} label={theme} value={theme} />
              ))}
            </Picker>

            {/* Botões */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => Alert.alert("Voltando...")}
              >
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
