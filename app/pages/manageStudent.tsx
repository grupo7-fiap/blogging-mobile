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
import api from "../api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type manageStudentScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ManageStudent"
>;

const ManageStudent: React.FC = () => {
  const route = useRoute();
  //   const { action, id } = route.params as { action: string, id: number };

  const navigation = useNavigation<manageStudentScreenNavigationProp>();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //   MOCK PARA TESTE
  const dataTest: "create" | "edit" = "create";
  const action = dataTest;
  const id = 1;
  //   MOCK PARA TESTE

  useEffect(() => {
    setIsSaveDisabled(!(email && name && cpf));
  }, [email, name, cpf]);

  const handleSubmit = async () => {
    if (isSaveDisabled) {
      if (action === "create") {
        await createUser();
        setShowCreateModal(false);
        setName("");
        setCpf("");
        setEmail("");
        // navigation.navigate(""); ----> Voltar para a tela do Matheus
      } else if (action === "edit") {
        await editUser();
        setShowCreateModal(false);
        setName("");
        setCpf("");
        setEmail("");
        // navigation.navigate(""); ----> Voltar para a tela do Matheus
      }
    } else {
      console.error(`Ação inválida: ${action}`);
    }
  };

  const createUser = async () => {
    setIsLoading(true);
    try {
      const body = {
        email: email,
        name: name,
        cpf: cpf,
      };
      console.log("Enviando dados:", body);
      const response = await api.post("/students", body);
      setCreateSuccess(true);
    } catch (error) {
      console.error("Erro ao adicionar o aluno:", error);
      setCreateSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const editUser = async () => {
    setIsLoading(true);
    try {
      const body = {
        email: email,
        name: name,
        cpf: cpf,
      };
      console.log("Enviando dados:", body);
      const response = await api.put(`/students/${id}`, body);
      setCreateSuccess(true);
    } catch (error) {
      console.error("Erro ao editar os dados do aluno:", error);
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
            {action === "create"
              ? "Cadastro de Estudante"
              : "Editar Cadastro de Estudante"}
          </Text>

          <View style={{ width: "60%", justifyContent: "center" }}>
            {/* Nome */}
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome do estudante"
              value={name}
              onChangeText={setName}
            />

            {/* E-mail */}
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={[styles.input]}
              placeholder="Digite o e-mail do estudante"
              value={email}
              onChangeText={setEmail}
            />

            {/* CPF */}
            <Text style={styles.label}>CPF</Text>
            <TextInput
              style={[styles.input]}
              placeholder="Digite o CPF do estudante"
              value={cpf}
              onChangeText={setCpf}
            />

            {/* Botões */}
            <View style={styles.buttonContainer}>
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
                ? "Erro ao adicionar o usuário"
                : "Erro ao editar o usuário"}
            </Text>
            <Text style={styles.modalBody}>
              {action === "create"
                ? " Não foi possível adicionar o usuário. Tente novamente mais tarde."
                : " Não foi possível editar o usuário. Tente novamente mais tarde."}
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

export default ManageStudent;

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
    marginTop: 20,
  },

  button: {
    backgroundColor: "#800020",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
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
