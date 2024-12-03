import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface DeleteModalProps {
  Id: number;
  onConfirm: (id: number) => void;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ Id, onConfirm, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!Id} // Modal aparece se o postId for válido
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Aviso</Text>
          <Text style={styles.modalBody}>Deseja realmente deletar esse post?</Text>
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => onConfirm(Id)}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      padding: 20,
      backgroundColor: "#fff",
      borderRadius: 8,
      alignItems: "center",
      elevation: 5,
    },
    modalHeader: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#800020",
      marginBottom: 10,
    },
    modalBody: {
      fontSize: 16,
      color: "#333",
      marginBottom: 20,
      textAlign: "center",
    },
    modalFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    cancelButton: {
      flex: 1,
      backgroundColor: "#ccc",
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    confirmButton: {
      flex: 1,
      backgroundColor: "#800020",
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      textAlign: "center",
    },
  });

export default DeleteModal;
