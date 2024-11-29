// app/index.tsx
import React from "react";
import HomeScreen from "./pages/home";
import ManagePosts from "./pages/managePosts";
import ManageUsers from "./pages/manageTeacher";
import ManageStudent from "./pages/manageStudent";

export default function Home() {
  return <ManageStudent></ManageStudent>;
  // return <ManageUsers></ManageUsers>;
  // return <HomeScreen></HomeScreen>;
}
