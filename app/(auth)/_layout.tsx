import React from "react";
import { Stack } from "expo-router";

export default function AuthenticatedLayout() {
  return (
    <Stack>
      <Stack.Screen name="testAdminPosts" options={{ headerShown: false }} />
      {/* Adicione outras rotas protegidas aqui */}
    </Stack>
  );
}
