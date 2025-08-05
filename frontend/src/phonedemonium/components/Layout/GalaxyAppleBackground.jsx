import React, {useEffect, useState} from 'react';

const GalaxyAppleBackground = () => {
    // 불규칙한 별들 생성
    const [stars, setStars] = useState([]);

    useEffect(() => {
        // 화면 크기에 따라 별의 개수 조정
        const getStarCount = () => {
            const width = window.innerWidth;
            if (width < 768) return 150; // 모바일
            if (width < 1024) return 300; // 태블릿
            return 500; // 데스크톱
        };

        const generateStars = () => {
            const starCount = getStarCount();
            const newStars = [];

            for (let i = 0; i < starCount; i++) {
                newStars.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.8 + 0.2,
                    twinkleDelay: Math.random() * 4,
                    twinkleDuration: Math.random() * 3 + 2,
                });
            }
            setStars(newStars);
        };

        generateStars();

        const handleResize = () => {
            generateStars();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 애니메이션을 위한 사과 위치 상태
    const [applePositions, setApplePositions] = useState([
        { x: 10, y: 20, speed: 0.5 },
        { x: 80, y: 60, speed: 0.3 },
        { x: 30, y: 80, speed: 0.4 },
        { x: 70, y: 30, speed: 0.6 },
        { x: 50, y: 10, speed: 0.2 },
    ]);

    // 사과 애니메이션
    useEffect(() => {
        const interval = setInterval(() => {
            setApplePositions((prev) =>
                prev.map((apple) => ({
                    ...apple,
                    x: (apple.x + apple.speed) % 100,
                    y: apple.y + Math.sin(Date.now() * 0.001 + apple.x) * 0.1,
                }))
            );
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <style>
            {`
            ${stars.map((star) => `
                @keyframes starTwinkle-${star.id % 5} {
                  0% { opacity: ${star.opacity * 0.3}; transform: scale(0.8); }
                  50% { opacity: ${star.opacity}; transform: scale(1.2); }
                  100% { opacity: ${star.opacity * 0.6}; transform: scale(1); }
                }`).join('')}
            `}
            </style>
            {/* 불규칙한 별들 배경 */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                }}
            >
                {stars.map((star) => (
                    <div
                        key={star.id}
                        style={{
                            position: 'absolute',
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            opacity: star.opacity,
                            boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,${
                                star.opacity * 0.5
                            })`,
                            animation: `starTwinkle-${star.id % 5} ${star.twinkleDuration}s ease-in-out infinite ${star.twinkleDelay}s alternate`,
                        }}
                    />
                ))}

                {/* 은하수 그라데이션 오버레이 */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: `
            linear-gradient(45deg, rgba(255,255,255,0.02) 0%, transparent 30%, rgba(255,255,255,0.05) 70%, transparent 100%),
            linear-gradient(135deg, rgba(186,85,211,0.08) 0%, transparent 50%),
            linear-gradient(-45deg, rgba(75,0,130,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)
          `,
                        animation: 'galaxyFlow 25s linear infinite',
                    }}
                />
            </div>

            {/* 움직이는 사과들 */}
            {applePositions.map((apple, index) => (
                <div
                    key={index}
                    style={{
                        position: 'fixed',
                        left: `${apple.x}%`,
                        top: `${apple.y}%`,
                        fontSize: '24px',
                        animation: `float ${3 + index}s ease-in-out infinite`,
                        zIndex: 1,
                        opacity: 0.7,
                    }}
                >
                    🍎
                </div>
            ))}
        </div>
    );
};

export default GalaxyAppleBackground;
