import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";

import ProtectedLayout from "../components/layout/ProtectedLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ChatPage from "../pages/chat/ChatPage";
import MoodPage from "../pages/mood/MoodPage";
import JournalPage from "../pages/journal/JournalPage";
import AnalyticsPage from "../pages/analytics/AnalyticsPage";
import ProfilePage from "../pages/profile/ProfilePage";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Layout wraps these sub-routes with the Sidebar and TopNavbar */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/mood" element={<MoodPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}