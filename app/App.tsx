import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./pages/home";
import LoginComponent from "./pages/login";
import AlunosPost from "./(tabs)/alunosPosts";
import PostDetails from "./(tabs)/postDetalhes";
// import TabOneScreen from "./(tabsTeacher)/one";
// import TabTwoScreen from "./(tabsTeacher)/two";
import ManagePostComponent from "./pages/managePosts";
import ManageTeacher from "./pages/manageTeacher";
import ManageStudent from "./pages/manageStudent";

// Tipos das rotas principais
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  ManagePost: { action: string; postId: number };
  ManageTeacher: { action: string; id: number };
  ManageStudent: { action: string; id: number };
  TabFlow1: undefined; // Fluxo com abas para Professores
  TabFlow2: undefined; // Fluxo com abas para Alunos
};

// Tipos específicos para o fluxo de alunos
export type AlunosStackParamList = {
  alunosPosts: undefined;
  postDetalhes: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const AlunosTab = createBottomTabNavigator();

// function ProfessoresStack() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Tab1" component={TabOneScreen} />
//       <Tab.Screen name="Tab2" component={TabTwoScreen} />
//     </Tab.Navigator>
//   );
// }

function AlunosStack() {
  const AlunosStackNavigator =
    createNativeStackNavigator<AlunosStackParamList>();

  return (
    <AlunosStackNavigator.Navigator>
      {/* Fluxo de abas */}
      <AlunosStackNavigator.Screen
        name="alunosPosts"
        component={AlunosTabs}
        options={{ headerShown: false }}
      />
      {/* Tela de detalhes fora das abas */}
      <AlunosStackNavigator.Screen
        name="postDetalhes"
        component={PostDetails}
        options={{ title: "Detalhes do Post" }}
      />
    </AlunosStackNavigator.Navigator>
  );
}

// Separação do fluxo de abas para alunos
function AlunosTabs() {
  return (
    <AlunosTab.Navigator>
      <AlunosTab.Screen
        name="alunosPosts"
        component={AlunosPost}
        options={{ title: "Lista de Alunos" }} // Define o título da aba
      />
    </AlunosTab.Navigator>
  );
}

// App principal com navegação
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />

        <Stack.Screen
          name="Login"
          component={LoginComponent}
          options={{ title: "Login" }}
        />

        <Stack.Screen
          name="ManagePost"
          component={ManagePostComponent}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ManageTeacher"
          component={ManageTeacher}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ManageStudent"
          component={ManageStudent}
          options={{ headerShown: false }}
        />

        {/* <Stack.Screen
          name="TabFlow1"
          component={ProfessoresStack}
          options={{ headerShown: false }}
        /> */}

        <Stack.Screen
          name="TabFlow2"
          component={AlunosStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
