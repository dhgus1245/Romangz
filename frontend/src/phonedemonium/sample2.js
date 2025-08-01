import React from 'react';
import './ParallaxBackground.css'; // CSS 분리 권장

const VideoBackground = () => {
    return (
        <div className="video-container">
            <video
                src="/video/phone/bg_galaxy.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="video-background"
            />
        </div>
    );
};

export default VideoBackground;
