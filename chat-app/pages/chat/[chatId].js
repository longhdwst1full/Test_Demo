import { useRouter } from "next/router";
import ChatWindow from "../../components/ChatWindow";

export default function ChatPage() {
  const router = useRouter();
  const { chatId } = router.query;
  const userId = "USER_ID"; // Replace with the actual user ID from authentication

  if (!chatId) {
    return <div>Loading...</div>;
  }

  return <ChatWindow chatId={chatId} userId={userId} />;
}
