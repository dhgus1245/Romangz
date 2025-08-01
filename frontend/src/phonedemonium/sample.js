import React, { useState, useEffect } from 'react';
import { Search, Upload, Star, Smartphone, Apple, Zap, Shield, Camera, Battery, Cpu, Heart } from 'lucide-react';

const SmartphonePlatform = () => {
    const [currentSection, setCurrentSection] = useState('main');
    const [showPopup, setShowPopup] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPhone, setSelectedPhone] = useState(null);

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
                    twinkleDuration: Math.random() * 3 + 2
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
        { x: 50, y: 10, speed: 0.2 }
    ]);

    // 사과 애니메이션
    useEffect(() => {
        const interval = setInterval(() => {
            setApplePositions(prev => prev.map(apple => ({
                ...apple,
                x: (apple.x + apple.speed) % 100,
                y: apple.y + Math.sin(Date.now() * 0.001 + apple.x) * 0.1
            })));
        }, 100);

        return () => clearInterval(interval);
    }, []);

    // 가상 휴대폰 데이터
    const phoneData = [
        {
            id: 1,
            brand: 'Samsung',
            model: 'Galaxy S23 Ultra',
            price: 850000,
            condition: 'A급',
            image: '📱',
            specs: { ram: '12GB', storage: '256GB', battery: '5000mAh' }
        },
        {
            id: 2,
            brand: 'Apple',
            model: 'iPhone 14 Pro',
            price: 1200000,
            condition: 'S급',
            image: '📱',
            specs: { ram: '6GB', storage: '128GB', battery: '3200mAh' }
        },
        {
            id: 3,
            brand: 'Samsung',
            model: 'Galaxy Z Fold 4',
            price: 1500000,
            condition: 'A급',
            image: '📱',
            specs: { ram: '12GB', storage: '512GB', battery: '4400mAh' }
        },
        {
            id: 4,
            brand: 'Apple',
            model: 'iPhone 13',
            price: 700000,
            condition: 'B급',
            image: '📱',
            specs: { ram: '4GB', storage: '128GB', battery: '3240mAh' }
        }
    ];

    const filteredPhones = phoneData.filter(phone =>
        phone.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const scrollToSection = (section) => {
        setCurrentSection(section);
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0a2e 0%, #16213e 25%, #1a237e 50%, #3949ab 75%, #5c6bc0 100%)',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            {/* 불규칙한 별들 배경 */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0
            }}>
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
                            boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,${star.opacity * 0.5})`,
                            animation: `starTwinkle-${star.id} ${star.twinkleDuration}s ease-in-out infinite ${star.twinkleDelay}s alternate`
                        }}
                    />
                ))}

                {/* 은하수 그라데이션 오버레이 */}
                <div style={{
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
                    animation: 'galaxyFlow 25s linear infinite'
                }} />
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
                        opacity: 0.7
                    }}
                >
                    🍎
                </div>
            ))}

            {/* AI 홍보 팝업 */}
            {showPopup && (
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
                        <h2 style={{marginBottom: '20px', fontSize: '28px'}}>🚀 AI 스마트폰 분석 시스템</h2>
                        <p style={{marginBottom: '30px', fontSize: '16px', lineHeight: '1.6'}}>
                            첨단 AI 기술로 당신의 스마트폰을 정확하게 분석하고<br/>
                            최적의 가격을 제안해드립니다!
                        </p>
                        <div className="video-container">
                            <video
                                src="/video/phone/ai_sample.mp4"
                                autoPlay
                                muted
                                loop
                                controls
                                style={{width: '100%', borderRadius: '12px'}}
                            />
                        </div>
                        <button
                            onClick={() => setShowPopup(false)}
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
            )}

            {/* 메인 컨테이너 */}
            <div style={{position: 'relative', zIndex: 10 }}>

                {/* 1. 메인 페이지 */}
                <section id="main" style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '20px'
                }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '30px',
                        padding: '60px 40px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        maxWidth: '800px'
                    }}>
                        <h1 style={{
                            fontSize: '48px',
                            color: 'white',
                            marginBottom: '20px',
                            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold'
                        }}>
                            🌟 스마트폰 갤럭시 🌟
                        </h1>

                        <p style={{
                            fontSize: '20px',
                            color: 'rgba(255,255,255,0.9)',
                            marginBottom: '50px',
                            lineHeight: '1.6'
                        }}>
                            AI 기술로 스마트폰을 정확하게 분석하고<br/>
                            당신에게 맞는 최고의 거래를 제안합니다
                        </p>

                        <div style={{
                            display: 'flex',
                            gap: '30px',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <button
                                onClick={() => scrollToSection('estimate')}
                                style={{
                                    background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '20px 40px',
                                    fontSize: '18px',
                                    borderRadius: '50px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    transition: 'transform 0.3s ease',
                                    minWidth: '180px'
                                }}
                                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                <Upload size={20} />
                                팔러가기
                            </button>

                            <button
                                onClick={() => scrollToSection('phones')}
                                style={{
                                    background: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '20px 40px',
                                    fontSize: '18px',
                                    borderRadius: '50px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    transition: 'transform 0.3s ease',
                                    minWidth: '180px'
                                }}
                                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                <Smartphone size={20} />
                                구매하기
                            </button>
                        </div>
                    </div>
                </section>

                {/* 2. 폰비티아이 (PBTI) 섹션 */}
                <section id="pbti" style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px'
                }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '30px',
                        padding: '60px 40px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        maxWidth: '800px',
                        textAlign: 'center'
                    }}>
                        <h2 style={{
                            fontSize: '36px',
                            color: 'white',
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '15px'
                        }}>
                            🌹 나의 유형은... 두근두근 🌹
                        </h2>

                        <div style={{
                            background: 'linear-gradient(45deg, #ff9a9e, #fecfef)',
                            borderRadius: '20px',
                            padding: '40px',
                            margin: '30px 0',
                            color: '#333'
                        }}>
                            <h3 style={{ fontSize: '28px', marginBottom: '20px', color: '#333' }}>
                                📱 PBTI 테스트
                            </h3>
                            <p style={{ fontSize: '16px', marginBottom: '30px', color: '#555' }}>
                                Phone Behavior Type Indicator - 당신의 스마트폰 사용 유형을 알아보세요!
                            </p>

                            <div style={{
                                background: 'white',
                                borderRadius: '15px',
                                padding: '30px',
                                marginBottom: '20px'
                            }}>
                                <h4 style={{ fontSize: '18px', marginBottom: '20px', color: '#333' }}>
                                    📱 당신의 스마트폰 사용 패턴은?
                                </h4>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: '15px',
                                    marginBottom: '30px'
                                }}>
                                    {[
                                        { icon: '📊', text: '사진/영상 촬영 위주', color: '#ff9a9e' },
                                        { icon: '👥', text: '게임 중심 사용', color: '#a8e6cf' },
                                        { icon: '🎬', text: '업무/생산성 툴', color: '#ffd3a5' },
                                        { icon: '🎵', text: '학습/독서 용도', color: '#fd9644' }
                                    ].map((option, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                background: option.color,
                                                padding: '15px',
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                transition: 'transform 0.2s',
                                                textAlign: 'center'
                                            }}
                                            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                        >
                                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{option.icon}</div>
                                            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{option.text}</div>
                                        </div>
                                    ))}
                                </div>

                                <button style={{
                                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '15px 30px',
                                    borderRadius: '25px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}>
                                    PBTI 테스트 시작하기
                                </button>
                            </div>

                            <div style={{ fontSize: '14px', color: '#666', marginTop: '20px' }}>
                                🛒 📶 개발 예정 서비스입니다
                            </div>
                        </div>

                        <div style={{ fontSize: '24px', marginTop: '20px' }}>
                            4. 폰비티아이 페이지
                        </div>
                        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginTop: '10px' }}>
                            - 사컵까지 보는 생성<br/>
                            - 궁금하기 보는 생성 ❤️
                        </div>
                    </div>
                </section>

                {/* 3. 견적 확인창 */}
                <section id="estimate" style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px'
                }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '30px',
                        padding: '60px 40px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        maxWidth: '800px',
                        textAlign: 'center'
                    }}>
                        <h2 style={{
                            fontSize: '36px',
                            color: 'white',
                            marginBottom: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '15px'
                        }}>
                            <Camera size={36} />
                            스마트폰 견적 확인
                        </h2>

                        <div style={{
                            background: 'rgba(255,255,255,0.9)',
                            borderRadius: '20px',
                            padding: '40px',
                            color: '#333'
                        }}>
                            <div style={{
                                border: '3px dashed #ddd',
                                borderRadius: '15px',
                                padding: '60px 20px',
                                marginBottom: '30px',
                                background: '#f9f9f9'
                            }}>
                                <Upload size={48} style={{ color: '#666', marginBottom: '20px' }} />
                                <p style={{ fontSize: '18px', marginBottom: '10px' }}>
                                    스마트폰 사진을 업로드해주세요
                                </p>
                                <p style={{ fontSize: '14px', color: '#666' }}>
                                    AI가 자동으로 손상도를 분석하여 정확한 등급을 매겨드립니다
                                </p>
                                <button style={{
                                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 25px',
                                    borderRadius: '20px',
                                    marginTop: '20px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}>
                                    사진 선택하기
                                </button>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                                gap: '15px',
                                marginBottom: '30px'
                            }}>
                                {[
                                    { grade: 'S급', color: '#ff6b6b', desc: '거의 새것' },
                                    { grade: 'A급', color: '#4ecdc4', desc: '매우 좋음' },
                                    { grade: 'B급', color: '#45b7d1', desc: '좋음' },
                                    { grade: 'C급', color: '#96ceb4', desc: '보통' }
                                ].map((grade, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            background: grade.color,
                                            color: 'white',
                                            padding: '20px 10px',
                                            borderRadius: '10px',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{grade.grade}</div>
                                        <div style={{ fontSize: '12px', marginTop: '5px' }}>{grade.desc}</div>
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                background: '#f0f8ff',
                                borderRadius: '10px',
                                padding: '20px',
                                border: '2px solid #e1f5fe'
                            }}>
                                <h4 style={{ marginBottom: '15px', color: '#1976d2' }}>
                                    <Shield size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                                    AI 분석 결과 (예시)
                                </h4>
                                <div style={{ textAlign: 'left', fontSize: '14px', lineHeight: '1.6' }}>
                                    • 화면 상태: 매우 좋음 (미세한 스크래치 1개)<br/>
                                    • 후면 상태: 좋음 (모서리 미세 손상)<br/>
                                    • 기능 상태: 정상 작동<br/>
                                    • <strong style={{ color: '#ff6b6b' }}>예상 등급: A급</strong><br/>
                                    • <strong style={{ color: '#4ecdc4' }}>예상 가격: 850,000원</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. 휴대폰 목록 및 검색창 */}
                <section id="phones" style={{
                    minHeight: '100vh',
                    padding: '60px 20px'
                }}>
                    <div style={{
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        <h2 style={{
                            fontSize: '36px',
                            color: 'white',
                            marginBottom: '30px',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '15px'
                        }}>
                            <Smartphone size={36} />
                            스마트폰 마켓플레이스
                        </h2>

                        {/* 검색바 */}
                        <div style={{
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            padding: '20px',
                            marginBottom: '30px',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
                                <Search
                                    size={20}
                                    style={{
                                        position: 'absolute',
                                        left: '15px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#666'
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="브랜드, 모델명으로 검색하세요..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '15px 15px 15px 50px',
                                        fontSize: '16px',
                                        border: 'none',
                                        borderRadius: '25px',
                                        background: 'white',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        {/* 휴대폰 목록 */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '25px'
                        }}>
                            {filteredPhones.map((phone) => (
                                <div
                                    key={phone.id}
                                    style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '20px',
                                        padding: '25px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        transition: 'transform 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
                                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                                >
                                    <div style={{
                                        fontSize: '60px',
                                        textAlign: 'center',
                                        marginBottom: '15px'
                                    }}>
                                        {phone.image}
                                    </div>

                                    <div style={{ color: 'white', textAlign: 'center' }}>
                                        <h3 style={{ fontSize: '20px', marginBottom: '8px', fontWeight: 'bold' }}>
                                            {phone.model}
                                        </h3>
                                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '15px' }}>
                                            {phone.brand}
                                        </p>

                                        <div style={{
                                            background: phone.condition === 'S급' ? '#ff6b6b' :
                                                phone.condition === 'A급' ? '#4ecdc4' : '#45b7d1',
                                            color: 'white',
                                            padding: '6px 15px',
                                            borderRadius: '15px',
                                            display: 'inline-block',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            marginBottom: '15px'
                                        }}>
                                            {phone.condition}
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-around',
                                            marginBottom: '15px',
                                            fontSize: '12px',
                                            color: 'rgba(255,255,255,0.8)'
                                        }}>
                                            <div>
                                                <Cpu size={16} style={{ marginBottom: '4px' }} />
                                                <div>{phone.specs.ram}</div>
                                            </div>
                                            <div>
                                                <Smartphone size={16} style={{ marginBottom: '4px' }} />
                                                <div>{phone.specs.storage}</div>
                                            </div>
                                            <div>
                                                <Battery size={16} style={{ marginBottom: '4px' }} />
                                                <div>{phone.specs.battery}</div>
                                            </div>
                                        </div>

                                        <div style={{
                                            fontSize: '24px',
                                            fontWeight: 'bold',
                                            color: '#4ecdc4',
                                            marginBottom: '15px'
                                        }}>
                                            ₩{phone.price.toLocaleString()}
                                        </div>

                                        <button style={{
                                            background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
                                            color: 'white',
                                            border: 'none',
                                            padding: '12px 25px',
                                            borderRadius: '20px',
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px'
                                        }}>
                                            <Heart size={16} />
                                            관심상품 담기
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredPhones.length === 0 && (
                            <div style={{
                                textAlign: 'center',
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '18px',
                                marginTop: '50px'
                            }}>
                                검색 결과가 없습니다. 다른 키워드로 검색해보세요.
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* CSS 애니메이션 */}
            <style jsx>{`
        ${stars.map(star => `
          @keyframes starTwinkle-${star.id} {
            0% { opacity: ${star.opacity * 0.3}; transform: scale(0.8); }
            50% { opacity: ${star.opacity}; transform: scale(1.2); }
            100% { opacity: ${star.opacity * 0.6}; transform: scale(1); }
          }
        `).join('')}
        
        @keyframes galaxyFlow {
          0% { transform: translateX(0) translateY(0) rotate(0deg); }
          25% { transform: translateX(-5px) translateY(-10px) rotate(0.5deg); }
          50% { transform: translateX(-10px) translateY(-5px) rotate(-0.5deg); }
          75% { transform: translateX(5px) translateY(-15px) rotate(0.3deg); }
          100% { transform: translateX(0) translateY(0) rotate(0deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          overflow-x: hidden;
        }
        
        button:hover {
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }
        
        input:focus {
          box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.3);
        }
        
        /* 반응형 스타일 */
        @media (max-width: 768px) {
          div[style*="fontSize: '48px'"] {
            font-size: 32px !important;
          }
          
          div[style*="fontSize: '36px'"] {
            font-size: 24px !important;
          }
          
          div[style*="padding: '60px 40px'"] {
            padding: 30px 20px !important;
          }
          
          div[style*="gap: '30px'"] {
            gap: 20px !important;
            flex-direction: column;
          }
          
          button[style*="minWidth: '180px'"] {
            width: 100% !important;
            min-width: auto !important;
          }
          
          div[style*="gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'"] {
            grid-template-columns: 1fr !important;
          }
          
          div[style*="gridTemplateColumns: 'repeat(auto-fit, minWidth(120px, 1fr))'"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 480px) {
          div[style*="fontSize: '32px'"] {
            font-size: 24px !important;
          }
          
          div[style*="fontSize: '24px'"] {
            font-size: 18px !important;
          }
          
          div[style*="padding: '30px 20px'"] {
            padding: 20px 15px !important;
          }
        }
      `}</style>
        </div>
    );
};

export default SmartphonePlatform;