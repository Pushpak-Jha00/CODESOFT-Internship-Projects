import { motion, useInView } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import PageWrapper from "../components/PageWrapper.jsx";

const images = [
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
  "https://images.unsplash.com/photo-1584697964154-3a4b33b2a08c",
];

export default function Home() {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(0);

  
  const [stats, setStats] = useState({
    users: 0,
    quizzes: 0,
    attempts: 0,
  });

 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/stats");
        setStats(res.data.stats);
      } catch {
        console.error("Failed to load stats");
      }
    };

    fetchStats();
  }, []);

  const handleCreateQuiz = () => {
    if (loading) return;
    if (!user) navigate("/login");
    else navigate("/dashboard");
  };

  return (
    <PageWrapper>
    <div className="space-y-24">
      
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center py-12">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Create & Take Quizzes <br /> Easily
          </h1>

          <p className="text-gray-600 mb-6 text-lg">
            Build interactive quizzes, test your knowledge, and track results —
            all in one modern platform.
          </p>

          <div className="flex gap-4">
            <Link
              to="/quizzes"
              className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Take a Quiz
            </Link>

            <button
              onClick={handleCreateQuiz}
              className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            >
              {user ? "Go to Dashboard" : "Create Quiz"}
            </button>
          </div>
        </motion.div>

        {/* IMAGE SLIDER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-xl shadow-xl"
        >
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            alt="Quiz platform"
            className="w-full h-[380px] object-cover"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      </section>

       {/* STATS SECTION  */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gray-50 py-12"
      >
        {/* 🔹 SECTION HEADING */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Platform Statistics</h2>
          <p className="text-gray-500 mt-2">
            Total activity recorded on the platform
          </p>
        </div>

        {/* 🔹 STATS CARDS */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <StatCard number={stats.users} label="Total Users" />
          <StatCard number={stats.quizzes} label="Total Quizzes Created" />
          <StatCard number={stats.attempts} label="Total Attempts Made" />
        </div>
      </motion.section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {features.map((f, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
    </PageWrapper>
  );
}

/* ================= ANIMATED STAT CARD ================= */
function StatCard({ number, label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = Number(number);
    const duration = 1200;
    const stepTime = 16;
    const increment = Math.ceil(end / (duration / stepTime));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, number]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-xl shadow text-center"
    >
      {/* 🔹 LABEL */}
      <h3 className="text-lg font-semibold">{label}</h3>

      {/* 🔹 NUMBER */}
      <h2 className="text-5xl font-bold mt-4">{count.toLocaleString()}</h2>
    </motion.div>
  );
}

/* ================= FEATURES ================= */
const features = [
  {
    title: "Create Quizzes",
    desc: "Design quizzes with multiple questions and options easily.",
  },
  {
    title: "Track Performance",
    desc: "View results instantly and analyze your score.",
  },
  {
    title: "One Attempt Policy",
    desc: "Ensures fair assessment with single quiz attempts.",
  },
];
