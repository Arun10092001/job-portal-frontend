import React, { useActionState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function loginAction(_, formData) {
  const json = Object.fromEntries(formData);

  try {
    const res = await fetch(`${API_BASE_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });

    const data = await res.json().catch(() => ({
      message: "Server returned an invalid response.",
    }));

    if (res.ok) {
      localStorage.setItem("userId", String(data.user_id));
      localStorage.setItem("username", data.username);
      return data.message || "Login successful";
    }

    return data.message || "Login Failed";
  } catch (error) {
    console.error("Login request failed:", error);
    return "Unable to reach the backend. Start the Django server and retry.";
  }
}

export default function Login() {
  const [message, formAction, isPending] = useActionState(loginAction, "", {
    withPending: true,
  });

  const navigate = useNavigate();

  if (message == "Login Successfully") {
    navigate("/jobs");
  }

  return (
    <div className="bg-gray-50 text-gray-800">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-700">JobPortal</div>

          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
            <a href="#" className="hover:text-blue-700">
              Jobs
            </a>
            <a href="#" className="hover:text-blue-700">
              Companies
            </a>
            <a href="#" className="hover:text-blue-700">
              Services
            </a>
            <a href="#" className="hover:text-blue-700">
              Register
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <section className="hidden md:block">
          <h1 className="text-3xl font-bold leading-snug">
            Find your dream job now
          </h1>

          <p className="mt-4 text-gray-600 max-w-md">
            Register with JobPortal and get matched with the right
            opportunities. Build your profile and apply to jobs in top
            companies.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-gray-700">
            <li>✔ Trusted by thousands of recruiters</li>
            <li>✔ Personalized job recommendations</li>
            <li>✔ Easy apply & profile visibility</li>
          </ul>
        </section>

        <section className="hidden md:block">
          <h1 className="text-2xl font-bold text-blue-700 text-center">
            JobPortal
          </h1>
          <p className="text-sm text-gray-500 text-center mt-1">
            Login to your account
          </p>

          <form action={formAction} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                name="username"
                type="name"
                placeholder="Enter your username"
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-600 focus:ring-1 focus:ring-blue-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-600 focus:ring-1 focus:ring-blue-200 outline-none"
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-blue-700 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              disabled={isPending}
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded transition"
            >
              {isPending ? "Logging..." : "LOGIN"}
            </button>

            <p className="text-center text-gray-700">{message}</p>

            <p className="text-sm text-center text-gray-600">
              New to JobPortal?
              <NavLink
                to={"/register"}
                className="text-blue-700 font-medium hover:underline"
              >
                Register here
              </NavLink>
            </p>
          </form>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-500 text-center">
          © 2026 JobPortal.com | All rights reserved
        </div>
      </footer>
    </div>
  );
}
