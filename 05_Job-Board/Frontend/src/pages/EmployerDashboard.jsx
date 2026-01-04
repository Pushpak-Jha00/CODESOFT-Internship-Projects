import { useEffect, useState } from "react";
import { getMyJobs, getApplicants } from "../api/employerApi.js";
import { motion, AnimatePresence } from "framer-motion";
import PostJobForm from "../components/PostJobForm";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [showPostJob, setShowPostJob] = useState(false);

  const fetchJobs = () => {
    getMyJobs().then(setJobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const loadApplicants = async (job) => {
    setSelectedJob(job);
    setLoadingApplicants(true);
    const data = await getApplicants(job._id);
    setApplicants(data);
    setLoadingApplicants(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HERO HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white rounded-2xl shadow-lg mb-10"
        >
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Hiring"
            className="w-full h-72 object-cover opacity-90"
          />

          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="px-8 text-white max-w-xl">
              <h1 className="text-4xl font-bold">
                Employer Dashboard
              </h1>
              <p className="mt-3 text-gray-200">
                Post jobs, review applicants, and manage hiring professionally.
              </p>

              <button
                type="button"
                onClick={() => setShowPostJob(true)}
                className="mt-5 bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer "
              >
                + Post New Job
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* JOB LIST */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">
              My Job Posts
            </h2>

            {jobs.length === 0 && (
              <div className="text-center py-10">
                <img
                  src="https://images.unsplash.com/photo-1581091870627-3b3c4c5e1f7a"
                  className="rounded-lg mb-4"
                />
                <p className="text-gray-600">
                  You haven’t posted any jobs yet
                </p>
              </div>
            )}

            {jobs.map((job) => (
              <motion.div
                key={job._id}
                whileHover={{ scale: 1.02 }}
                onClick={() => loadApplicants(job)}
                className={`p-4 mb-4 rounded-lg border cursor-pointer transition ${
                  selectedJob?._id === job._id
                    ? "border-blue-600 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <h3 className="font-semibold text-gray-800">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  📍 {job.location}
                </p>
              </motion.div>
            ))}
          </div>

          {/* APPLICANTS */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">
              Applicants
            </h2>

            {!selectedJob && (
              <div className="text-center py-14">
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
                  className="rounded-lg mb-4"
                />
                <p className="text-gray-600">
                  Select a job to view applicants
                </p>
              </div>
            )}

            <div className="space-y-4">
              {applicants.map((app) => (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-between items-center p-4 border rounded-lg hover:shadow"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://randomuser.me/api/portraits/men/${Math.floor(
                        Math.random() * 50
                      )}.jpg`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">
                        {app.candidate.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {app.candidate.email}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`http://localhost:5000/${app.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    View Resume →
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ✅ POST JOB MODAL */}
      <AnimatePresence>
        {showPostJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white w-full max-w-3xl rounded-xl shadow-xl"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">Post New Job</h2>
                <button
                  onClick={() => setShowPostJob(false)}
                  className="text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                <PostJobForm
                  onSuccess={() => {
                    setShowPostJob(false);
                    fetchJobs();
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
