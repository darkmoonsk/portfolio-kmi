import React from "react";

function VideoBackground() {
  return (
    <video
      className="fixed inset-0 w-full h-full object-cover"
      autoPlay
      muted
      loop
    >
      <source src="/videos/kmi.webm" type="video/webm" />
    </video>
  );
}

export default VideoBackground;
