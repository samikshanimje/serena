import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login(email, password);

      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login Failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-100 to-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl"
      >
        <h1 className="mb-8 text-center text-4xl font-bold">
          Welcome Back 🌸
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-xl border p-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded-xl border p-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          disabled={loading}
          className="w-full rounded-xl bg-violet-600 p-4 font-semibold text-white hover:bg-violet-700"
        >
          {loading ? "Signing In..." : "Login"}
        </button>

        <p className="mt-6 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-violet-600"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}