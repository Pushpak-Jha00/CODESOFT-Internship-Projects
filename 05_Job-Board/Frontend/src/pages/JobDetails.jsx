import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleJob } from "../api/jobApi";
import ApplyJob from "../components/ApplyJob";

// ✅ Salary formatter
const formatSalary = (salary) => {
  if (!salary) return "Negotiable";

  // If salary already has text like "LPA", "month"
  if (isNaN(salary)) return salary;

  const amount = Number(salary);

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} LPA`;
  }

  return `₹${amount.toLocaleString()} / month`;
};

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchSingleJob(id).then(setJob);
  }, [id]);

  if (!job) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">

        {/* Job Header */}
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <p className="mt-1 text-lg text-gray-700">{job.company}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
            📍 {job.location}
          </span>

          <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">
            🕒 {job.jobType}
          </span>

          <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
            💰 {formatSalary(job.salary)}
          </span>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Job Description
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Apply Section */}
        <div className="mt-8">
          <ApplyJob jobId={job._id} />
        </div>

      </div>
    </div>
  );
}
