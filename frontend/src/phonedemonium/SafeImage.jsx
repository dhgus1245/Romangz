import React from 'react';

const SafeImage = ({ src, alt, fallback = "/image/phone/error.jpg", ...props }) => {
    const handleError = (e) => {
        e.target.onerror = null;
        e.target.src = fallback;
    };

    return <img src={src} alt={alt} onError={handleError} {...props} />;
};

export default SafeImage;
