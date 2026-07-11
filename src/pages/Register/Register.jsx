import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, BookOpen } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import {
  registerUser,
  loginUser,
} from "../../services/authService";

import {
  sendWelcomeEmail,
} from "../../lib/resend";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      await loginUser({
        email: form.email,
        password: form.password,
      });

      try {
        await sendWelcomeEmail(
          form.name,
          form.email
        );
      } catch (err) {
        console.error(err);
      }

      toast.success("Welcome to StudyMate!");

      navigate("/dashboard");

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-[#F6F7FC] flex items-center justify-center px-6 py-10">

        <div className="grid lg:grid-cols-2 max-w-6xl w-full bg-white rounded-[32px] shadow-2xl overflow-hidden">          {/* Left Side */}

          <div className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-14 flex flex-col justify-center">

            <div className="flex items-center gap-3">

              <BookOpen size={42} />

              <h1 className="text-4xl font-bold">
                StudyMate
              </h1>

            </div>

            <h2 className="text-5xl font-bold mt-10 leading-tight">
              Start your
              <br />
              learning journey.
            </h2>

            <p className="mt-6 text-violet-100 leading-8">
              Upload notes, generate AI summaries,
              create flashcards, manage your tasks
              and prepare smarter for every exam.
            </p>

          </div>

          {/* Right Side */}

          <div className="p-14">

            <h2 className="text-4xl font-bold text-gray-900">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Create your StudyMate account to continue.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              <div>

                <label className="font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-xl p-4 outline-none focus:border-violet-500"
                />

              </div>

              <div>

                <label className="font-medium">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-xl p-4 outline-none focus:border-violet-500"
                />

              </div>

              <div>

                <label className="font-medium">
                  Password
                </label>

                <div className="relative mt-2">

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-violet-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

              </div>

              <div>

                <label className="font-medium">
                  Confirm Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-xl p-4 outline-none focus:border-violet-500"
                />

              </div>              <button
                type="submit"
                disabled={loading}
                className="w-full bg-violet-600 hover:bg-violet-700 transition text-white rounded-xl py-4 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>

            </form>

            <p className="text-center text-gray-500 mt-8">

              Already have an account?

              <Link
                to="/login"
                className="text-violet-600 font-semibold ml-2 hover:underline"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </>
  );
}