import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      {/* Back to Home (Top Left Corner) */}
      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400 font-semibold"
      >
        <FaArrowLeft /> Back to Home
      </Link>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
          Welcome Back 👋
        </h2>

        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition font-semibold">
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-6 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 dark:text-blue-400 font-semibold"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
