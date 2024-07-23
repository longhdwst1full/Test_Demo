import { useRouter } from "next/router";
import Meeting from "../../components/Meeting";

export default function MeetingPage() {
  const router = useRouter();
  const { meetingId } = router.query;

  if (!meetingId) {
    return <div>Loading...</div>;
  }

  return <Meeting meetingId={meetingId} />;
}
