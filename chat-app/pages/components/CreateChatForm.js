import { useState } from "react";
import { createChat } from "../services/api";

export default function CreateChatForm() {
  const [participants, setParticipants] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const participantIds = participants.split(",").map((id) => id.trim());
      const data = await createChat(token, participantIds);
      setMessage("Chat created successfully");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Create Chat</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Participants</label>
          <input
            type="text"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Comma-separated user IDs"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Chat
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
