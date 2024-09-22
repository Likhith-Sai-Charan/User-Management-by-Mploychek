import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [delay, setDelay] = useState(0);
  const [newUser, setNewUser] = useState({
    userId: "",
    password: "",
    role: "General User",
  });
  const [darkMode, setDarkMode] = useState(false);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    UserService.getUsers(delay)
      .then((response) => setUsers(response.data))
      .catch(console.error);
  }, [delay]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);

    axios
      .get(`http://localhost:5000/api/records?role=${loggedInUser.role}`)
      .then((response) => setRecords(response.data))
      .catch(console.error);
  }, []);

  const handleCreateUser = () => {
    UserService.createUser(newUser)
      .then(() => {
        UserService.getUsers(delay)
          .then((response) => {
            setUsers(response.data); // Replace the list with fresh user data
            setNewUser({ userId: "", password: "", role: "General User" });
          })
          .catch(console.error);
      })
      .catch(console.error);
  };

  const handleDeleteUser = (userId) => {
    UserService.deleteUser(userId)
      .then(() => {
        UserService.getUsers(delay)
          .then((response) => setUsers(response.data))
          .catch(console.error);
      })
      .catch(console.error);
  };

  return (
    <div className={`p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-50 text-black'}`}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mb-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
      >
        Toggle Dark Mode
      </button>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard - Manage Users</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Create New User</h3>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="User ID"
            value={newUser.userId}
            onChange={(e) => setNewUser({ ...newUser, userId: e.target.value })}
            className="border border-gray-300 p-2 flex-grow"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="border border-gray-300 p-2 flex-grow"
          />
          <button
            onClick={handleCreateUser}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Create User
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">API Delay (ms)</h3>
        <input
          type="number"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2">User List</h3>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">UserID</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.filter(user => user.role === 'General User').map(user => (
            <tr key={user._id} className="hover:bg-gray-100 transition duration-200 ease-in-out">
              <td className="border border-gray-300 p-2">{user.userId}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Your Records</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Name</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record.id} className="hover:bg-gray-100 transition duration-200 ease-in-out">
                <td className="border border-gray-300 p-2">{record.id}</td>
                <td className="border border-gray-300 p-2">{record.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
