import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function RegisterPage() {
  const { register } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await register(
        form.name,
        form.email,
        form.password
      );

      alert("Registration Successful!");

      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
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
          Create Account 🌸
        </h1>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="mb-4 w-full rounded-xl border p-4"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="mb-4 w-full rounded-xl border p-4"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="mb-6 w-full rounded-xl border p-4"
          required
        />

        <button
          disabled={loading}
          className="w-full rounded-xl bg-violet-600 p-4 font-semibold text-white hover:bg-violet-700"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-violet-600"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}