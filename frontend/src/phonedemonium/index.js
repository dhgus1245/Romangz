import React, { useState } from 'react';
import { Camera, Upload, Smartphone, Star, TrendingUp } from 'lucide-react';

const PhoneGradingApp = () => {
    const [frontImage, setFrontImage] = useState(null);
    const [backImage, setBackImage] = useState(null);
    const [phoneModel, setPhoneModel] = useState('아이폰 11');
    const [storage, setStorage] = useState('128GB');
    const [years, setYears] = useState('3년');
    const [country, setCountry] = useState('국내');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);

    const phoneModels = ['아이폰 11', '아이폰 12', '아이폰 13', '아이폰 14', '갤럭시 S21', '갤럭시 S22'];
    const storageOptions = ['64GB', '128GB', '256GB', '512GB'];
    const yearOptions = ['1년', '2년', '3년', '4년', '5년 이상'];
    const countryOptions = ['국내', '해외'];

    const handleImageUpload = (type, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (type === 'front') {
                    setFrontImage(e.target.result);
                } else {
                    setBackImage(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    //React에서 FileReader로 읽은 이미지는 data URL이기 때문에, 이를 백엔드에 보내려면 Blob(File) 형태로 변환
    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const analyzePhone = async () => {
        if (!frontImage || !backImage) {
            alert('앞면과 뒷면 사진을 모두 업로드해주세요.');
            return;

        }
        //분석중으로 변경
        setIsAnalyzing(true);

        //실제 데이터 fetch
        const formData = new FormData();
        formData.append("frontImage", dataURLtoFile(frontImage, "front.jpg"));
        formData.append("backImage", dataURLtoFile(backImage, "back.jpg"));
        formData.append("phoneModel", phoneModel);
        formData.append("storage", storage);
        formData.append("years", years);
        formData.append("country", country);

        try {
            const response = await fetch("http://192.168.16.1:8080/phone/analyze", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("서버 오류");

            const result = await response.json();
            console.log("아들 : ", result);

            setResults({
                grade : '1등급',
                frontGrade: result.grade.front,
                backGrade: result.grade.back,
                description: '우하하'
            });

            // setResults(result);
        } catch (error) {
            console.error("분석 실패:", error);
            alert("서버와의 통신 중 오류가 발생했습니다.");
        } finally {
            setIsAnalyzing(false);
        }

        const gradeResults = {
            1: { grade: '1등급',avg_price: 625000, min_price: 500000, max_price: 700000, description: '거의 새 것 같은 상태' },
            2: { grade: '2등급',avg_price: 510000, min_price: 420000, max_price: 630000, description: '사용감이 조금 있는 상태' },
            3: { grade: '3등급',avg_price: 100000, min_price: 50000, max_price: 150000, description: '초전박살' }
        };

    };

    const ImageUploadBox = ({ type, image, onUpload }) => (
        <div style={{ position: 'relative' }}>
            <div style={{
                border: '2px dashed #d1d5db',
                borderRadius: '12px',
                padding: '32px',
                textAlign: 'center',
                backgroundColor: '#f9fafb',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                ':hover': {
                    borderColor: '#10b981'
                }
            }}>
                {image ? (
                    <div style={{ position: 'relative' }}>
                        <img
                            src={image}
                            alt={`휴대폰 ${type}`}
                            style={{
                                width: '100%',
                                height: '192px',
                                objectFit: 'cover',
                                borderRadius: '8px'
                            }}
                        />
                    </div>
                ) : (
                    <div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '16px'
                        }}>
                            <div style={{
                                padding: '16px',
                                backgroundColor: '#dcfce7',
                                borderRadius: '50%'
                            }}>
                                <Upload style={{ width: '32px', height: '32px', color: '#059669' }} />
                            </div>
                        </div>
                        <div>
                            <p style={{
                                fontSize: '18px',
                                fontWeight: '500',
                                color: '#374151',
                                marginBottom: '4px'
                            }}>
                                휴대폰 {type === 'front' ? '앞면' : '뒷면'} 사진
                            </p>
                            <p style={{
                                fontSize: '14px',
                                color: '#6b7280'
                            }}>
                                클릭하여 사진을 업로드하세요
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => onUpload(type, e)}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer'
                }}
            />
        </div>
    );

    const selectStyle = {
        padding: '12px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        fontSize: '14px',
        backgroundColor: 'white',
        outline: 'none',
        transition: 'all 0.3s ease'
    };

    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        marginBottom: '24px'
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)'
        }}>
            {/* Header */}
            <header style={{
                backgroundColor: 'white',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                borderBottom: '1px solid #e5e7eb'
            }}>
                <div style={{
                    maxWidth: '1152px',
                    margin: '0 auto',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{
                        padding: '8px',
                        backgroundColor: '#10b981',
                        borderRadius: '8px'
                    }}>
                        <Smartphone style={{ width: '24px', height: '24px', color: 'white' }} />
                    </div>
                    <h1 style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#1f2937'
                    }}>TEAM 사조</h1>
                </div>
            </header>

            <main style={{
                maxWidth: '1152px',
                margin: '0 auto',
                padding: '32px 16px'
            }}>
                {/* Title Section */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '48px'
                }}>
                    <h2 style={{
                        fontSize: '36px',
                        fontWeight: 'bold',
                        color: '#1f2937',
                        marginBottom: '16px'
                    }}>
                        스마트폰 이미지로 검색
                    </h2>
                    <p style={{
                        color: '#6b7280',
                        fontSize: '18px'
                    }}>
                        AI 기술로 휴대폰 상태를 분석하여 정확한 등급과 시세를 알려드립니다
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: window.innerWidth >= 1024 ? '1fr 1fr' : '1fr',
                    gap: '48px'
                }}>
                    {/* Left Panel - Form */}
                    <div>
                        {/* Phone Info */}
                        <div style={cardStyle}>
                            <h3 style={{
                                fontSize: '20px',
                                fontWeight: '600',
                                marginBottom: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <Smartphone style={{ width: '20px', height: '20px', color: '#059669' }} />
                                기기 정보
                            </h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '16px'
                            }}>
                                <select
                                    value={phoneModel}
                                    onChange={(e) => setPhoneModel(e.target.value)}
                                    style={selectStyle}
                                >
                                    {phoneModels.map(model => (
                                        <option key={model} value={model}>{model}</option>
                                    ))}
                                </select>
                                <select
                                    value={storage}
                                    onChange={(e) => setStorage(e.target.value)}
                                    style={selectStyle}
                                >
                                    {storageOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                <select
                                    value={years}
                                    onChange={(e) => setYears(e.target.value)}
                                    style={selectStyle}
                                >
                                    {yearOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    style={selectStyle}
                                >
                                    {countryOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div style={cardStyle}>
                            <h3 style={{
                                fontSize: '20px',
                                fontWeight: '600',
                                marginBottom: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <Camera style={{ width: '20px', height: '20px', color: '#059669' }} />
                                사진 업로드
                            </h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: window.innerWidth >= 768 ? '1fr 1fr' : '1fr',
                                gap: '16px'
                            }}>
                                <ImageUploadBox type="front" image={frontImage} onUpload={handleImageUpload} />
                                <ImageUploadBox type="back" image={backImage} onUpload={handleImageUpload} />
                            </div>
                        </div>

                        {/* Analyze Button */}
                        <button
                            onClick={analyzePhone}
                            disabled={isAnalyzing || !frontImage || !backImage}
                            style={{
                                width: '100%',
                                backgroundColor: (!frontImage || !backImage || isAnalyzing) ? '#d1d5db' : '#10b981',
                                color: 'white',
                                fontWeight: '600',
                                padding: '16px',
                                borderRadius: '12px',
                                border: 'none',
                                cursor: (!frontImage || !backImage || isAnalyzing) ? 'not-allowed' : 'pointer',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s ease',
                                fontSize: '16px'
                            }}
                            onMouseOver={(e) => {
                                if (!isAnalyzing && frontImage && backImage) {
                                    e.target.style.backgroundColor = '#059669';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!isAnalyzing && frontImage && backImage) {
                                    e.target.style.backgroundColor = '#10b981';
                                }
                            }}
                        >
                            {isAnalyzing ? (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}>
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        border: '2px solid transparent',
                                        borderTop: '2px solid white',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }}></div>
                                    <span>분석 중...</span>
                                </div>
                            ) : (
                                '검색'
                            )}
                        </button>
                    </div>

                    {/* Right Panel - Results */}
                    <div>
                        {results ? (
                            <>
                                {/* Grade Result */}
                                <div style={cardStyle}>
                                    <div style={{textAlign: 'center'}}>
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '80px',
                                            height: '80px',
                                            backgroundColor: '#dcfce7',
                                            borderRadius: '50%',
                                            marginBottom: '16px'
                                        }}>
                                            <Star style={{width: '40px', height: '40px', color: '#059669'}}/>
                                        </div>
                                        <h3 style={{
                                            fontSize: '36px',
                                            fontWeight: 'bold',
                                            color: '#1f2937',
                                            marginBottom: '8px'
                                        }}>
                                            앞면 : {results.frontGrade}등급
                                        </h3>
                                        <h3 style={{
                                            fontSize: '36px',
                                            fontWeight: 'bold',
                                            color: '#1f2937',
                                            marginBottom: '8px'
                                        }}>
                                            뒷면 : {results.backGrade}등급
                                        </h3>
                                        <p style={{
                                            color: '#6b7280',
                                            marginBottom: '16px'
                                        }}>{results.description}</p>
                                        <div style={{
                                            padding: '16px',
                                            backgroundColor: '#f0fdf4',
                                            borderRadius: '8px',
                                            marginTop: '16px'
                                        }}>
                                            <p style={{
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                color: '#059669'
                                            }}>
                                                {results.frontGrade}원
                                            </p>
                                            <p style={{
                                                fontSize: '14px',
                                                color: '#6b7280'
                                            }}>예상 거래가</p>
                                        </div>
                                    </div>
                                </div>

                                {/* All Grades */}
                                <div style={cardStyle}>
                                    <h3 style={{
                                        fontSize: '20px',
                                        fontWeight: '600',
                                        marginBottom: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <TrendingUp style={{ width: '20px', height: '20px', color: '#059669' }} />
                                        등급별 평균 거래값
                                    </h3>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '16px'
                                    }}>
                                        {Object.entries(results.backGrade).map(([grade, info]) => (
                                            <div
                                                key={grade}
                                                style={{
                                                    padding: '16px',
                                                    borderRadius: '8px',
                                                    border: `2px solid ${grade === results.grade ? '#10b981' : '#e5e7eb'}`,
                                                    backgroundColor: grade === results.grade ? '#f0fdf4' : '#f9fafb',
                                                    textAlign: 'center',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                <p style={{
                                                    fontWeight: '600',
                                                    color: '#1f2937',
                                                    marginBottom: '4px'
                                                }}>{grade}</p>
                                                <p style={{
                                                    fontSize: '18px',
                                                    fontWeight: 'bold',
                                                    color: '#059669'
                                                }}>
                                                    {info.price.toLocaleString()}원
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div style={{
                                ...cardStyle,
                                textAlign: 'center',
                                padding: '32px'
                            }}>
                                <div style={{
                                    padding: '16px',
                                    backgroundColor: '#f3f4f6',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginBottom: '16px'
                                }}>
                                    <Smartphone style={{ width: '32px', height: '32px', color: '#9ca3af' }} />
                                </div>
                                <h3 style={{
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    color: '#4b5563',
                                    marginBottom: '8px'
                                }}>
                                    분석 결과를 기다리고 있습니다
                                </h3>
                                <p style={{
                                    color: '#6b7280'
                                }}>
                                    휴대폰 사진을 업로드하고 검색 버튼을 눌러주세요
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* CSS Animation for Spinner */}
            <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default PhoneGradingApp;