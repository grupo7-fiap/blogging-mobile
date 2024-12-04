import React from "react";
import { Stack } from "expo-router";

export default function AuthenticatedLayout() {
  return (
    <Stack>
      <Stack.Screen name="testAdminPosts" options={{ headerShown: false }} />
      {/* Adicione outras rotas protegidas aqui */}
      <Stack.Screen
        name="lists/adminAlunosList"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="lists/adminPostList"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="lists/adminProfessoresList"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="teachers/managePosts"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="teachers/manageStudent"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="teachers/manageTeacher"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
