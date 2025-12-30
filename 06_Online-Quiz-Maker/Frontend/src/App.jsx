import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/authStore.js";

/* Layout */
import Layout from "./components/Layout.jsx";

/* Public Pages */
import Home from "./pages/Home.jsx";
import Quizzes from "./pages/Quizzes.jsx";
import QuizPlay from "./pages/QuizPlay.jsx";
import QuizResult from "./pages/QuizResult.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

/* Dashboard Pages */
import Dashboard from "./pages/Dashboard.jsx";
import MyQuizzes from "./pages/MyQuizzes.jsx";
import CreateQuiz from "./pages/CreateQuiz.jsx";
import MyAttempts from "./pages/MyAttempts.jsx";

/* Route Protection */
import ProtectedRoute from "./components/PrivateRoute.jsx";
import QuizAttempts from "./pages/QuizAttempts.jsx";
import EditQuiz from "./pages/EditQuiz.jsx";

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 🔹 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/result/:id" element={<QuizResult />} />

        {/* 🔒 Protected Routes */}


      <Route path="/quiz/:id"  
          element={
          <ProtectedRoute>
            <QuizPlay />
         </ProtectedRoute>
        } 
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/quizzes"
          element={
            <ProtectedRoute>
              <MyQuizzes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/quizzes/:quizId/attempts"
          element={
            <ProtectedRoute>
              <QuizAttempts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/create"
          element={
            <ProtectedRoute>
              <CreateQuiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/attempts"
          element={
            <ProtectedRoute>
              <MyAttempts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz/:id/edit"
          element={
            <ProtectedRoute>
              <EditQuiz/>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
