import { motion } from "framer-motion";

// Status color helper
const getStatusStyle = (status) => {
  switch (status) {
    case "Applied":
      return "bg-blue-50 text-blue-600";
    case "Reviewed":
      return "bg-yellow-50 text-yellow-600";
    case "Selected":
      return "bg-green-50 text-green-600";
    case "Rejected":
      return "bg-red-50 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function ApplicationCard({ app }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
    >
      {/* Job Title */}
      <h3 className="text-xl font-bold text-gray-800">
        {app.job.title}
      </h3>

      {/* Company & Location */}
      <p className="mt-1 text-sm text-gray-600">
        {app.job.company} • {app.job.location}
      </p>

      {/* Status */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm text-gray-500">Status:</span>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
            app.status
          )}`}
        >
          {app.status}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-5">
        <a
          href={`http://localhost:5000/${app.resume}`}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          📄 View Uploaded Resume
        </a>
      </div>
    </motion.div>
  );
}
