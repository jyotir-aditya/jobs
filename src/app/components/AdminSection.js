"use client";

const AdminSection = ({ currentUser, logOut, users }) => {
  return (
    <div
      id="adminSection"
      className="admin-section bg-green-100 p-6 rounded-lg shadow-md max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>
      <button
        onClick={logOut}
        className="w-full p-3 mb-4 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Log Out
      </button>
      <h3 className="text-xl font-semibold mb-4">Registered Users:</h3>
      <ul id="userList" className="list-disc pl-5">
        {users.map((user) => (
          <li key={user._id} className="mb-2">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSection;
