import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { PlusCircle, ClipboardList, BarChart2 } from "lucide-react";
import PageWrapper from "../components/PageWrapper.jsx";

export default function Dashboard() {
  const { user } = useAuthStore();

  const cards = [
    {
      title: "Create Quiz",
      desc: "Build and publish a new quiz",
      icon: PlusCircle,
      link: "/dashboard/create",
      gradient: "from-indigo-600 to-purple-600",
      text: "text-white",
    },
    {
      title: "My Quizzes",
      desc: "Manage quizzes you created",
      icon: ClipboardList,
      link: "/dashboard/quizzes",
      gradient: "from-white to-white",
      text: "text-gray-800",
    },
    {
      title: "My Attempts",
      desc: "Track quizzes you attempted",
      icon: BarChart2,
      link: "/dashboard/attempts",
      gradient: "from-white to-white",
      text: "text-gray-800",
    },
  ];

  return (
    <PageWrapper>
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name || "User"} 👋
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your quizzes, track attempts, and analyze performance
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={card.link}
                className={`block h-full rounded-2xl p-6 shadow-sm border bg-gradient-to-br ${card.gradient}
                hover:shadow-xl transition-all duration-300`}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${
                    card.text === "text-white"
                      ? "bg-white/20"
                      : "bg-indigo-50"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      card.text === "text-white"
                        ? "text-white"
                        : "text-indigo-600"
                    }`}
                  />
                </div>

                <h3
                  className={`text-xl font-semibold mb-1 ${card.text}`}
                >
                  {card.title}
                </h3>
                <p
                  className={`text-sm ${
                    card.text === "text-white"
                      ? "text-white/80"
                      : "text-gray-500"
                  }`}
                >
                  {card.desc}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
    </PageWrapper>
  );
}
