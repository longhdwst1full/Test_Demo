import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../services/api";

export default function SettingsPage() {
  const [username, setUsername] = useState("");
  const [notificationPreference, setNotificationPreference] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const data = await getProfile(token);
          setUsername(data.username);
          setNotificationPreference(data.notificationPreference || true);
        } else {
          setError("No token found");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const updateData = { username, notificationPreference };
      await updateProfile(token, updateData);
      setMessage("Settings updated successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">User Settings</h2>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">
            Notification Preferences
          </label>
          <select
            value={notificationPreference}
            onChange={(e) =>
              setNotificationPreference(e.target.value === "true")
            }
            className="w-full px-3 py-2 border rounded"
          >
            <option value="true">Enable Notifications</option>
            <option value="false">Disable Notifications</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
