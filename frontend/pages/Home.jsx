import React from 'react';
import { Link } from 'react-router-dom';

function Home({ user, error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
        {error && <p className="text-red-500 mb-5 text-sm">{error}</p>}

        {user ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Welcome {user.username}
            </h2>
            <p>{user.email}</p>
          </div>
        ) : (
          <div>
            <div><h1>Welcome to MERN login test</h1></div>
            <p>Please log in to see your profile</p>
            <div className="mt-4 flex justify-center gap-4">
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
