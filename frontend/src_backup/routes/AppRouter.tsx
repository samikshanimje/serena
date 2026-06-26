import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "@/pages/home/HomePage";

import Dashboard from "@/pages/dashboard/Dashboard";
import LoginPage from "@/pages/login/LoginPage";
import RegisterPage from "@/pages/register/RegisterPage";

import ProtectedRoute from "@/components/common/ProtectedRoute";
import ChatPage from "@/pages/chat/ChatPage";
import JournalPage from "@/pages/journal/JournalPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />

        <Route
  path="/journal"
  element={
    <ProtectedRoute>
      <JournalPage />
    </ProtectedRoute>
  }
/>

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* Protected */}
        <Route
  path="/chat"
  element={
    <ProtectedRoute>
      <ChatPage />
    </ProtectedRoute>
  }
/>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}