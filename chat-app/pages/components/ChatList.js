import { useEffect, useState } from "react";
import { getChats } from "../services/api";

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const data = await getChats(token);
          setChats(data);
        } else {
          setError("No token found");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchChats();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Chats</h2>
      {chats.length > 0 ? (
        <ul>
          {chats.map((chat) => (
            <li key={chat._id} className="mb-2 p-2 border rounded">
              {chat.participants
                .map((participant) => participant.username)
                .join(", ")}
            </li>
          ))}
        </ul>
      ) : (
        <p>No chats available.</p>
      )}
    </div>
  );
}
