import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { applyJob } from "../api/jobApi";
import toast from "react-hot-toast";

export default function ApplyJob({ jobId }) {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleApply = async (e) => {
    e.preventDefault();

    // ✅ Prevent double submit
    if (loading) return;

    if (!resume) {
      toast.error("Please upload your resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume); 

    try {
      setLoading(true);

      await applyJob(jobId, formData);

      toast.success("Applied successfully");

      navigate("/candidate"); 
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Resume upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleApply} className="mt-6 border p-4 rounded">
      <h3 className="font-bold mb-2">Apply for this job</h3>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        disabled={loading}
        onChange={(e) => setResume(e.target.files[0])}
      />

      <button
        type="submit"
        disabled={loading}
        className={`block mt-3 px-4 py-2 rounded text-white ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-black hover:bg-gray-800"
        }`}
      >
        {loading ? "Applying..." : "Apply Now"}
      </button>
    </form>
  );
}
