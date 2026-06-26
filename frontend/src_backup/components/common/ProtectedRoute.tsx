import { Navigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!token) return <Navigate to="/login" />;

  return children;
}