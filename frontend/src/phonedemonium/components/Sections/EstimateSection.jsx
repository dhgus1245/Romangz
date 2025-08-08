import React, {useEffect, useState} from 'react';
import { Camera, Smartphone, Star, TrendingUp, Search } from 'lucide-react';

const EstimateSection = () => {
    // 시세검색 SelectBox
    const [companies, setCompanies] = useState([{ idx: 0, name: '선택해 주세요' }]);
    const [selectedCompanyIdx, setSelectedCompanyIdx] = useState(0);
    const [series, setSeries] = useState([{ idx: 0, name: '선택해 주세요' }]);
    const [selectedSeriesIdx, setSelectedSeriesIdx] = useState(0);
    const [models, setModels] = useState([{ idx: 0, name: '선택해 주세요' }]);
    const [selectedModelIdx, setSelectedModelIdx] = useState(0);
    const [volumes, setVolumes] = useState([{ idx: 0, name: '선택해 주세요' }]);
    const [selectedVolumeIdx, setSelectedVolumeIdx] = useState(0);

    // 이미지
    const [frontImage, setFrontImage] = useState(null);
    const [backImage, setBackImage] = useState(null);
    // 분석결과
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);


    //페이지 로딩 될 때 한 번만 실행
    useEffect(() => {
        fetchEstimateMenu({ key: "company", value: "" });
    }, []);

    //휴대폰 견적 메뉴 정보 GET
    const fetchEstimateMenu = async (obj) => {
        try {
            const query = new URLSearchParams(obj).toString();
            const response = await fetch(`http://192.168.16.1:8080/phone/estimate_menu?${query}`, {
                method: "GET",
            });
            if (!response.ok) throw new Error("서버 오류");
            const result = await response.json();

            if (obj.key === "company") {
                const companies = result.map(([idx, name]) => ({ idx, name}));
                setCompanies([{ idx: 0, name: "선택해 주세요" }, ...companies]);
                // console.log("company : ", result);
            }else if(obj.key === "series") {
                const models = result.map(([idx, name]) => ({ idx, name}));
                setSeries([{ idx: 0, name: "선택해 주세요" }, ...models]);
                // console.log("series : ", result);
            }else if(obj.key === "model") {
                const models = result.map(([idx, name]) => ({ idx, name}));
                setModels([{ idx: 0, name: "선택해 주세요" }, ...models]);
                console.log("model : ", result);
            }else if(obj.key === "volume") {
                const volumes = result.map(([name], idx) => ({ idx: idx + 1, name }));
                setVolumes([{ idx: 0, name: "선택해 주세요" }, ...volumes]);
                // console.log(volumes);
            }

        } catch (error) {
            console.error("제조사 불러오기 실패:", error);
        }
    };

    // SELECT 초기화
    const handleSelectChange = (e, reset_idx) => {

        const upperReset = reset_idx.toUpperCase();
        let key = ""
        const idx = Number(e.target.value);

        if(upperReset === "T"){//전체리셋
            key = "company";
            setSelectedCompanyIdx(0);
            setSelectedModelIdx(0);
        }else if(upperReset === "C"){ //제조사 변경
            key = "series";
            setSelectedCompanyIdx(idx);
            setModels([{ idx: 0, name: "선택해 주세요" }]);
            setVolumes([{ idx: 0, name: "선택해 주세요" }]);
            fetchEstimateMenu({ key: key, value: idx }).then(r => {
                setSelectedSeriesIdx(0);
                setSelectedModelIdx(0);
                setSelectedVolumeIdx(0);
            });
        }else if(upperReset === "S"){ //시리즈 변경
            key = "model";
            setSelectedSeriesIdx(idx);
            const selectedOption = e.target.selectedOptions[0];
            const seriesName = selectedOption.getAttribute("data-name");
            setVolumes([{ idx: 0, name: "선택해 주세요" }]);
            fetchEstimateMenu({ key: key, value: seriesName }).then(r => {
                setSelectedModelIdx(0);
                setSelectedVolumeIdx(0);
            });
        }else if(upperReset === "M"){ //모델 변경
            key = "volume";
            setSelectedModelIdx(idx);
            setVolumes([{ idx: 0, name: "선택해 주세요" }]);
            fetchEstimateMenu({key: key, value: idx}).then(r =>{
                setSelectedVolumeIdx(0);
            });
        }else if (upperReset === "V") { //용량 변경
            setSelectedVolumeIdx(idx)
        }
    };

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

    //버튼 활성화
    const isEstimateButtonDisabled = () => {
        return (
            isAnalyzing ||
            selectedCompanyIdx === 0 ||
            selectedModelIdx === 0 ||
            selectedVolumeIdx === 0 ||
            selectedSeriesIdx === 0 ||
            !frontImage ||
            !backImage
        );
    };

    const estimatePhone = async () => {
        if (!frontImage || !backImage) {
            alert('앞면과 뒷면 사진을 모두 업로드해주세요.');
            return;
        }

        setIsAnalyzing(true);
        //용량
        const selectElem = document.getElementById("selected_volume");
        const selectedOption = selectElem.options[selectElem.selectedIndex];
        const volumeName = selectedOption.getAttribute("data-name");

        const formData = new FormData();
        formData.append("frontImage", dataURLtoFile(frontImage, "front.jpg"));
        formData.append("backImage", dataURLtoFile(backImage, "back.jpg"));
        formData.append("model", selectedModelIdx);
        formData.append("volume", volumeName);

        try {
            const response = await fetch("http://192.168.16.1:8080/phone/estimate", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("서버 오류");
            const result = await response.json();
            console.log(result);
            setResults(result);
        } catch (error) {
            console.error("분석 실패:", error);
            alert("서버와의 통신 중 오류가 발생했습니다.");
        }

        // 임시 결과 데이터
        setTimeout(() => {
            setResults({
                overall: 'A',
                frontGrade: 'A',
                backGrade: 'B',
                estimatedPrice: 520000,
                description: '전체적으로 양호한 상태입니다. 앞면은 깨끗하고 뒷면에 약간의 사용감이 있습니다.',
                gradeBreakdown: {
                    'S': { price: 650000, description: '새 제품 수준' },
                    'A': { price: 520000, description: '매우 좋음' },
                    'B': { price: 380000, description: '좋음' },
                    'C': { price: 250000, description: '보통' }
                }
            });
            setIsAnalyzing(false);
        }, 2000);
    };

    const resetForm = () => {
        setResults(null);
        setFrontImage(null);
        setBackImage(null);
    };

    const ImageUploadBox = ({ type, image, onUpload }) => (
        <div style={{
            position: 'relative',
            height: window.innerWidth <= 768 ? '150px' : '180px',
            border: '2px dashed #e2e8f0',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: image ? 'transparent' : '#f8fafc',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
        }}>
            {image ? (
                <img
                    src={image}
                    alt={`휴대폰 ${type}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            ) : (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    padding: '20px'
                }}>
                    <div style={{
                        padding: '12px',
                        backgroundColor: '#e0f2fe',
                        borderRadius: '50%',
                        marginBottom: '12px'
                    }}>
                        <Camera style={{ width: '20px', height: '20px', color: '#0369a1' }} />
                    </div>
                    <p style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#64748b',
                        textAlign: 'center',
                        margin: 0
                    }}>
                        {type === 'front' ? '앞면' : '뒷면'} 사진을<br/>업로드하세요
                    </p>
                </div>
            )}
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

    if (results) {
        return (
            <section id="estimate" style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px'
            }}>
                <div style={{
                    maxWidth: '800px',
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '24px',
                    padding: window.innerWidth <= 768 ? '30px 20px' : '40px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}>
                    {/* 결과 헤더 */}
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '70px',
                            height: '70px',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            borderRadius: '50%',
                            marginBottom: '20px'
                        }}>
                            <Star style={{ width: '35px', height: '35px', color: 'white' }} />
                        </div>
                        <h1 style={{
                            fontSize: window.innerWidth <= 768 ? '24px' : '28px',
                            fontWeight: 'bold',
                            color: '#1e293b',
                            marginBottom: '12px'
                        }}>
                            분석 완료!
                        </h1>
                        <p style={{
                            color: '#64748b',
                            fontSize: '14px',
                            lineHeight: '1.6'
                        }}>
                            {/*{manufacturer} {phoneModel} ({storage}, {years} 사용)*/}
                        </p>
                    </div>

                    {/* 등급 결과 */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
                        gap: '16px',
                        marginBottom: '24px'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            borderRadius: '16px',
                            padding: '20px',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <h3 style={{ fontSize: '16px', marginBottom: '8px', opacity: 0.9 }}>종합 등급</h3>
                            <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px' }}>
                                {results.overall}
                            </div>
                            <p style={{ fontSize: '12px', opacity: 0.9 }}>
                                앞면: {results.frontGrade}등급 | 뒷면: {results.backGrade}등급
                            </p>
                        </div>

                        <div style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '20px',
                            border: '1px solid #e2e8f0',
                            textAlign: 'center'
                        }}>
                            <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#64748b' }}>예상 거래가</h3>
                            <div style={{
                                fontSize: window.innerWidth <= 768 ? '24px' : '28px',
                                fontWeight: 'bold',
                                color: '#10b981',
                                marginBottom: '8px'
                            }}>
                                {results.estimatedPrice.toLocaleString()}원
                            </div>
                            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                                중고거래 시세 기준
                            </p>
                        </div>
                    </div>

                    {/* 상세 설명 */}
                    <div style={{
                        background: '#f8fafc',
                        borderRadius: '16px',
                        padding: '20px',
                        marginBottom: '24px'
                    }}>
                        <h3 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#1e293b',
                            marginBottom: '12px'
                        }}>
                            📝 상태 분석 결과
                        </h3>
                        <p style={{
                            color: '#475569',
                            lineHeight: '1.6',
                            margin: 0,
                            fontSize: '14px'
                        }}>
                            {results.description}
                        </p>
                    </div>

                    {/* 등급별 시세 */}
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '20px',
                        border: '1px solid #e2e8f0',
                        marginBottom: '24px'
                    }}>
                        <h3 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#1e293b',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <TrendingUp style={{ width: '18px', height: '18px', color: '#10b981' }} />
                            등급별 예상 시세
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: window.innerWidth <= 768 ? '1fr 1fr' : 'repeat(4, 1fr)',
                            gap: '12px'
                        }}>
                            {Object.entries(results.gradeBreakdown).map(([grade, info]) => (
                                <div
                                    key={grade}
                                    style={{
                                        padding: '14px',
                                        borderRadius: '12px',
                                        border: `2px solid ${grade === results.overall ? '#10b981' : '#e2e8f0'}`,
                                        backgroundColor: grade === results.overall ? '#f0fdf4' : '#ffffff',
                                        textAlign: 'center',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: grade === results.overall ? '#10b981' : '#64748b',
                                        marginBottom: '4px'
                                    }}>
                                        {grade}
                                    </div>
                                    <div style={{
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#1e293b',
                                        marginBottom: '4px'
                                    }}>
                                        {info.price.toLocaleString()}원
                                    </div>
                                    <div style={{
                                        fontSize: '11px',
                                        color: '#94a3b8'
                                    }}>
                                        {info.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 다시 검색 버튼 */}
                    <button
                        onClick={resetForm}
                        style={{
                            width: '100%',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            color: 'white',
                            fontWeight: '600',
                            padding: '14px',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '15px',
                            transition: 'transform 0.2s ease'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        다시 검색하기
                    </button>
                </div>
            </section>
        );
    }

    return (
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
                padding: window.innerWidth <= 768 ? '40px 20px' : '60px 40px',
                border: '1px solid rgba(255,255,255,0.2)',
                maxWidth: '800px',
                width: '100%',
                textAlign: 'center'
            }}>
                {/* 헤더 */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '40px',
                    color: 'white'
                }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '60px',
                        height: '60px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        marginBottom: '20px'
                    }}>
                        <Smartphone style={{ width: '30px', height: '30px' }} />
                    </div>
                    <h1 style={{
                        fontSize: window.innerWidth <= 768 ? '28px' : '32px',
                        fontWeight: 'bold',
                        marginBottom: '12px'
                    }}>
                        휴대폰 시세 검색
                    </h1>
                    <p style={{
                        fontSize: '16px',
                        opacity: 0.9,
                        lineHeight: '1.5'
                    }}>
                        AI가 사진을 분석하여<br/>정확한 등급과 시세를 알려드립니다
                    </p>
                </div>

                {/* 메인 폼 */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '24px',
                    padding: window.innerWidth <= 768 ? '25px' : '32px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}>
                    {/* 기기 정보 */}
                    <div style={{ marginBottom: '28px' }}>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#1e293b',
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <Smartphone style={{ width: '20px', height: '20px', color: '#667eea' }} />
                            기기 정보
                        </h3>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
                            gap: '16px',
                            marginBottom: '16px'
                        }}>
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#374151',
                                    marginBottom: '6px'
                                }}>제조사</label>
                                <select value={selectedCompanyIdx}
                                        onChange={(e) => handleSelectChange(e, "C")}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            backgroundColor: 'white',
                                            outline: 'none'
                                        }}
                                >
                                    {companies.map((company) => (
                                        <option key={company.idx} value={company.idx}>
                                            {company.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#374151',
                                    marginBottom: '6px'
                                }}>시리즈</label>
                                <select
                                    value={selectedSeriesIdx}
                                    onChange={(e) => handleSelectChange(e, "S")}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        backgroundColor: 'white',
                                        outline: 'none'
                                    }}
                                >
                                    {series.map((series) => (
                                        <option key={series.idx} value={series.idx} data-name={series.name}>
                                            {series.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
                            gap: '16px'
                        }}>
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#374151',
                                    marginBottom: '6px'
                                }}>모델명</label>
                                <select
                                    value={selectedModelIdx}
                                    onChange={(e) => handleSelectChange(e, "M")}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        backgroundColor: 'white',
                                        outline: 'none'
                                    }}
                                >
                                    {models.map((model) => (
                                        <option key={model.idx} value={model.idx}>
                                            {model.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#374151',
                                    marginBottom: '6px'
                                }}>용량</label>
                                <select
                                    id={"selected_volume"}
                                    value={selectedVolumeIdx}
                                    onChange={(e) => handleSelectChange(e, "V")}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        backgroundColor: 'white',
                                        outline: 'none'
                                    }}
                                >
                                    {volumes.map((volume) => (
                                        <option key={volume.idx} value={volume.idx} data-name={volume.name}>
                                            {volume.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 사진 업로드 */}
                    <div style={{marginBottom: '28px'}}>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#1e293b',
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <Camera style={{width: '20px', height: '20px', color: '#667eea'}}/>
                            사진 업로드
                        </h3>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
                            gap: '16px'
                        }}>
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#374151',
                                    marginBottom: '8px'
                                }}>앞면 사진</label>
                                <ImageUploadBox type="front" image={frontImage} onUpload={handleImageUpload}/>
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#374151',
                                    marginBottom: '8px'
                                }}>뒷면 사진</label>
                                <ImageUploadBox type="back" image={backImage} onUpload={handleImageUpload} />
                            </div>
                        </div>
                    </div>

                    {/* 검색 버튼 */}
                    <button
                        onClick={estimatePhone}
                        disabled={isEstimateButtonDisabled()}
                        style={{
                            width: '100%',
                            background: isEstimateButtonDisabled()
                                ? '#94a3b8'
                                : 'linear-gradient(135deg, #667eea, #764ba2)',
                            color: 'white',
                            fontWeight: '600',
                            padding: '16px',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: (isEstimateButtonDisabled()) ? 'not-allowed' : 'pointer',
                            fontSize: '16px',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                            if (!isAnalyzing && frontImage && backImage) {
                                e.target.style.transform = 'scale(1.02)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!isAnalyzing && frontImage && backImage) {
                                e.target.style.transform = 'scale(1)';
                            }
                        }}
                    >
                        {isAnalyzing ? (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px'
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
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}>
                                <Search style={{ width: '20px', height: '20px' }} />
                                <span>검색</span>
                            </div>
                        )}
                    </button>
                </div>
            </div>

            {/* CSS Animation for Spinner */}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

export default EstimateSection;