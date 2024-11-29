// app/index.tsx
import React from "react";
import HomeScreen from "./pages/home";
import ManagePosts from "./(tabsTeacher)/managePosts";

export default function Home() {
  return <ManagePosts></ManagePosts>;
  // return <HomeScreen></HomeScreen>;
}
