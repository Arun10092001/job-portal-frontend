import React from "react";
import { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export default function JobListPage() {
  const [jobs, setJobs] = useState([]);
  const username = localStorage.getItem("username");
  const firstLetter = username ? username.charAt(0).toUpperCase() : "";

  useEffect(() => {
    fetch(`${API_BASE_URL}/jobs/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("jobs from API:", data);
        setJobs(data);
      })
      .catch((err) => console.error("Failed to connect", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-blue-700">JobPortal</h1>

          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
            <a href="#" className="hover:text-blue-700">
              Jobs
            </a>
            <a href="#" className="hover:text-blue-700">
              Companies
            </a>
            <a href="#" className="hover:text-blue-700">
              My Applications
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Hello, {username}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
              {firstLetter}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-8 flex-1">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Recommended Jobs</h2>
          <p className="mt-1 text-sm text-gray-500">
            Jobs based on your profile and preferences
          </p>
        </div>

        <div className="space-y-4">
          {jobs.length === 0 ? (
            <p className="text-gray-500">No Jobs found</p>
          ) : (
            jobs.map((job) => (
              <div className="rounded-lg border bg-white p-5 transition hover:shadow-md">
                <h3 className="text-lg font-semibold text-blue-700">
                  {job.title}
                </h3>
                <p className="mt-1 text-sm text-gray-700">{job.company}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(job.posted_on).toLocaleDateString()}
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
                  <span className="rounded bg-gray-100 px-2 py-1">
                    {job.location}
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-1">
                    {job.salary_range}
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-1">
                    🕒 Full Time
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
                  {job.description}
                </div>
                <div className="mt-4 flex justify-end">
                  <NavLink
                    to={`/apply/${job.id}`}
                    className="text-sm font-medium text-blue-700 hover:underline"
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
