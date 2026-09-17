import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { fetchWithAuth, logout } from "../utils/api";

export default function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const username = localStorage.getItem("username");
  const firstLetter = username ? username.charAt(0).toUpperCase() : "";

  useEffect(() => {
    fetchWithAuth(`/jobs/`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((err) => console.error("Failed to connect", err));
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-blue-700">JobPortal</h1>

          <nav className="flex gap-6 text-sm font-medium text-gray-700">
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                isActive ? "text-blue-700" : "hover:text-blue-700"
              }
            >
              Jobs
            </NavLink>
            <NavLink
              to="/companies"
              className={({ isActive }) =>
                isActive ? "text-blue-700" : "hover:text-blue-700"
              }
            >
              Companies
            </NavLink>
            <NavLink
              to="/application"
              className={({ isActive }) =>
                isActive ? "text-blue-700" : "hover:text-blue-700"
              }
            >
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
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Recommended Jobs
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Jobs based on your profile and preferences
            </p>
          </div>

          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by job title, company, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="rounded-lg border bg-white p-8 text-center text-gray-500">
              No Jobs found matching your search.
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-lg border bg-white p-5 transition hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-blue-700">
                  {job.title}
                </h3>
                <p className="mt-1 text-sm text-gray-700 font-medium">
                  {job.company}
                </p>
                <p className="text-gray-500 text-sm">
                  Posted on {new Date(job.posted_on).toLocaleDateString()}
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
                  <span className="rounded bg-gray-100 px-2 py-1 border border-gray-200">
                    📍 {job.location}
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-1 border border-gray-200">
                    💰 {job.salary_range || "Not specified"}
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-1 border border-gray-200">
                    🕒 Full Time
                  </span>
                </div>
                <div className="mt-4 text-sm text-gray-600 line-clamp-2">
                  {job.description}
                </div>
                <div className="mt-4 flex justify-end">
                  <NavLink
                    to={`/apply/${job.id}`}
                    className="rounded bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition"
                  >
                    Apply Now
                  </NavLink>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-gray-500">
          © 2026 JobPortal.com | All rights reserved
        </div>
      </footer>
    </div>
  );
}
