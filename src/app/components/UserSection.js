"use client";
import JobList from "./JobList";

const UserSection = ({ currentUser, logOut }) => {
  return (
    <div className="user-section bg-blue-100 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Welcome {currentUser.name}
      </h2>
      <button
        onClick={logOut}
        className="w-full p-3 mb-4 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Log Out
      </button>
      <div className="job-list">
        <JobList />
      </div>
    </div>
  );
};

export default UserSection;
