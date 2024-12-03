import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen
        name="(auth)/managePosts"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(auth)/manageStudent"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(auth)/manageTeacher"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
