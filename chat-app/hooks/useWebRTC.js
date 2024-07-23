import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const useWebRTC = (meetingId) => {
  const [remoteStreams, setRemoteStreams] = useState([]);
  const localStream = useRef(null);
  const screenStream = useRef(null);
  const socket = useRef(null);
  const peerConnections = useRef({});

  useEffect(() => {
    socket.current = io("http://localhost:3000");

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStream.current = stream;
        attachStreamToVideo(localStream.current, "local-video");

        socket.current.emit("joinMeeting", meetingId);

        socket.current.on("userJoined", (userId) => {
          const peerConnection = createPeerConnection(userId);
          peerConnections.current[userId] = peerConnection;
          stream
            .getTracks()
            .forEach((track) => peerConnection.addTrack(track, stream));
        });

        socket.current.on("signal", async ({ userId, signal }) => {
          if (peerConnections.current[userId]) {
            await peerConnections.current[userId].setRemoteDescription(
              new RTCSessionDescription(signal)
            );
            if (signal.type === "offer") {
              const answer = await peerConnections.current[
                userId
              ].createAnswer();
              await peerConnections.current[userId].setLocalDescription(answer);
              socket.current.emit("signal", { meetingId, signal: answer });
            }
          } else {
            const peerConnection = createPeerConnection(userId);
            await peerConnection.setRemoteDescription(
              new RTCSessionDescription(signal)
            );
            peerConnections.current[userId] = peerConnection;
            if (signal.type === "offer") {
              const answer = await peerConnection.createAnswer();
              await peerConnection.setLocalDescription(answer);
              socket.current.emit("signal", { meetingId, signal: answer });
            }
          }
        });
      });

    return () => {
      Object.values(peerConnections.current).forEach((pc) => pc.close());
      socket.current.disconnect();
    };
  }, [meetingId]);

  const createPeerConnection = (userId) => {
    const pc = new RTCPeerConnection();
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit("signal", { meetingId, signal: event.candidate });
      }
    };
    pc.ontrack = (event) => {
      setRemoteStreams((prevStreams) => {
        const existingStream = prevStreams.find(
          (stream) => stream.id === event.streams[0].id
        );
        if (existingStream) return prevStreams;
        return [...prevStreams, event.streams[0]];
      });
    };
    return pc;
  };

  const attachStreamToVideo = (stream, videoId) => {
    const videoElement = document.getElementById(videoId);
    if (videoElement) {
      videoElement.srcObject = stream;
    }
  };

  const startScreenSharing = async () => {
    try {
      screenStream.current = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const screenTrack = screenStream.current.getVideoTracks()[0];

      Object.values(peerConnections.current).forEach((pc) => {
        const sender = pc.getSenders().find((s) => s.track.kind === "video");
        if (sender) {
          sender.replaceTrack(screenTrack);
        }
      });

      screenTrack.onended = () => {
        stopScreenSharing();
      };
    } catch (error) {
      console.error("Error starting screen sharing:", error);
    }
  };

  const stopScreenSharing = () => {
    const videoTrack = localStream.current.getVideoTracks()[0];
    Object.values(peerConnections.current).forEach((pc) => {
      const sender = pc.getSenders().find((s) => s.track.kind === "video");
      if (sender) {
        sender.replaceTrack(videoTrack);
      }
    });
    screenStream.current.getTracks().forEach((track) => track.stop());
    screenStream.current = null;
  };

  return { localStream, remoteStreams, startScreenSharing, stopScreenSharing };
};

export default useWebRTC;
