import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./pages/home";
import LoginComponent from "./pages/login";
import AlunosPost from "./(tabs)/alunosPosts";
import PostDetails from "./(tabs)/postDetalhes";
import TabOneScreen from "./(tabs)/one";
import TabTwoScreen from "./(tabs)/two";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  TabFlow1: undefined;
  TabFlow2: undefined;
};

export type AlunosStackParamList = {
  alunosPosts: undefined;
  postDetalhes: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const AlunosTab = createBottomTabNavigator<AlunosStackParamList>();

function ProfessoresStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tab1" component={TabOneScreen} />
      <Tab.Screen name="Tab2" component={TabTwoScreen} />
    </Tab.Navigator>
  );
}

function AlunosStack() {
  return (
    <AlunosTab.Navigator>
      <AlunosTab.Screen
        name="alunosPosts"
        component={AlunosPost}
        options={{ title: "Lista de Alunos" }}
      />
      <AlunosTab.Screen
        name="postDetalhes"
        component={PostDetails}
        options={{ title: "Detalhes do Post" }}
      />
    </AlunosTab.Navigator>
  );
}

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
          name="TabFlow1"
          component={ProfessoresStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabFlow2"
          component={AlunosStack}
          options={{ headerShown: false, title: "Alunos" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
