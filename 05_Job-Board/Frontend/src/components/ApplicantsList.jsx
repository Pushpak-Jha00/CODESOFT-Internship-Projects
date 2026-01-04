import { useEffect, useState } from "react";
import { getApplicants } from "../api/employerApi";
import { motion } from "framer-motion";

export default function ApplicantsList({ jobId }) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!jobId) return;

    setLoading(true);
    getApplicants(jobId)
      .then(setApps)
      .finally(() => setLoading(false));
  }, [jobId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 bg-white p-6 rounded-xl shadow"
    >
      <h4 className="text-xl font-semibold mb-4">
        Applicants
      </h4>

      {/* Loading */}
      {loading && (
        <p className="text-gray-600">
          Loading applicants...
        </p>
      )}

      {/* Empty */}
      {!loading && apps.length === 0 && (
        <p className="text-gray-600">
          No applications received yet.
        </p>
      )}

      {/* Applicants List */}
      <div className="space-y-4">
        {apps.map((app) => (
          <div
            key={app._id}
            className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <div>
              <p className="font-semibold text-gray-800">
                {app.candidate.name}
              </p>
              <p className="text-sm text-gray-600">
                {app.candidate.email}
              </p>

              <p className="text-sm mt-1">
                Status:{" "}
                <span className="font-medium text-blue-600">
                  {app.status}
                </span>
              </p>
            </div>

            <a
              href={`http://localhost:5000/${app.resume}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              View Resume
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
