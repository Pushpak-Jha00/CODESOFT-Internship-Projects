import { useEffect, useState } from "react";
import { getMyApplications, getApplicationSummary } from "../api/candidateApi";
import ApplicationCard from "../components/ApplicationCard";
import { motion } from "framer-motion";

export default function CandidateDashboard() {
  const [apps, setApps] = useState([]);
  const [summary, setSummary] = useState({ totalApplications: 0 });

  useEffect(() => {
    getMyApplications().then(setApps);
    getApplicationSummary().then(setSummary);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-56 md:h-64 mb-10"
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="Candidate dashboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55 flex items-center">
          <div className="max-w-6xl mx-auto px-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold">
              Candidate Dashboard
            </h1>
            <p className="mt-2 text-gray-200 max-w-xl">
              Track your job applications and stay updated on your hiring journey.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 pb-12">

        {/* SUMMARY CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-xl border shadow-sm"
          >
            <p className="text-gray-500 text-sm">
              Total Applications
            </p>
            <p className="text-3xl font-bold mt-2 text-gray-900">
              {summary.totalApplications}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-xl border shadow-sm"
          >
            <p className="text-gray-500 text-sm">
              Profile Status
            </p>
            <p className="text-lg font-semibold mt-2 text-green-600">
              Active
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Your profile is visible to employers
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-xl border shadow-sm"
          >
            <p className="text-gray-500 text-sm">
              Resume Status
            </p>
            <p className="text-lg font-semibold mt-2 text-gray-800">
              Uploaded
            </p>
            <p className="text-sm text-gray-500 mt-1">
              You can update it anytime
            </p>
          </motion.div>
        </div>

        {/* APPLICATIONS SECTION */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            My Applications
          </h2>

          {apps.length === 0 ? (
            <div className="bg-white p-10 rounded-xl border shadow-sm text-center">
              <p className="text-gray-700 text-lg">
                You haven’t applied for any jobs yet
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Start exploring jobs and submit your first application.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {apps.map((app) => (
                <ApplicationCard key={app._id} app={app} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
