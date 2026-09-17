import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { fetchWithAuth, logout } from "../utils/api";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const username = localStorage.getItem("username");
  const firstLetter = username ? username.charAt(0).toUpperCase() : "";

  useEffect(() => {
    fetchWithAuth(`/jobs/`)
      .then((res) => res.json())
      .then((data) => {
        // Extract unique companies
        const uniqueCompanies = Array.from(new Set(data.map((job) => job.company)));
        // Could also count jobs per company if needed
        const companyData = uniqueCompanies.map((companyName) => {
          const companyJobs = data.filter((j) => j.company === companyName);
          return {
            name: companyName,
            jobCount: companyJobs.length,
            locations: Array.from(new Set(companyJobs.map((j) => j.location))),
          };
        });
        setCompanies(companyData);
      })
      .catch((err) => console.error("Failed to connect", err));
  }, []);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Top Companies</h2>
            <p className="mt-1 text-sm text-gray-500">
              Discover and explore companies hiring now
            </p>
          </div>
          
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.length === 0 ? (
            <div className="col-span-full rounded-lg border bg-white p-8 text-center text-gray-500">
              No companies found matching your search.
            </div>
          ) : (
            filteredCompanies.map((company, index) => (
              <div key={index} className="rounded-lg border bg-white p-6 transition hover:shadow-md flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 flex-shrink-0 bg-blue-100 text-blue-700 flex items-center justify-center rounded-lg font-bold text-xl">
                      {company.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{company.name}</h3>
                      <p className="text-sm text-blue-600 font-medium">{company.jobCount} Active {company.jobCount === 1 ? 'Job' : 'Jobs'}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-600">
                    {company.locations.map((loc, i) => (
                      <span key={i} className="rounded bg-gray-100 px-2 py-1 border border-gray-200">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 border-t pt-4">
                  <NavLink
                    to={`/jobs`}
                    className="w-full block text-center rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition border border-gray-200"
                  >
                    View Jobs
                  </NavLink>
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
