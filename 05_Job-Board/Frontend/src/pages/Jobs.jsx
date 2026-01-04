import { useEffect, useState } from "react";
import { fetchJobs } from "../api/jobApi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchRole, setSearchRole] = useState("");
  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    fetchJobs().then(setJobs);
  }, []);

  // 🔍 FILTER LOGIC
  const filteredJobs = jobs.filter((job) => {
    const roleMatch = job.title
      .toLowerCase()
      .includes(searchRole.toLowerCase());

    const cityMatch = job.location
      .toLowerCase()
      .includes(searchCity.toLowerCase());

    return roleMatch && cityMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* PAGE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900">
            Find Your Next Job
          </h1>
          <p className="mt-3 text-gray-600 max-w-xl">
            Search jobs by role and city and apply with confidence.
          </p>
        </motion.div>

        {/* SEARCH BAR */}
        <div className="bg-white p-5 rounded-xl shadow-sm border mb-10">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search by job role (e.g. Developer)"
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Search by city (e.g. Delhi)"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* JOB LIST */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-gray-700 text-lg font-medium">
              No jobs found
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Try changing job role or city.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="p-6 flex flex-col h-full">

                  {/* TITLE */}
                  <h2 className="text-xl font-semibold text-gray-900">
                    {job.title}
                  </h2>

                  {/* COMPANY */}
                  <p className="mt-1 text-gray-700 font-medium">
                    {job.company}
                  </p>

                  {/* META */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      📍 {job.location}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      💼 {job.jobType}
                    </span>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="mt-4 text-sm text-gray-600 line-clamp-3 grow">
                    {job.description}
                  </p>

                  {/* FOOTER */}
                  <div className="mt-6">
                    <Link
                      to={`/jobs/${job._id}`}
                      className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition"
                    >
                      View Details
                      <span className="text-lg">→</span>
                    </Link>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
