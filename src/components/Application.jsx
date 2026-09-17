import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { fetchWithAuth, logout } from "../utils/api";

export default function Application() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const firstLetter = username ? username.charAt(0).toUpperCase() : "";

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetchWithAuth(`/applications/${userId}/`)
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to connect", err);
        setLoading(false);
      });
  }, [userId]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "shortlisted":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "hired":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default: // pending
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-blue-700">JobPortal</h1>

          <nav className="flex gap-6 text-sm font-medium text-gray-700">
            <NavLink to="/jobs" className={({ isActive }) => isActive ? "text-blue-700" : "hover:text-blue-700"}>
              Jobs
            </NavLink>
            <NavLink to="/companies" className={({ isActive }) => isActive ? "text-blue-700" : "hover:text-blue-700"}>
              Companies
            </NavLink>
            <NavLink to="/application" className={({ isActive }) => isActive ? "text-blue-700" : "hover:text-blue-700"}>
              My Applications
            </NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Hello, {username}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
              {firstLetter}
            </div>
            <button
              onClick={logout}
              className="text-sm font-medium text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-8 flex-1">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>
          <p className="mt-1 text-sm text-gray-500">
            Track the status of the jobs you've applied for
          </p>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-gray-500 py-10">Loading your applications...</div>
          ) : !userId ? (
            <div className="rounded-lg border bg-white p-8 text-center">
              <p className="text-gray-600 mb-4">Please log in to view your applications.</p>
              <NavLink to="/login" className="text-blue-700 hover:underline">Go to Login</NavLink>
            </div>
          ) : applications.length === 0 ? (
            <div className="rounded-lg border bg-white p-8 text-center">
              <p className="text-gray-500 mb-4">You haven't applied to any jobs yet.</p>
              <NavLink to="/jobs" className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 transition">
                Find Jobs to Apply
              </NavLink>
            </div>
          ) : (
            applications.map((app) => (
              <div key={app.id} className="rounded-lg border bg-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:shadow-md">
                <div>
                  <h3 className="text-lg font-semibold text-blue-700">
                    {app.job.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-700 font-medium">{app.job.company}</p>
                  <div className="mt-2 text-sm text-gray-500 flex gap-4">
                    <span>📍 {app.job.location}</span>
                    <span>Applied on: {new Date(app.applied_on).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border uppercase tracking-wide ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="border-t bg-white mt-auto">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-gray-500">
          © 2026 JobPortal.com | All rights reserved
        </div>
      </footer>
    </div>
  );
}
