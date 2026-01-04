import { useState } from "react";
import { postJob } from "../api/employerApi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function PostJobForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full-Time",
    salary: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.company || !form.location || !form.description) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await postJob(form);
      toast.success("Job posted successfully");
      onSuccess();
      setForm({
        title: "",
        company: "",
        location: "",
        jobType: "Full-Time",
        salary: "",
        description: ""
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Post job failed"
      );
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        bg-white 
        p-8 
        rounded-2xl 
        shadow-lg 
        space-y-6
        max-h-[70vh]
        overflow-y-auto
      "
    >
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Create a Job Posting
        </h2>
        <p className="text-gray-600 mt-1">
          Provide accurate job details to attract the right candidates
        </p>
      </div>

      {/* JOB TITLE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Title *
        </label>
        <input
          name="title"
          placeholder="e.g. Frontend Developer"
          className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          value={form.title}
        />
      </div>

      {/* COMPANY */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company Name *
        </label>
        <input
          name="company"
          placeholder="e.g. ABC Technologies"
          className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          value={form.company}
        />
      </div>

      {/* LOCATION + TYPE */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <input
            name="location"
            placeholder="e.g. Remote / Bengaluru"
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={form.location}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Type *
          </label>
          <select
            name="jobType"
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={form.jobType}
          >
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
            <option>Contract</option>
          </select>
        </div>
      </div>

      {/* SALARY */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Salary (Optional)
        </label>
        <input
          name="salary"
          placeholder="e.g. ₹6 LPA / Negotiable"
          className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          value={form.salary}
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Description *
        </label>
        <textarea
          name="description"
          placeholder="Describe responsibilities, skills required, and expectations"
          className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
          onChange={handleChange}
          value={form.description}
        />
      </div>

      {/* ACTION */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Publish Job
      </button>

      {/* FOOTER NOTE */}
      <p className="text-sm text-gray-500 text-center">
        Your job post will be visible to all candidates immediately.
      </p>
    </motion.form>
  );
}
