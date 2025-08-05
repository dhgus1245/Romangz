import React, { useState, useEffect } from 'react';
import { Heart, ArrowLeft, Trophy, Smartphone } from 'lucide-react';
import SafeImage from '../../SafeImage';


const PbtiSection = () => {
    const [currentStep, setCurrentStep] = useState('intro'); // 'intro', 'test', 'result'
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [pbtiResult, setPbtiResult] = useState(null); // 결과 저장용

    const questions = [
        {
            id: 1,
            question: "눈 뜨자마자 핸드폰으로 가장 먼저 하는 것은?\n",
            image: "/image/phone/pbti/question1.jpg",
            options: [
                {text: "카카오톡, 인스타그램 등 SNS 알림 확인", code: "S"},
                {text: "오늘의 일정, 메일 등 확인한다", code: "W"},
                {text: "알람만 끄고 다른 일을 한다", code: "B"}
            ]
        },
        {
            id: 2,
            question: "아침 출근/등교길의 나의 모습은?\n",
            image: "/image/phone/pbti/question2.jpg",
            options: [
                {text: "유튜브, 넷플릭스 등 영상 시청한다", code: "V"},
                {text: "게임접속 보상 받고, 일일 퀘스트 클리어한다", code: "G"},
                {text: "뉴스, 커뮤니티로 오늘의 이슈를 확인한다", code: "I"}
            ]
        },
        {
            id: 3,
            question: "무사히 출근/등교를 완료했다. \n하루 동안 핸드폰으로 가장 많이 하는 일은?",
            image: "/image/phone/pbti/question3.jpg",
            options: [
                {text: "업무/공부할 때 사용한다", code: "W"},
                {text: "연락올 때 말고 핸드폰 잘 보지 않는다", code: "D"},
                {text: "AI를 활용해 생산성 있는 하루를 보낸다", code: "H,I"}
            ]
        },
        {
            id: 4,
            question: "드디어 주말이다! \n오늘 하루종일 핸드폰으로 나는?",
            image: "/image/phone/pbti/question4.jpg",
            options: [
                {text: "밀린 드라마, 유튜브 정주행 한다", code: "V"},
                {text: "오늘 간 맛집, 카페 등을 사진으로 기록한다", code: "P,S"},
                {text: "이벤트 기간 놓칠 수 없지. 주말에 풀접속!", code: "G"}
            ]
        },
        {
            id: 5,
            question: "내일 만나기로 한 친구들과의 단톡방에서 나의 역할은?\n",
            image: "/image/phone/pbti/question5.jpg",
            options: [
                {text: "맛집 정보와 링크를 계속 보낸다", code: "I"},
                {text: "약속 날짜와 장소를 정리하고, 일정을 등록한다", code: "W"},
                {text: "각종 이모티콘과 유행어를 던진다", code: "S"}
            ]
        },
        {
            id: 6,
            question: "친구들과 함께 맛집에 왔다. \n인증샷 찍을 때 가장 중요한 것은?",
            image: "/image/phone/pbti/question6.jpg",
            options: [
                {text: "전문가가 찍은 것 같은 퀄리티가 나와야한다", code: "P"},
                {text: "빠른 포커싱과 셔터 속도가 제일 중요하다", code: "H"},
                {text: "그냥 보이는 대로 찍는다", code: "D"}
            ]
        },
        {
            id: 7,
            question: "찍은 사진을 확인하러 앨범에 들어갔다. \n내 앨범에 가장 많은 사진은?",
            image: "/image/phone/pbti/question7.jpg",
            options: [
                {text: "풍경, 음식, 여행 등 다양한 인증샷", code: "P"},
                {text: "유용한 정보 스크린샷", code: "I"},
                {text: "사진이 거의 없다", code: "D"}
            ]
        },
        {
            id: 8,
            question: "집에 가는 길에 배터리가 10% 남았다. \n그래도 포기 못하는 어플은?",
            image: "/image/phone/pbti/question8.jpg",
            options: [
                {text: "유튜브, 넷플릭스 등 영상 콘텐츠", code: "V"},
                {text: "카카오톡, 인스타그램 등 SNS", code: "S"},
                {text: "모바일 게임", code: "G"}
            ]
        },
        {
            id: 9,
            question: "친구가 보내준 사진을 저장하려는데, \n저장공간이 부족하다. 나의 행동은?",
            image: "/image/phone/pbti/question9.jpg",
            options: [
                {text: "앨범을 정리한다", code: "P"},
                {text: "오프라인 저장되어있는 영상을 삭제한다", code: "V"},
                {text: "클라우드를 유료 결제한다", code: "H"}
            ]
        },
        {
            id: 10,
            question: "최신 스마트폰이 출시되면?\n",
            image: "/image/phone/pbti/question10.jpg",
            options: [
                {text: "신기능, 전체적인 사양 등 꼼꼼히 확인", code: "H"},
                {text: "디자인, 색상 옵션이 내 스타일인지 확인한다", code: "S"},
                {text: "관심 없음. 지금 쓰는 핸드폰이 최고다", code: "D"}
            ]
        },
        {
            id: 11,
            question: "핸드폰을 새로 샀다. \n가장 먼저 할 일은?",
            image: "/image/phone/pbti/question11.jpg",
            options: [
                {text: "이전 핸드폰과 카메라 화질, 색감을 비교해본다", code: "H"},
                {text: "어플, 메모 등 필요한 자료를 먼저 동기화한다", code: "W,I"},
                {text: "영상, 게임 틀어놓고 해상도랑 주사율 확인한다", code: "G,V"}
            ]
        },
        {
            id: 12,
            question: "만약 스마트폰 없이 하루를 보내야 한다면, \n가장 불편한 것은?",
            image: "/image/phone/pbti/question12.jpg",
            options: [
                {text: "매일 접속해야되는 게임이 계속 신경 쓰인다", code: "G"},
                {text: "업무 연락이나 일정 확인을 못해서 불편하다", code: "W"},
                {text: "자주 쓰던 기능이랑 어플 사용을 못해서 답답하다", code: "H"}
            ]
        }
    ];

    const handleAnswerSelect = (selectedOption) => {
        const newAnswers = [...answers, selectedOption.code];
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setCurrentStep('result');
        }
    };

    const getResultCode = () => {
        const score = [1, 1, 1.5, 1.5, 1, 1, 1, 1, 1, 2, 2, 1];
        const phoneTypes = [
            { index: 1, code: "H", code_nm: "하드유저형", score: 0 },
            { index: 2, code: "D", code_nm: "기본형", score: 0 },
            { index: 3, code: "W", code_nm: "업무용", score: 0 },
            { index: 4, code: "I", code_nm: "정보형", score: 0 },
            { index: 5, code: "S", code_nm: "SNS형", score: 0 },
            { index: 6, code: "P", code_nm: "사진형", score: 0 },
            { index: 7, code: "G", code_nm: "게임형", score: 0 },
            { index: 8, code: "V", code_nm: "영상형", score: 0 },
        ];

        answers.forEach((codeStr, index) => {
            const weight = score[index];
            const codes = codeStr.split(',');
            codes.forEach(code => {
                const type = phoneTypes.find(t => t.code === code);
                if (type) {
                    type.score += weight;
                }
            });
        });

        phoneTypes.sort((a, b) => {
            if (b.score === a.score) return a.index - b.index;
            return b.score - a.score;
        });

        return phoneTypes[0].code;
    };

    const getResultPBTI = async (resultCode) => {
        try {
            const response = await fetch(`http://192.168.16.1:8080/phone/pbti?pcode=${encodeURIComponent(resultCode)}`);
            const result = await response.json();
            // console.log(result);
            return result;
        } catch (e) {
            console.error("PBTI 결과 가져오기 실패:", e);
            return null;
        }
    };

    const resetTest = () => {
        setCurrentStep('intro');
        setCurrentQuestion(0);
        setAnswers([]);
        setPbtiResult(null);
    };

    // 'result'일 때만 실행되는 useEffect
    useEffect(() => {
        const fetchResult = async () => {
            if (currentStep === 'result' && pbtiResult === null) {
                const resultCode = getResultCode();
                const result = await getResultPBTI(resultCode);
                setPbtiResult(result);
            }
        };
        fetchResult();
    }, [currentStep, pbtiResult]);

    // 테스트 화면
    if (currentStep === 'test') {
        const question = questions[currentQuestion];
        const progress = ((currentQuestion + 1) / questions.length) * 100;

        return (
            <section id="pbti" style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: window.innerWidth <= 768 ? '15px' : '20px',
                // background: 'linear-gradient(135deg, #667eea, #764ba2)'
            }}>
                <div style={{
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(15px)',
                    borderRadius: '30px',
                    padding: window.innerWidth <= 768 ? '25px 20px' : '40px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    maxWidth: '600px',
                    width: '100%',
                    textAlign: 'center',
                    position: 'relative',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}>
                    {/* 뒤로가기 버튼 */}
                    <button
                        onClick={() => setCurrentStep('intro')}
                        style={{
                            position: 'absolute',
                            top: '15px',
                            left: '15px',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#666'
                        }}
                    >
                        <ArrowLeft size={window.innerWidth <= 768 ? 20 : 24}/>
                    </button>

                    {/* 진행률 표시 */}
                    <div style={{
                        background: '#f0f0f0',
                        borderRadius: '10px',
                        height: '8px',
                        marginBottom: '25px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            height: '100%',
                            width: `${progress}%`,
                            transition: 'width 0.5s ease',
                            borderRadius: '10px'
                        }}/>
                    </div>

                    <div style={{
                        fontSize: window.innerWidth <= 768 ? '14px' : '16px',
                        color: '#667eea',
                        marginBottom: '20px',
                        fontWeight: 'bold'
                    }}>
                        {currentQuestion + 1}/12
                    </div>

                    {/* 하트 테두리 박스 */}
                    <div style={{
                        border: '3px solid #667eea',
                        borderRadius: '25px',
                        padding: window.innerWidth <= 768 ? '20px 15px' : '30px 25px',
                        marginBottom: '25px',
                        background: 'white',
                        position: 'relative'
                    }}>
                        {/* 상단 하트 장식 */}
                        <div style={{
                            position: 'absolute',
                            top: '-12px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'white',
                            padding: '0 10px'
                        }}>
                            <Heart size={window.innerWidth <= 768 ? 16 : 20} color="#667eea" fill="#667eea"/>
                        </div>

                        {/* 이미지 컨테이너 - 통일된 크기 */}
                        <div style={{
                            width: window.innerWidth <= 768 ? '150px' : '200px',
                            height: window.innerWidth <= 768 ? '120px' : '150px',
                            margin: '0 auto 15px',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            border: '2px solid #f0f0f0',
                            background: '#f8f9fa'
                        }}>
                            <img
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                                src={question.image}
                                alt={`질문 ${question.id}`}
                            />
                        </div>

                        <h3 style={{
                            fontSize: window.innerWidth <= 768 ? '16px' : '18px',
                            color: '#333',
                            marginBottom: '-10px',
                            lineHeight: '1.4'
                        }}>
                            {question.question.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                            <br />
                            </React.Fragment>
                            ))}
                        </h3>
                    </div>

                    {/* 답변 버튼들 (세로 배치) */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: window.innerWidth <= 768 ? '12px' : '15px'
                    }}>
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(option)}
                                style={{
                                    background: index % 2 === 0 ?
                                        'linear-gradient(45deg, #667eea, #764ba2)' :
                                        'linear-gradient(45deg, #764ba2, #667eea)',
                                    color: 'white',
                                    border: 'none',
                                    padding: window.innerWidth <= 768 ? '15px 20px' : '18px 25px',
                                    borderRadius: '15px',
                                    fontSize: window.innerWidth <= 768 ? '14px' : '16px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                                    width: '100%'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                                }}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
    // 결과 렌더링
    if (currentStep === 'result') {
        if (!pbtiResult) {
            return (
                <section style={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: '#fff'
                }}>
                    <p>결과를 불러오는 중입니다...</p>
                </section>
            );
        }

        const result = pbtiResult;
        return (
            <section id="pbti" style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: window.innerWidth <= 768 ? '15px' : '20px',
                // background: 'linear-gradient(135deg, #667eea, #764ba2)'
            }}>
                <div style={{
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(15px)',
                    borderRadius: '30px',
                    padding: window.innerWidth <= 768 ? '30px 25px' : '50px 40px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    maxWidth: '600px',
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '-10px' }}>
                        <Trophy size={window.innerWidth <= 768 ? 40 : 48} color={result.pbti.color} />
                    </div>
                    <h2 style={{ fontSize: window.innerWidth <= 768 ? '24px' : '32px', color: result.pbti.color, marginBottom: '15px', fontWeight: 'bold' }}>
                        {result.pbti.code_nm}
                    </h2>

                    {/* 결과 이미지 - 통일된 크기와 스타일 적용 */}
                    <div style={{
                        width: window.innerWidth <= 768 ? '150px' : '200px',
                        height: window.innerWidth <= 768 ? '150px' : '200px',
                        margin: '30px auto',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: `4px solid ${result.pbti.color}`,
                        boxShadow: `0 8px 25px ${result.pbti.color}40`,
                        background: 'white'
                    }}>
                        <img
                            src={`/image/phone/pbti/${result.pbti.img}`}
                            alt="PBTI 결과 이미지"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>

                    <div style={{
                        background: `${result.pbti.color}15`,
                        borderRadius: '20px',
                        padding: window.innerWidth <= 768 ? '20px' : '25px',
                        marginBottom: '25px'
                    }}>
                        <h3 style={{fontSize: window.innerWidth <= 768 ? '18px' : '20px', color: result.pbti.color, marginBottom: '15px'}}>
                            📋 주요 특징
                        </h3>
                        <div style={{
                            background: 'white',
                            padding: '15px 20px',
                            borderRadius: '10px',
                            margin: '8px 0',
                            fontSize: window.innerWidth <= 768 ? '13px' : '14px',
                            color: '#333',
                            lineHeight: '1.5'
                        }}>
                            {result.pbti.desc}
                        </div>
                    </div>

                    {/* 추천 기기 섹션 */}
                    <div style={{
                        background: `${result.pbti.color}10`,
                        borderRadius: '15px',
                        padding: window.innerWidth <= 768 ? '15px' : '20px',
                        marginBottom: '25px'
                    }}>
                        <Smartphone size={window.innerWidth <= 768 ? 20 : 24} color={result.pbti.color} style={{marginBottom: '10px'}}/>
                        <h4 style={{color: result.pbti.color, marginBottom: '15px', fontSize: window.innerWidth <= 768 ? '16px' : '18px'}}>추천 기기</h4>

                        {/* 추천 기기 3개 컨테이너 */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            gap: window.innerWidth <= 768 ? '10px' : '15px',
                            flexWrap: 'wrap'
                        }}>
                            {result.resultModel.map(([idx, model, modelKo, img], i) => (
                                <div key={idx}>
                                    <div style={{
                                        width: window.innerWidth <= 768 ? '60px' : '80px',
                                        height: window.innerWidth <= 768 ? '60px' : '80px',
                                        margin: '0 auto 10px',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        background: '#f8f9fa'
                                    }}>
                                        <SafeImage
                                            src={img ? `/image/phone/${img}` : undefined}
                                            alt={modelKo}
                                            fallback="/image/phone/error.jpg"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>
                                    <div style={{
                                        fontSize: window.innerWidth <= 768 ? '10px' : '12px',
                                        fontWeight: 'bold',
                                        color: '#333',
                                        textAlign: 'center'
                                    }}>
                                        {modelKo}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={resetTest}
                        style={{
                            background: `linear-gradient(45deg, ${result.pbti.color}, ${result.pbti.color}dd)`,
                            color: 'white',
                            border: 'none',
                            padding: window.innerWidth <= 768 ? '12px 25px' : '15px 30px',
                            borderRadius: '25px',
                            fontSize: window.innerWidth <= 768 ? '14px' : '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease',
                            boxShadow: `0 5px 15px ${result.pbti.color}40`,
                            width: window.innerWidth <= 768 ? '100%' : 'auto'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        다시 테스트하기
                    </button>
                </div>
            </section>
        );
    }

    // 인트로 화면
    return (
        <section id="pbti" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            // background: 'linear-gradient(135deg, #667eea, #764ba2)'
        }}>
            <div style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '30px',
                padding: window.innerWidth <= 768 ? '40px 20px' : '60px 40px',
                border: '1px solid rgba(255,255,255,0.2)',
                maxWidth: '800px',
                width: '100%',
                textAlign: 'center'
            }}>
                <h2 style={{
                    fontSize: window.innerWidth <= 768 ? '24px' : '36px',
                    color: 'white',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '15px',
                    flexWrap: 'wrap'
                }}>
                    🌹 나의 유형은... 두근두근 🌹
                </h2>

                <div style={{
                    background: 'rgba(255,255,255,0.95)',
                    borderRadius: '20px',
                    padding: window.innerWidth <= 768 ? '30px 20px' : '40px',
                    margin: '30px 0',
                    color: '#333',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)'
                }}>
                    <h3 style={{fontSize: window.innerWidth <= 768 ? '22px' : '28px', marginBottom: '20px', color: '#333'}}>
                        📱 PBTI 테스트
                    </h3>
                    <img style={{width: window.innerWidth <= 768 ? '80px' : '100px'}} src="/image/phone/dr_oh.png"/>
                    <p style={{fontSize: window.innerWidth <= 768 ? '14px' : '16px', marginBottom: '30px', color: '#555', lineHeight: '1.5'}}>
                        바깥은 혼자 돌아다니기엔 위험하단다!<br/>
                        유형을 분석해보고 이 아이들 중 하나를 데리고가렴
                    </p>

                    <div style={{
                        background: 'white',
                        borderRadius: '15px',
                        padding: window.innerWidth <= 768 ? '20px' : '30px',
                        marginBottom: '20px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }}>
                        <h4 style={{fontSize: window.innerWidth <= 768 ? '16px' : '18px', marginBottom: '20px', color: '#333'}}>
                            📱 8가지 유형으로 분석해드려요!
                        </h4>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: window.innerWidth <= 768 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                            gap: window.innerWidth <= 768 ? '10px' : '15px',
                            marginBottom: '30px'
                        }}>
                            {[
                                {icon: '📱', text: '하드유저형', color: '#ff6b6b'},
                                {icon: '📞', text: '기본형', color: '#4ecdc4'},
                                {icon: '💼', text: '업무형', color: '#45b7d1'},
                                {icon: '📚', text: '정보형', color: '#96ceb4'},
                                {icon: '💕', text: 'SNS형', color: '#ffeaa7'},
                                {icon: '📸', text: '사진형', color: '#fd79a8'},
                                {icon: '🎮', text: '게임형', color: '#a29bfe'},
                                {icon: '🎬', text: '영상형', color: '#e17055'}
                            ].map((option, index) => (
                                <div
                                    key={index}
                                    style={{
                                        background: option.color,
                                        padding: window.innerWidth <= 768 ? '12px 8px' : '15px',
                                        borderRadius: '10px',
                                        textAlign: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        transform: 'scale(1)',
                                        transition: 'transform 0.2s',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '8px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                                    }}
                                >
                                    <div style={{fontSize: window.innerWidth <= 768 ? '20px' : '24px'}}>{option.icon}</div>
                                    <div style={{fontSize: window.innerWidth <= 768 ? '11px' : '14px'}}>{option.text}</div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentStep('test')}
                            style={{
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                color: 'white',
                                border: 'none',
                                padding: window.innerWidth <= 768 ? '12px 24px' : '15px 30px',
                                borderRadius: '25px',
                                fontSize: window.innerWidth <= 768 ? '14px' : '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease',
                                boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)',
                                width: window.innerWidth <= 768 ? '100%' : 'auto'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            PBTI 테스트 시작하기
                        </button>
                    </div>

                    <div style={{fontSize: window.innerWidth <= 768 ? '12px' : '14px', color: '#666', marginTop: '20px'}}>
                        ✨ 총 12개 문항으로 진행됩니다
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PbtiSection;