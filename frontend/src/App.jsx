import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate, // ✅ FIX: import Navigate
} from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            timeout: 8000,
          }
        );

        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError("Session expired. Please login again.");
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Loading screen (slow network safe)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 mb-3"></div>
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} error={error} />} />

        {/* ✅ Prevent logged-in users from accessing login */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
