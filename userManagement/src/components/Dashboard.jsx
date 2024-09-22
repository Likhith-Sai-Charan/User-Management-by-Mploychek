import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);

    axios
      .get(`http://localhost:5000/api/records?role=${loggedInUser.role}`)
      .then((response) => setRecords(response.data))
      .catch(console.error);
  }, []);

  return (
    <div className={`p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mb-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
      >
        Toggle Dark Mode
      </button>
      <h2 className="text-2xl font-bold mb-4">Welcome, {user ? user.userId : 'User'}</h2>
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
  );
};

export default Dashboard;
