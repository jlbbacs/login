import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    setUser(null); // reset user state
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          MERN Login Test
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 py-2 px-4 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-white hover:underline">
                Login
              </Link>
              <Link to="/register" className="text-white hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
