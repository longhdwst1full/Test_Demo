import React, { useRef, useEffect } from "react";
import useWebRTC from "../hooks/useWebRTC";

const Meeting = ({ meetingId }) => {
  const { localStream, remoteStreams, startScreenSharing, stopScreenSharing } =
    useWebRTC(meetingId);
  const localVideoRef = useRef();

  useEffect(() => {
    if (localStream.current) {
      localVideoRef.current.srcObject = localStream.current.srcObject;
    }
  }, [localStream]);

  return (
    <div>
      <video
        ref={localVideoRef}
        autoPlay
        muted
        id="local-video"
        className="local-video"
      />
      <div className="remote-videos">
        {remoteStreams.map((stream, index) => (
          <video
            key={index}
            autoPlay
            className="remote-video"
            ref={(video) => {
              if (video) {
                video.srcObject = stream;
              }
            }}
          />
        ))}
      </div>
      <button
        onClick={startScreenSharing}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Share Screen
      </button>
      <button
        onClick={stopScreenSharing}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Stop Sharing
      </button>
    </div>
  );
};

export default Meeting;
