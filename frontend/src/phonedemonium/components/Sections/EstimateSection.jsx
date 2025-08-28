import React, {useEffect, useState} from 'react';
import { Camera, Smartphone, Star, TrendingUp, Search } from 'lucide-react';
import { Copy, Check, Sparkles, MessageCircle } from 'lucide-react';
import {AreaChart, Area, YAxis, ResponsiveContainer, ReferenceLine, Tooltip} from 'recharts';

const EstimateSection = ({ scrollToSection, setModalAlert, isMobile, styles }) => {
    // 현재 상태
    const [currentStep, setCurrentStep] = useState('ready'); // 'ready', 'complete'
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
    const [result, setResult] = useState(null);
    //가격 예측 차트
    const [showChartGlass, setShowChartGlass] = useState(true);
    const [predPriceGraph, setPredPriceGraph] = useState([[90,110,130,90,100,110,120,130,90,100,110,120,130,120,120,100,90],[90,100,80,90,85]]);
    //ai 문구 복사
    const [aiText, setAiText] = useState(null);
    const [copied, setCopied] = useState(false);

    //페이지 로딩 될 때 한 번만 실행
    useEffect(() => {
        fetchEstimateMenu({ key: "company", value: "" });
    }, []);

    //휴대폰 견적 메뉴 정보 GET
    const fetchEstimateMenu = async (obj) => {
        try {
            const query = new URLSearchParams(obj).toString();
            const response = await fetch(`http://www.phonezipsa.com/phone/estimate_menu?${query}`, {
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
                // console.log("model : ", result);
            }else if(obj.key === "volume") {
                const volumes = result.map(([name], idx) => ({ idx: idx + 1, name }));
                setVolumes([{ idx: 0, name: "선택해 주세요" }, ...volumes]);
                // console.log(volumes);
            }

        } catch (error) {
            console.error("제조사 불러오기 실패:", error);
        }
    };

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
            const response = await fetch("http://www.phonezipsa.com/phone/estimate", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) throw new Error("서버 오류");

            const estimateResult = await response.json();
            setTimeout(() => {
                if(estimateResult.result === "succ"){
                    setCurrentStep("complete");
                    setResult(prev => ({
                        ...estimateResult,  // 서버에서 받은 데이터
                        gradeBreakdown: {
                            'A': { price: estimateResult.modelAvg.A, desc: '거의 사용하지 않아 \n새 제품과 같은 상태' },
                            'B': { price: estimateResult.modelAvg.B, desc: '약간의 사용감이 있는 상태' },
                            'C': { price: estimateResult.modelAvg.C, desc: '기스가 많아 눈에 띄는 \n사용 흔적이 있는 상태' },
                            // 'X': { price: estimateResult.modelAvg.D, desc: '기능이 완전히 정지된 상태' }
                        }
                    }));
                    //가격변화 그래프 생성
                    if(estimateResult.graph.result === "succ"){
                        setShowChartGlass(false); // glass off
                        setPredPriceGraph(estimateResult.graph.data);
                    }
                    //AI 문구 생성
                    setAiText(formatText(estimateResult.ai_text));
                }else{
                    if(estimateResult.code === "22"){
                        setModalAlert({
                            isOpen: true,
                            type: 'warning',
                            title: '결과 없음',
                            message: estimateResult.msg
                        });
                    }else{
                        setModalAlert({
                            isOpen: true,
                            type: 'error',
                            title: '오류 발생',
                            message: estimateResult.msg
                        });
                    }
                }
            }, 1500);
        } catch (error) {
            console.error("분석 실패:", error);
            alert("서버와의 통신 중 오류가 발생했습니다.");
        } finally {
            setTimeout(() => {setIsAnalyzing(false);},2000);
        }
    };

    const resetForm = () => {
        setCurrentStep('ready');
        setResult(null);
        setFrontImage(null);
        setBackImage(null);
        scrollToSection('estimate');
    };

    const ImageUploadBox = ({ type, image, onUpload }) => (
        <div style={{
            position: 'relative',
            height: isMobile ? '150px' : '180px',
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
                        objectFit: 'contain'
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

    // 데이터를 자연스럽게 연결되는 차트 형식으로 변환
    const transformData = (prevData, predictData) => {
        // 이전 데이터 (마지막 점 제외)
        const historicalData = prevData.slice(0, -1).map((value, index) => ({
            index,
            historicalValue: value,
            predictionValue: null
        }));

        // 연결점 - 이전 데이터의 마지막 점
        const connectionPoint = {
            index: prevData.length - 1,
            historicalValue: prevData[prevData.length - 1],
            predictionValue: prevData[prevData.length - 1]
        };

        // 예측 데이터
        const predictionData = predictData.map((value, index) => ({
            index: prevData.length + index,
            historicalValue: null,
            predictionValue: value
        }));

        return [...historicalData, connectionPoint, ...predictionData];
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const predictionData = payload.find(p => p.dataKey === 'predictionValue' && p.value != null);

            if (predictionData) {
                return (
                    <div style={{
                        background: 'white',
                        padding: '6px 10px',
                        border: '1px solid #ccc',
                        borderRadius: '6px'
                    }}>
          <span style={{ color: predictionData.stroke }}>
            {predictionData.value}만원
          </span>
                    </div>
                );
            }

            // predictionValue 없으면 첫 번째 값만 표시
            return (
                <div style={{
                    background: 'white',
                    padding: '6px 10px',
                    border: '1px solid #ccc',
                    borderRadius: '6px'
                }}>
        <span style={{ color: payload[0].stroke }}>
          {payload[0].value}만원
        </span>
                </div>
            );
        }
        return null;
    };

    const chartData = transformData(predPriceGraph[0], predPriceGraph[1]);
    const separationIndex = predPriceGraph[0].length - 0.5;

    const renderChart = () => {

        return (
            <AreaChart
                data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                    {/* 이전 데이터용 그라데이션 */}
                    <linearGradient id="historicalGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4}/>
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                    {/* 예측 데이터용 그라데이션 */}
                    <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EAB308" stopOpacity={0.4}/>
                        <stop offset="100%" stopColor="#EAB308" stopOpacity={0.1}/>
                    </linearGradient>
                </defs>

                <YAxis
                    tickFormatter={(value) => `${value}만원`}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    domain={[
                        (dataMin) => Math.ceil(Math.max(0, dataMin - 5)), // 0보다 작으면 0으로
                        (dataMax) => Math.ceil(dataMax + 5)     // 최대값은 올림 처리
                    ]}
                />

                <Tooltip content={<CustomTooltip />} />

                <ReferenceLine
                    x={separationIndex}
                    stroke="#E5E7EB"
                    strokeDasharray="3 3"
                    strokeWidth={2}
                />

                {/* 이전 데이터 영역 */}
                <Area
                    type="monotone"
                    dataKey="historicalValue"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    fill="url(#historicalGradient)"
                    connectNulls={false}
                />

                {/* 예측 데이터 영역 */}
                <Area
                    type="monotone"
                    dataKey="predictionValue"
                    stroke="#EAB308"
                    strokeWidth={3}
                    strokeDasharray="8 4"
                    fill="url(#predictionGradient)"
                    connectNulls={false}
                />
            </AreaChart>
        );
    };

    // 문장 단위로 분리하는 함수 (?, ., ! 기준)
    const formatText = (text) => {
        if (!text) return [];

        // 정규식으로 문장 끝 기호 뒤에서 분리
        const sentences = text.split(/([.!?])\s*/).filter(item => item.trim() !== '');

        // 문장과 기호를 합치기
        const formattedSentences = [];
        for (let i = 0; i < sentences.length; i += 2) {
            const sentence = sentences[i];
            const punctuation = sentences[i + 1] || '';
            if (sentence && sentence.trim()) {
                formattedSentences.push(sentence.trim() + punctuation);
            }
        }

        return formattedSentences;
    };

    // 복사 기능
    const handleCopy = () => {
        const textToCopy = aiText.join('\n'); // 배열 → 줄바꿈 적용

        // textarea 생성
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);

        // 선택 후 복사
        textarea.select();
        document.execCommand('copy');

        // textarea 제거
        document.body.removeChild(textarea);

        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderReadyContent = () => (
        <>
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
                    width: isMobile ? '40px':'60px',
                    height: isMobile ? '40px':'60px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    marginBottom: '10px'
                }}>
                    <Smartphone style={{ width: isMobile ? '20px':'30px', height: isMobile ? '20px':'30px' }} />
                </div>
                <h1 style={{
                    fontSize: isMobile ? '20px' : '32px',
                    fontWeight: 'bold',
                    marginBottom: '12px'
                }}>
                    휴대폰 시세 검색
                </h1>
                <p style={{
                    fontSize: isMobile ? '12px':'16px',
                    opacity: 0.9,
                    lineHeight: '1.5'
                }}>
                    AI가 사진을 분석하여<br/>정확한 등급과 시세를 알려드립니다
                </p>
            </div>

            {/* 메인 폼 */}
            <div style={styles.contentBlock}>
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
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
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
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
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
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
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
                    type='button'
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

            {/* CSS Animation for Spinner */}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </>
    );

    const renderCompleteContent = () => (
        <div style={styles.contentBlock}>
            <div style={{textAlign: 'center', marginBottom: isMobile ? '16px' : '24px',}}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: isMobile ? '40px':'60px',
                    height: isMobile ? '40px':'60px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '50%',
                    marginBottom: '10px'
                }}>
                    <Star style={{width: isMobile ? '20px':'35px', height: isMobile ? '20px':'35px', color: 'white'}}/>
                </div>
                <h1 style={{
                    fontSize: isMobile ? '16px' : '24px',
                    fontWeight: 'bold',
                    color: '#1e293b'
                }}>
                    분석 완료!
                </h1>
            </div>

            {/* 등급 결과 */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
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
                    <h3 style={{fontSize: isMobile ? '14px':'16px', marginBottom: '8px', opacity: 0.9}}>종합 등급</h3>
                    <div style={{fontSize: isMobile ? '28px': '36px', fontWeight: 'bold', marginBottom: '8px'}}>
                        {result.grade}
                    </div>
                    <p style={{fontSize: isMobile ? '10px':'12px', opacity: 0.9}}>
                        앞면: {result.front}등급 | 뒷면: {result.back}등급
                    </p>
                </div>

                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '20px',
                    border: '1px solid #e2e8f0',
                    textAlign: 'center'
                }}>
                    <h3 style={{fontSize: isMobile ? '14px':'16px', marginBottom: '8px', color: '#64748b'}}>예상 거래가</h3>
                    <div style={{
                        fontSize: isMobile ? '16px' : '24px',
                        fontWeight: 'bold',
                        color: '#10b981',
                        marginBottom: '8px'
                    }}>
                        {result.price.avg.toLocaleString()}원 ~ {result.price.max.toLocaleString()}원
                    </div>
                    <p style={{fontSize: isMobile ? '10px':'12px', color: '#94a3b8'}}>
                        중고거래 시세 기준
                    </p>
                </div>
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
                    fontSize: isMobile ? '14px':'16px',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <TrendingUp style={{width: '18px', height: '18px', color: '#10b981'}}/>
                    {/*등급별 예상 시세*/}
                    등급 분류표
                </h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: '12px'
                }}>
                    {Object.entries(result.gradeBreakdown).map(([grade, info]) => (
                        <div
                            key={grade}
                            style={{
                                padding: '14px',
                                borderRadius: '12px',
                                border: `2px solid ${grade === result.grade ? '#10b981' : '#e2e8f0'}`,
                                backgroundColor: grade === result.grade ? '#f0fdf4' : '#ffffff',
                                textAlign: 'center',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{
                                fontSize: isMobile ? '16px':'18px',
                                fontWeight: 'bold',
                                color: grade === result.grade ? '#10b981' : '#64748b',
                                marginBottom: '4px'
                            }}>
                                {grade}
                            </div>
                            <div style={{
                                fontSize: isMobile ? '14px':'14px',
                                fontWeight: '600',
                                color: '#1e293b',
                                marginBottom: '4px'
                            }}>
                                {info.price != null ? info.price.toLocaleString() + '원' : '-'}
                            </div>
                            <div style={{
                                fontSize: isMobile ? '10px':'11px',
                                color: '#94a3b8',
                                whiteSpace: 'pre-line'
                            }}>
                                {info.desc}
                            </div>
                        </div>
                    ))}
                </div>
                <p style={{fontSize: isMobile ? '10px':'12px', color: '#94a3b8', margin: '15px 0 0 10px'}}>
                    * 해당 금액은 중고거래 시세 기준이며 실제 거래 금액과는 차이가 있을 수 있습니다
                </p>
            </div>

            {/* 차트 영역 */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid #e2e8f0',
                marginBottom: '24px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                    gap: '16px'
                }}>
                    <h3 style={{
                        fontSize: isMobile ? '14px':'16px',
                        fontWeight: '600',
                        color: '#1e293b',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        {models.find(opt => opt.idx === selectedModelIdx)?.name} 가격 예측
                    </h3>

                    {/* 범례 */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <div style={{
                                width: '16px',
                                height: '4px',
                                borderRadius: '2px',
                                backgroundColor: '#3b82f6'
                            }}></div>
                            <span style={{
                                fontSize: isMobile ? '10px':'14px',
                                color: '#6b7280'
                            }}>판매금액</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <div style={{
                                width: '16px',
                                height: '4px',
                                borderRadius: '2px',
                                background: 'repeating-linear-gradient(to right, #eab308 0px, #eab308 6px, transparent 6px, transparent 10px)'
                            }}></div>
                            <span style={{
                                fontSize: isMobile ? '10px':'14px',
                                color: '#6b7280'
                            }}>예상금액</span>
                        </div>
                    </div>
                </div>

                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '150px'
                }}>
                    <ResponsiveContainer width="100%" height="100%">
                        {renderChart()}
                    </ResponsiveContainer>
                    {/* 글라스 블락 */}
                    {showChartGlass && <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(clamp(2px, 0.2vw, 3px))',
                        borderRadius: 'clamp(6px, 1vw, 12px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        padding: 'clamp(16px, 3vw, 32px)'
                    }}>
                        <div style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(clamp(10px, 2vw, 20px))',
                            borderRadius: 'clamp(6px, 1vw, 12px)',
                            padding: 'clamp(12px, 2.5vw, 20px) clamp(16px, 3vw, 28px)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            margin: 'auto',
                            maxWidth: isMobile ? '95%' : '60%',
                            textAlign: 'center'
                            }}
                        >
                            <p style={{
                                color: '#374151',
                                fontWeight: '500',
                                fontSize: isMobile ? '12px':'clamp(10px, 3vw, 14px)',
                                marginBottom: 'clamp(6px, 1vw, 10px)',
                                lineHeight: '1.4'
                            }} className="loading-message">
                                🤖 데이터 준비중입니다
                            </p>
                            <p style={{
                                color: '#6b7280',
                                fontSize: isMobile ? '10px':'clamp(8px, 2vw, 12px)',
                                margin: 0,
                                lineHeight: '1.5'}}
                            >
                                데이터가 부족하여 분석할 수 없습니다.
                            </p>
                        </div>
                    </div>}
                </div>
            </div>

            {/* AI 추천 판매 문구 헤더 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
            }}>
                <h3 style={{
                    fontSize: isMobile ? '14px':'16px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <Sparkles style={{width: '18px', height: '18px', color: '#8b5cf6'}}/>
                    AI 추천 판매 문구
                </h3>

                {/* 복사 버튼 */}
                <div
                    onClick={handleCopy}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 12px',
                        background: copied ? '#10b981' : '#6366f1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: isMobile ? '8px':'12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        transform: copied ? 'scale(1.05)' : 'scale(1)'
                    }}
                    onMouseOver={(e) => {
                        if (!copied) {
                            e.target.style.background = '#4f46e5';
                            e.target.style.transform = 'scale(1.05)';
                        }
                    }}
                    onMouseOut={(e) => {
                        if (!copied) {
                            e.target.style.background = '#6366f1';
                            e.target.style.transform = 'scale(1)';
                        }
                    }}
                >
                    {copied ? (
                        <>
                            <Check style={{width: isMobile ? '10px':'14px', height: isMobile ? '10px':'14px'}}/>
                            복사완료!
                        </>
                    ) : (
                        <>
                            <Copy style={{width: isMobile ? '10px':'14px', height: isMobile ? '10px':'14px'}}/>
                            복사하기
                        </>
                    )}
                </div>
            </div>

            {/* 문구 내용 */}
            <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #e2e8f0',
                position: 'relative',
                marginBottom: '25px'
            }}>
                {/* 말풍선 스타일 꾸미기 */}
                <div style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '20px',
                    width: '16px',
                    height: '16px',
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderBottom: 'none',
                    borderRight: 'none',
                    transform: 'rotate(45deg)'
                }} />

                {/* AI 아이콘 */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px',
                    paddingBottom: '8px',
                    borderBottom: '1px solid #f1f5f9'
                }}>
                    <div style={{
                        width: '24px',
                        height: '24px',
                        background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <MessageCircle style={{ width: '12px', height: '12px', color: 'white' }} />
                    </div>
                    <span style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#6b7280'
                    }}>AI가 분석한 최적의 판매 문구
                    </span>
                </div>

                {/* 문장별로 표시 */}
                <div style={{
                    lineHeight: '1.7',
                    fontSize: isMobile ? '10px':'14px',
                    color: '#374151',
                    textAlign: 'left'
                }}>
                    {aiText.map((sentence, index) => (
                        <div key={index} style={{
                            marginBottom: index < aiText.length - 1 ? '8px' : '0',
                            padding: '4px 0',
                            animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                        }}>
                        <span style={{
                            background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            display: 'inline-block',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.2s ease'
                        }}
                            onMouseOver={(e) => {
                                e.target.style.background = 'linear-gradient(135deg, #e5e7eb, #d1d5db)';
                                e.target.style.transform = 'translateY(-1px)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.background = 'linear-gradient(135deg, #f3f4f6, #e5e7eb)';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >{sentence}
                        </span>
                        </div>
                    ))}
                </div>

                {/* 하단 팁 */}
                <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    background: '#fef3c7',
                    borderRadius: '8px',
                    fontSize: isMobile ? '9px':'11px',
                    color: '#92400e',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    💡 <strong>Tip:</strong> 위 문구를 중고나라, 당근마켓 등에 그대로 사용하시면 더 빠른 판매가 가능해요!
                </div>
            </div>

            {/* CSS 애니메이션 */}
            <style>
                {`
                  @keyframes fadeInUp {
                    0% {
                      opacity: 0;
                      transform: translateY(10px);
                    }
                    100% {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}
            </style>

            {/* 다시 검색 버튼 */}
            <button
                type='button'
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
                    fontSize: isMobile ? '14px':'15px',
                    transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
                다시 검색하기
            </button>
        </div>
    );

    // 컨텐츠 렌더링 함수 (currentStep에 따라 분기)
    const renderContent = () => {
        switch (currentStep) {
            case 'ready':
                return renderReadyContent();
            case 'complete':
                return renderCompleteContent();
            default:
                return renderReadyContent();
        }
    };

    return (
        <section id="estimate" style={styles.sectionBlock}>
            <div style={styles.containerBlock}>
                {renderContent()}
            </div>
        </section>
    );
};

export default EstimateSection;