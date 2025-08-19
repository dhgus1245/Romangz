import React, { useRef, useState } from "react";
import {Smartphone, Upload, BarChart3, Users, ShoppingCart} from 'lucide-react';

const MainSection = ({scrollToSection, isMobile, styles})  => {
    const videoRef = useRef(null);
    const [showOverlay, setShowOverlay] = useState(true); // 처음만 true

    const handleStartPlay = () => {
        videoRef.current.play();
        setShowOverlay(false); // 재생하면 이미지 제거
    };

    return (
        <section id="main" style={{...styles.sectionBlock, marginTop: !isMobile ? '10%' : '0'}}>
            <div style={styles.containerBlock}>
                {/* 홍보영상 */}
                <div style={{
                    margin: 'auto',
                    width: '100%',
                    maxWidth: '700px',
                    aspectRatio: '16/9',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '30px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
                }}>
                    <video
                        ref={videoRef}
                        src="/video/phone/ai_promotion.mp4"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "30px"
                        }}
                        controls
                    />

                    {showOverlay && (
                        <div
                            onClick={handleStartPlay}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "rgba(0,0,0,0.1)", // 클릭 영역 시각적으로 표시하고 싶으면
                                cursor: "pointer",
                                zIndex: 2,
                                opacity: 1
                            }}
                        >
                            <img
                                src="/image/phone/play_cat.png"
                                alt="play_cat"
                                style={{width: "80px", height: "80px"}}
                            />
                        </div>
                    )}
                </div>

                {/*24h 네온사인*/}
                <div style={{
                    width: 'clamp(120px, 20vw, 160px)',
                    height: 'clamp(120px, 20vw, 160px)',
                    margin: '50px auto',
                    borderRadius: '50%',
                    border: '4px solid white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 0 50px rgba(255, 255, 255, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.1)',
                    animation: 'neonBlink 2s infinite'
                }}>
                    <div style={{
                        fontSize: 'clamp(24px, 5vw, 36px)',
                        fontWeight: 'bold',
                        color: '#ff0040',
                        textShadow: '0 0 20px #ff0040, 0 0 40px #ff0040',
                        marginBottom: '5px',
                        animation: 'textBlink 2s infinite'
                    }}>24h
                    </div>
                    <div style={{
                        fontSize: 'clamp(12px, 2.5vw, 18px)',
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                        animation: 'textBlink 2s infinite 0.5s'
                    }}>OPEN
                    </div>
                </div>

                {/* 버튼 DIV */}
                <div style={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '25px'
                }}>

                    {/* 견적분석 버튼 */}
                    <button
                        onClick={() => scrollToSection('estimate')}
                        style={{
                            background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
                            color: 'white',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            padding: '18px 30px',
                            fontSize: '16px',
                            borderRadius: '25px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.3s ease',
                            width: '100%',
                            maxWidth: '250px',
                            boxShadow: '0 5px 15px rgba(255, 107, 107, 0.4)',
                            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.6)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 5px 15px rgba(255, 107, 107, 0.4)';
                        }}
                    >
                        <BarChart3 size={20}/>
                        견적분석
                    </button>

                    {/* PBTI 버튼 */}
                    <button
                        onClick={() => scrollToSection('pbti')}
                        style={{
                            background: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
                            color: 'white',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            padding: '18px 30px',
                            fontSize: '16px',
                            borderRadius: '25px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.3s ease',
                            width: '100%',
                            maxWidth: '250px',
                            boxShadow: '0 5px 15px rgba(78, 205, 196, 0.4)',
                            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(78, 205, 196, 0.6)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 5px 15px rgba(78, 205, 196, 0.4)';
                        }}
                    >
                        <Users size={20}/>
                        유형 테스트
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes neonBlink {
                    0%, 40%, 60%, 100% {
                        opacity: 1;
                        box-shadow: 0 0 50px rgba(255, 255, 255, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.1);
                    }
                    50% {
                        opacity: 0.3;
                        box-shadow: 0 0 20px rgba(255, 255, 255, 0.15), inset 0 0 15px rgba(255, 255, 255, 0.05);
                    }
                }

                @keyframes textBlink {
                    0%, 40%, 60%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.2;
                    }
                }

                @media (max-width: 768px) {
                    section {
                        padding: 20px 15px !important;
                    }

                    /* 모바일에서는 세로 배치 */
                    .main-container {
                        flex-direction: column !important;
                        gap: 40px !important;
                    }

                    /* 영상 컨테이너 크기 조정 */
                    .video-container {
                        max-width: 100% !important;
                    }
                    
                    /* 버튼 크기 조정 */
                    button {
                        padding: 15px 25px !important;
                        font-size: 14px !important;
                        max-width: 200px !important;
                    }
                    
                    /* 네온사인 크기 조정 */
                    .neon-sign {
                        width: 100px !important;
                        height: 100px !important;
                    }
                }
                
                @media (max-width: 480px) {
                    section {
                        padding: 15px 10px !important;
                    }
                    
                    .main-container {
                        gap: 30px !important;
                    }
                    
                    button {
                        padding: 12px 20px !important;
                        font-size: 13px !important;
                        max-width: 180px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default MainSection;