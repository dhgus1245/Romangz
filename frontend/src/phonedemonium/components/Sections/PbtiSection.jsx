import React, { useState, useEffect } from 'react';
import { Heart, ArrowLeft, Trophy, Wand2, Smartphone } from 'lucide-react';
import SafeImage from '../../SafeImage';

const PbtiSection = ({scrollToSection, isMobile, styles}) => {

    const [pbtiInfo, setPbtiInfo] = useState([
        {index: 1, icon: '📱', code: "H", code_nm: "하드유저형", score: 0, color: '#bbe4de', img: 'main_h.PNG'},
        {index: 2, icon: '📞', code: "D", code_nm: "기본형", score: 0, color: '#bbe4de', img: 'main_d.PNG'},
        {index: 3, icon: '💼', code: "W", code_nm: "업무용", score: 0, color: '#bbe4de', img: 'main_w.PNG'},
        {index: 4, icon: '📚', code: "I", code_nm: "정보형", score: 0, color: '#bbe4de', img: 'main_i.PNG'},
        {index: 5, icon: '💕', code: "S", code_nm: "SNS형", score: 0,  color: '#bbe4de', img: 'main_s.PNG'},
        {index: 6, icon: '📸', code: "P", code_nm: "사진형", score: 0, color: '#bbe4de', img: 'main_p.PNG'},
        {index: 7, icon: '🎮', code: "G", code_nm: "게임형", score: 0, color: '#bbe4de', img: 'main_g.PNG'},
        {index: 8, icon: '🎬', code: "V", code_nm: "영상형", score: 0, color: '#bbe4de', img: 'main_v.PNG'}
    ]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentStep, setCurrentStep] = useState('intro'); // 'intro', 'test', 'result'
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pbtiResult, setPbtiResult] = useState(null); // 결과 저장용

    const questions = [
        {
            id: 1,
            question: "눈 뜨자마자 핸드폰으로 가장 먼저 하는 것은?",
            image: "/image/phone/pbti/question1.jpg",
            options: [
                {text: "카카오톡, 인스타그램 등 SNS 알림 확인", code: "S"},
                {text: "오늘의 일정, 메일 등 확인한다", code: "W"},
                {text: "알람만 끄고 다른 일을 한다", code: "B"}
            ]
        },
        {
            id: 2,
            question: "아침 출근/등교길의 나의 모습은?",
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
            question: "내일 만나기로 한 친구들과의 단톡방에서 나의 역할은?",
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
            question: "최신 스마트폰이 출시되면?",
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

        answers.forEach((codeStr, index) => {
            const weight = score[index];
            const codes = codeStr.split(',');
            codes.forEach(code => {
                const type = pbtiInfo.find(t => t.code === code);
                if (type) {
                    type.score += weight;
                }
            });
        });

        pbtiInfo.sort((a, b) => {
            if (b.score === a.score) return a.index - b.index;
            return b.score - a.score;
        });

        return pbtiInfo[0].code;
    };

    const getResultPBTI = async (resultCode) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://192.168.16.1:8080/phone/pbti?pcode=${encodeURIComponent(resultCode)}`);
            const result = await response.json();
            // console.log(result);
            return result;
        } catch (e) {
            console.error("PBTI 결과 가져오기 실패:", e);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const resetTest = () => {
        setCurrentStep('intro');
        setCurrentQuestion(0);
        setAnswers([]);
        setPbtiResult(null);
        setIsLoading(false);
        setPbtiInfo(prev =>
            prev
                .map(item => ({ ...item, score: 0 })) // 모든 score 초기화
                .sort((a, b) => a.index - b.index)   // index 기준 정렬
        );
        scrollToSection('pbti');
    };

    useEffect(() => {
        const fetchResult = async () => {
            if (pbtiResult === null) {
                const resultCode = getResultCode();
                const result = await getResultPBTI(resultCode);
                setPbtiResult(result);
            }
        };

        // intro일 때만 실행
        if(currentStep === 'intro'){
            //자동 슬라이드 효과
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pbtiInfo.length);
            }, 2000); //
            return () => clearInterval(interval);
        }
        if(currentStep === 'result'){
            fetchResult();
        }
    }, [currentStep, pbtiResult, isLoading]);

    // 인트로 화면 렌더링 함수
    const renderIntroContent = () => (
        <>
            <div style={{
                textAlign: 'center',
                marginBottom: '40px',
                color: 'white'
            }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: isMobile ? '40px':'60px',
                    height: isMobile ? '40px':'60px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    marginBottom: '10px',
                }}>
                    <Wand2 style={{width: isMobile ? '20px':'30px', height: isMobile ? '20px':'30px'}}/>
                </div>
                <h1 style={{
                    fontSize: isMobile ? '20px' : '32px',
                    fontWeight: 'bold',
                    // marginBottom: '12px'
                }}>
                    취향저격! <br/> 맞춤형 휴대폰 추천 테스트
                </h1>
            </div>

            <div style={{
                ...styles.contentBlock,
                backgroundColor: "#bbe4de"
            }}>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: isMobile ? '350px' : '500px', // 최대 크기 제한
                    height: isMobile ? '350px' : '500px', // 500x500에 맞게 조정
                    margin: '0 auto 30px', // 중앙 정렬
                    borderRadius: '20px',
                    overflow: 'hidden',
                    // boxShadow: '0 12px 35px rgba(0,0,0,0.15)'
                }}>
                    {pbtiInfo.map((img, index) => (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                opacity: index === currentImageIndex ? 1 : 0,
                                transition: 'opacity 0.8s ease-in-out',
                                background: `linear-gradient(135deg, ${img.color}, ${img.color}dd)`, // 각 타입의 색상 사용
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            {/* 실제 이미지 */}
                            <img
                                src={`/image/phone/pbti/${img.img}`}
                                alt={img.code_nm}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    objectPosition: 'center'
                                }}
                            />

                            {/* 이미지 위에 텍스트 오버레이 (선택사항) */}
                            {/*<div style={{*/}
                            {/*    position: 'absolute',*/}
                            {/*    bottom: '60px', // 인디케이터 위에 위치*/}
                            {/*    left: '50%',*/}
                            {/*    transform: 'translateX(-50%)',*/}
                            {/*    color: 'white',*/}
                            {/*    textAlign: 'center',*/}
                            {/*    background: 'rgba(0,0,0,0.5)', // 반투명 배경*/}
                            {/*    padding: '10px 20px',*/}
                            {/*    borderRadius: '25px',*/}
                            {/*    backdropFilter: 'blur(5px)'*/}
                            {/*}}>*/}
                            {/*    <div style={{*/}
                            {/*        fontSize: isMobile ? '16px' : '20px',*/}
                            {/*        fontWeight: 'bold'*/}
                            {/*    }}>*/}
                            {/*        {img.icon} {img.code_nm}*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    ))}

                    {/*/!* 슬라이드 인디케이터 *!/*/}
                    {/*<div style={{*/}
                    {/*    position: 'absolute',*/}
                    {/*    bottom: '20px',*/}
                    {/*    left: '50%',*/}
                    {/*    transform: 'translateX(-50%)',*/}
                    {/*    display: 'flex',*/}
                    {/*    gap: '10px'*/}
                    {/*}}>*/}
                    {/*    {pbtiInfo.map((_, index) => (*/}
                    {/*        <div*/}
                    {/*            key={index}*/}
                    {/*            style={{*/}
                    {/*                width: '10px',*/}
                    {/*                height: '10px',*/}
                    {/*                borderRadius: '50%',*/}
                    {/*                background: index === currentImageIndex ? 'white' : 'rgba(255,255,255,0.5)',*/}
                    {/*                transition: 'all 0.3s ease'*/}
                    {/*            }}*/}
                    {/*        />*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                </div>

                {/* 유형 그리드 */}
                {/*<div style={{*/}
                {/*    display: 'grid',*/}
                {/*    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',*/}
                {/*    gap: isMobile ? '10px' : '15px',*/}
                {/*    marginBottom: '30px'*/}
                {/*}}>*/}
                {/*    {Array.isArray(pbtiInfo) && pbtiInfo.map((option) => (*/}
                {/*        <div*/}
                {/*            key={option.code} // index 대신 고유값 사용*/}
                {/*            style={{*/}
                {/*                background: option.color || '#ccc',*/}
                {/*                padding: isMobile ? '12px 8px' : '15px',*/}
                {/*                borderRadius: '10px',*/}
                {/*                textAlign: 'center',*/}
                {/*                color: 'white',*/}
                {/*                fontWeight: 'bold',*/}
                {/*                display: 'flex',*/}
                {/*                flexDirection: 'column',*/}
                {/*                alignItems: 'center',*/}
                {/*                gap: '8px',*/}
                {/*                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            <div style={{fontSize: isMobile ? '20px' : '24px'}}>*/}
                {/*                {option.icon}*/}
                {/*            </div>*/}
                {/*            <div style={{fontSize: isMobile ? '11px' : '14px'}}>*/}
                {/*                {option.code_nm}*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}

                {/* 시작 버튼 */}
                <button
                    onClick={() => setCurrentStep('test')}
                    style={{
                        background: 'linear-gradient(45deg, #8fd6cc, #5eb7a5)',
                        color: 'white',
                        border: 'none',
                        padding: isMobile ? '16px 32px' : '18px 40px',
                        borderRadius: '25px',
                        fontSize: isMobile ? '16px' : '18px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 8px 25px rgba(94, 183, 165, 0.3)',
                        width: isMobile ? '100%' : 'auto',
                        minWidth: '200px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 12px 35px rgba(94, 183, 165, 0.4)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(94, 183, 165, 0.3)';
                    }}
                >
                    <span style={{
                      position: 'relative',
                      zIndex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}>
                    테스트 시작하기
                    </span>
                </button>

                <div style={{fontSize: isMobile ? '12px' : '14px', color: '#666', marginTop: '20px'}}>
                    ✨ 총 12개 문항으로 진행됩니다
                </div>
            </div>

        </>
    );

    // 테스트 화면 렌더링 함수
    const renderTestContent = () => {
        const question = questions[currentQuestion];
        const progress = ((currentQuestion + 1) / questions.length) * 100;

        return (
            <div style={styles.contentBlock}>
                {/* 뒤로가기 버튼 */}
                <div
                    onClick={() => setCurrentStep('intro')}
                    style={{
                        background: 'rgba(255,255,255,0.8)',
                        border: 'none',
                        outline: 'none',
                        cursor: 'pointer',
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        marginBottom: '10px',
                        boxShadow: 'none',          // 기본 그림자 제거
                        WebkitTapHighlightColor: 'transparent' // 모바일 하이라이트 제거
                    }}
                    onMouseDown={(e) => e.preventDefault()} // 클릭시 포커스 제거
                    onFocus={(e) => e.currentTarget.style.boxShadow = 'none'} // 포커스 시 그림자 제거
                    onBlur={(e) => e.currentTarget.style.boxShadow = 'none'}  // 블러 시 그림자 제거
                >
                    <ArrowLeft size={isMobile ? 12 : 24}
                               style={{ margin: isMobile ? "4px" : "8px" }}/>
                    <span style={{fontSize: isMobile ? '10px' : '16px',}}>처음으로</span>
                </div>

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

                {/* 문항 번호 */}
                <div style={{
                    fontSize: isMobile ? '14px' : '16px',
                    color: '#667eea',
                    marginBottom: '20px',
                    fontWeight: 'bold'
                }}>
                    {currentQuestion + 1}/12
                </div>

                {/* 질문 박스 */}
                <div style={{
                    border: '3px solid #667eea',
                    borderRadius: '25px',
                    padding: isMobile ? '20px 15px' : '30px 25px',
                    marginBottom: '25px',
                    background: 'white',
                    position: 'relative'
                }}>
                    {/* 하트 장식 */}
                    <div style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'white',
                        padding: '0 10px'
                    }}>
                        <Heart size={isMobile ? 16 : 20} color="#667eea" fill="#667eea"/>
                    </div>

                    {/* 질문 이미지 */}
                    <div style={{
                        width: isMobile ? '200px' : '330px',
                        height: isMobile ? '200px' : '330px',
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

                    {/* 질문 텍스트 */}
                    <h3 style={{
                        fontSize: isMobile ? '12px' : '18px',
                        color: '#333',
                        marginBottom: '10px',
                        lineHeight: '1.4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        height: isMobile ? '44px' : '50px', // 최대 예상 줄 수에 맞춰 고정
                    }}>
                        {question.question.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                {index < question.question.split('\n').length - 1 && <br/>}
                            </React.Fragment>
                        ))}
                    </h3>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? '12px' : '15px'
                }}>
                    {question.options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleAnswerSelect(option)}
                            style={{
                                background: index % 2 === 0 ?
                                    'linear-gradient(45deg, #667eea, #764ba2)' :
                                    'linear-gradient(45deg, #764ba2, #667eea)',
                                color: 'white',
                                border: 'none',
                                padding: isMobile ? '15px 20px' : '18px 25px',
                                borderRadius: '15px',
                                fontSize: isMobile ? '10px' : '16px',
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
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // 결과 화면 렌더링 함수
    const renderResultContent = () => {
        // 로딩 중일 때
        if (isLoading || !pbtiResult) {
            return (
                <div style={styles.contentBlock}>
                    <style>
                        {`
                        @keyframes spin {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                    `}
                    </style>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                        color: 'white'
                    }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            border: '5px solid rgba(255,255,255,0.3)',
                            borderTop: '5px solid white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }}></div>
                        <p style={{fontSize: isMobile ? '16px' : '18px'}}>결과를 불러오는 중입니다...</p>
                    </div>
                </div>
            );
        }

        const result = pbtiResult;
        return (
            <div style={styles.contentBlock}>
                {/* 트로피 아이콘 */}
                <div style={{fontSize: '48px', margin: '-10px'}}>
                    <Trophy size={isMobile ? 25 : 40} color={result.pbti.color}/>
                </div>

                {/* 결과 타이틀 */}
                <h2 style={{
                    fontSize: isMobile ? '15px' : '24px',
                    color: result.pbti.color,
                    fontWeight: 'bold'
                }}>
                    {result.pbti.code_nm}
                </h2>

                {/* 결과 이미지 */}
                <div style={{
                    width: isMobile ? '200px' : '300px',
                    height: isMobile ? '200px' : '300px',
                    margin: isMobile ? '15px auto' : '30px auto',
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

                {/* 주요 특징 섹션 */}
                <div style={{
                    background: `${result.pbti.color}15`,
                    borderRadius: '20px',
                    padding: isMobile ? '15px' : '20px',
                    marginBottom: '25px'
                }}>
                    <h3 style={{
                        fontSize: isMobile ? '12px' : '18px',
                        color: result.pbti.color,
                        marginBottom: '15px'
                    }}>
                        📋 주요 특징
                    </h3>
                    <div
                        style={{
                            background: 'white',
                            padding: '15px',
                            borderRadius: '10px',
                            fontSize: isMobile ? '12px' : '14px',
                            color: '#333',
                            lineHeight: '1.5'
                        }}
                        dangerouslySetInnerHTML={{__html: result.pbti.desc}}
                    />
                </div>

                {/* 추천 기기 섹션 */}
                <div style={{
                    background: `${result.pbti.color}10`,
                    borderRadius: '15px',
                    padding: isMobile ? '15px' : '20px',
                    marginBottom: '25px'
                }}>
                    <Smartphone size={isMobile ? 15 : 24} color={result.pbti.color}/>
                    <h4 style={{
                        color: result.pbti.color,
                        marginBottom: '15px',
                        fontSize: isMobile ? '12px' : '18px'
                    }}>
                        추천 기기
                    </h4>

                    {/* 추천 기기 목록 */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        gap: isMobile ? '10px' : '15px',
                        flexWrap: 'wrap'
                    }}>
                        {result.resultModel.map(([idx, model, modelKo, img]) => (
                            <div key={idx}>
                                <div style={{
                                    width: isMobile ? '50px' : '80px',
                                    height: isMobile ? '50px' : '80px',
                                    margin: '0 auto 10px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    background: '#f8f9fa'
                                }}>
                                    <SafeImage
                                        src={img ? `/image/phone/model/${img}` : undefined}
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
                                    fontSize: isMobile ? '8px' : '12px',
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

                {/* 다시 테스트하기 버튼 */}
                <button
                    onClick={resetTest}
                    style={{
                        background: `linear-gradient(45deg, ${result.pbti.color}, ${result.pbti.color}dd)`,
                        color: 'white',
                        border: 'none',
                        padding: isMobile ? '12px 25px' : '15px 30px',
                        borderRadius: '25px',
                        fontSize: isMobile ? '12px' : '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        boxShadow: `0 5px 15px ${result.pbti.color}40`,
                        width: isMobile ? '100%' : 'auto'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    다시 테스트하기
                </button>
            </div>
        );
    };

    // 컨텐츠 렌더링 함수 (currentStep에 따라 분기)
    const renderContent = () => {
        switch (currentStep) {
            case 'intro':
                return renderIntroContent();
            case 'test':
                return renderTestContent();
            case 'result':
                return renderResultContent();
            default:
                return renderIntroContent();
        }
    };

    return (
        <section id="pbti" style={styles.sectionBlock}>
            <div style={styles.containerBlock}>
                {renderContent()}
            </div>
        </section>
    );

};

export default PbtiSection;