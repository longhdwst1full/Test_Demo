import { useEffect, useState } from "react";
import { getProfile } from "../services/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const data = await getProfile(token);
          setProfile(data);
        } else {
          setError("No token found");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Profile</h2>
      {profile ? (
        <div>
          <p>
            <strong>Username:</strong> {profile.username}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
