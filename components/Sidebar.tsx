import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const router = useRouter();
  const currentRoute = usePathname(); // Obtém a rota atual
  const sidebarTranslateX = new Animated.Value(isOpen ? 0 : -250);

  // Animação para abrir/fechar a Sidebar
  React.useEffect(() => {
    Animated.timing(sidebarTranslateX, {
      toValue: isOpen ? 0 : -250,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const handleNavigation = (route: string) => {
    if (currentRoute !== route) {
      router.push(route);
      toggleSidebar(); // Fecha a Sidebar após a navegação
    }
  };

  // Função para determinar o estilo da rota ativa
  const getNavLinkStyle = (route: string) => {
    return {
      color: currentRoute === route ? "#800020" : "#fff",
    };
  };

  return (
    <>
      {/* Overlay para escurecer o fundo */}
      {isOpen && <View style={styles.overlay} onTouchStart={toggleSidebar} />}

      {/* Sidebar */}
      <Animated.View
        style={[styles.sidebarContainer, { transform: [{ translateX: sidebarTranslateX }] }]}
      >
        <View style={styles.userIcon}>
          <Icon name="user-circle" size={60} color="#fff" />
        </View>
        <Text style={styles.userName}>Nome do Usuário</Text>
        <View style={styles.divider} />
        <View style={styles.navLinks}>
          <TouchableOpacity
            style={styles.navLinkItem}
            onPress={() => handleNavigation("lists/adminPostList")}
            disabled={currentRoute === "/lists/adminPostList"} // Desabilita se estiver na rota
          >
            <Text style={[styles.navLinkText, getNavLinkStyle("/lists/adminPostList")]}>
              Posts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navLinkItem}
            onPress={() => handleNavigation("lists/adminAlunosList")}
            disabled={currentRoute === "/lists/adminAlunosList"} // Desabilita se estiver na rota
          >
            <Text style={[styles.navLinkText, getNavLinkStyle("/lists/adminAlunosList")]}>
              Alunos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navLinkItem}
            onPress={() => handleNavigation("lists/adminProfessoresList")}
            disabled={currentRoute === "/lists/adminProfessoresList"} // Desabilita se estiver na rota
          >
            <Text style={[styles.navLinkText, getNavLinkStyle("/lists/adminProfessoresList")]}>
              Professores
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    width: 250,
    backgroundColor: "#2e2e2e",
    position: "absolute",
    top: 60,
    left: 0,
    height: "100%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  userIcon: {
    alignItems: "center",
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    color: "#800020",
    textAlign: "center",
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#800020",
    marginBottom: 20,
  },
  navLinks: {
    width: "100%",
  },
  navLinkItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 5,
    backgroundColor: "transparent",
  },
  navLinkText: {
    fontSize: 16,
    color: "#fff",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 99,
  },
});

export default Sidebar;
