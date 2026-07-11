import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, BookOpen } from "lucide-react";
import { loginUser } from "../../services/authService";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await loginUser(form);

      toast.success("Welcome back!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-[#F6F7FC] flex items-center justify-center px-6">

        <div className="grid lg:grid-cols-2 max-w-6xl w-full bg-white rounded-[35px] shadow-2xl overflow-hidden">

          {/* LEFT */}

          <div className="bg-gradient-to-br from-violet-600 to-indigo-500 text-white p-14 flex flex-col justify-center">

            <div className="flex items-center gap-3">

              <BookOpen size={40} />

              <h1 className="text-4xl font-bold">
                StudyMate
              </h1>

            </div>

            <h2 className="text-5xl font-bold mt-12 leading-tight">

              Welcome Back.

            </h2>

            <p className="mt-6 text-violet-100 leading-8">

              Continue your learning journey with AI-powered
              notes, flashcards, quizzes, analytics and smart
              productivity tools.

            </p>

          </div>

          {/* RIGHT */}

          <div className="p-14">

            <h2 className="text-4xl font-bold text-gray-900">

              Login

            </h2>

            <p className="text-gray-500 mt-3">

              Sign in to continue.

            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-6"
            >

              <div>

                <label className="font-medium">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 rounded-xl border border-gray-300 focus:border-violet-500 outline-none"
                  required
                />

              </div>

              <div>

                <label className="font-medium">
                  Password
                </label>

                <div className="relative mt-2">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border border-gray-300 focus:border-violet-500 outline-none"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff />
                    ) : (
                      <Eye />
                    )}
                  </button>

                </div>

              </div>

              <button
                disabled={loading}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-xl font-semibold transition"
              >
                {loading ? "Signing In..." : "Login"}
              </button>

            </form>

            <p className="mt-8 text-center text-gray-500">

              Don't have an account?

              <Link
                to="/register"
                className="text-violet-600 font-semibold ml-2"
              >
                Register
              </Link>

            </p>

          </div>

        </div>

      </div>
    </>
  );
}