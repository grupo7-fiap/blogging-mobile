import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlunosPost from "./(tabs)/alunosPosts";
import PostDetails from "./(tabs)/postDetalhes";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AlunosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="alunosPosts" component={AlunosPost} options={{ title: "Lista de Alunos" }} />
      <Stack.Screen name="postDetalhes" component={PostDetails} options={{ title: "Detalhes do Post" }} />
    </Stack.Navigator>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Alunos" component={AlunosStack} options={{ title: "Alunos" }} />
    </Tab.Navigator>
  );
}
