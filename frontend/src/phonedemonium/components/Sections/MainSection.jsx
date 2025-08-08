import React from 'react';
import {Smartphone, Upload, BarChart3, Users, ShoppingCart} from 'lucide-react';
import {internal_createExtendSxProp} from "@mui/material/zero-styled";
const MainSection = ({scrollToSection}) => (
    <section id="main" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        position: 'relative'
    }}>


        {/* 24h OPEN 네온 사인 */}
        <div style={{
            marginBottom: '40px',
            position: 'relative',
            marginTop: '200px'
        }}>
            <div style={{
                width: 'clamp(150px, 25vw, 200px)',
                height: 'clamp(150px, 25vw, 200px)',
                borderRadius: '50%',
                border: '4px solid white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 50px rgba(255, 255, 255, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.1)',
                margin: '0 auto',
                animation: 'neonBlink 2s infinite'
            }}>
                <div style={{
                    fontSize: 'clamp(32px, 6vw, 48px)',
                    fontWeight: 'bold',
                    color: '#ff0040',
                    textShadow: '0 0 20px #ff0040, 0 0 40px #ff0040',
                    marginBottom: '5px',
                    animation: 'textBlink 2s infinite'
                }}>24h</div>
                <div style={{
                    fontSize: 'clamp(16px, 3vw, 24px)',
                    fontWeight: 'bold',
                    color: 'white',
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                    animation: 'textBlink 2s infinite 0.5s'
                }}>OPEN</div>
            </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(15px)',
            borderRadius: '30px',
            padding: '40px 30px',
            border: '2px solid rgba(255,255,255,0.2)',
            width: '90%',
            maxWidth: '600px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
            <h1 style={{
                fontSize: 'clamp(32px, 6vw, 48px)',
                color: 'white',
                marginBottom: '10px',
                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                textShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
                textAlign: 'center'
            }}>
                🌟 스마트폰 갤럭시 🌟
            </h1>

            <div style={{
                fontSize: 'clamp(14px, 3vw, 18px)',
                color: '#4ecdc4',
                marginBottom: '30px',
                fontWeight: 'bold',
                textShadow: '0 0 15px rgba(78, 205, 196, 0.6)',
                textAlign: 'center',
                lineHeight: '1.4'
            }}>
                대한민국 최초의 AI기반 갤럭시 중고폰 시세 확인도 하고<br/>
                나의 스마트폰 유형도 알아보자!
            </div>

            {/* 버튼 그룹 */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                alignItems: 'center',
                marginTop: '40px',
                width: '100%'
            }}>
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
                        maxWidth: '280px',
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
                    <BarChart3 size={20} />
                    휴대폰 견적 분석
                </button>

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
                        maxWidth: '280px',
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
                    <Users size={20} />
                    내 유형의 휴대폰은?(PBTI)
                </button>

                <button
                    onClick={() => scrollToSection('marketplace')}
                    style={{
                        background: 'linear-gradient(45deg, #9b59b6, #8e44ad)',
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
                        maxWidth: '280px',
                        boxShadow: '0 5px 15px rgba(155, 89, 182, 0.4)',
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(155, 89, 182, 0.6)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 5px 15px rgba(155, 89, 182, 0.4)';
                    }}
                >
                    <ShoppingCart size={20} />
                    마켓플레이스
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
                    padding: 15px !important;
                }
            }
            
            @media (max-width: 480px) {
                section {
                    padding: 10px !important;
                }
                h1 {
                    margin-bottom: 15px !important;
                }
                .main-content {
                    padding: 30px 20px !important;
                }
                .button-group {
                    gap: 15px !important;
                    margin-top: 30px !important;
                }
                button {
                    padding: 15px 25px !important;
                    font-size: 14px !important;
                }
            }
        `}</style>
    </section>
);

export default MainSection;