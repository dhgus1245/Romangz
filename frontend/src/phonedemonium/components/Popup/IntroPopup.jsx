import React, { useState } from 'react';

const IntroPopup = ({ onClose }) => {
    const [showPopup, setShowPopup] = useState(true);

    if (!showPopup) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: 'linear-gradient(135deg, #1a237e, #3949ab)',
                borderRadius: '20px',
                padding: '40px',
                maxWidth: '500px',
                textAlign: 'center',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.2)'
            }}>
                <h2 style={{ marginBottom: '20px', fontSize: '28px' }}>🚀 AI 스마트폰 분석 시스템</h2>
                <p style={{ marginBottom: '30px', fontSize: '16px', lineHeight: '1.6' }}>
                    첨단 AI 기술로 당신의 스마트폰을 정확하게 분석하고<br />
                    최적의 가격을 제안해드립니다!
                </p>
                <div className="video-container">
                    <video
                        src="/video/phone/ai_sample.mp4"
                        autoPlay
                        muted
                        loop
                        controls
                        style={{ width: '100%', borderRadius: '12px' }}
                    />
                </div>
                <button
                    onClick={() => {
                        setShowPopup(false); // 내부 닫기
                        onClose();           // 부모에게 닫기 알림
                    }}
                    style={{
                        background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
                        color: 'white',
                        border: 'none',
                        padding: '12px 30px',
                        fontSize: '16px',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    시작하기
                </button>
            </div>
        </div>
    );
};

export default IntroPopup;
