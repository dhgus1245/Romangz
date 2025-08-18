import React, { useState } from 'react';
import { AreaChart, Area, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';

const ChartVariations = () => {
    const [data] = useState([[9,11,13,9,10,11],[12,7,10,8,9]]);

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

    const chartData = transformData(data[0], data[1]);
    const separationIndex = data[0].length - 0.5;

    const renderChart = () => {
        return (
            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                />

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

    return (
        <section style={{
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
                padding: '40px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '24px',
                    background: 'linear-gradient(135deg, #faf5ff 0%, #fdf2f8 100%)',
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                    {/* 헤더 */}
                    <div style={{ marginBottom: '24px' }}>
                        <h2 style={{
                            fontSize: '32px',
                            fontWeight: 'bold',
                            color: '#1f2937',
                            margin: '0 0 8px 0'
                        }}>
                            휴대폰 가격 예측 차트
                        </h2>
                        <p style={{
                            color: '#6b7280',
                            margin: 0
                        }}>
                            과거 데이터와 미래 예측을 연결한 시각화
                        </p>
                    </div>

                    {/* 차트 영역 */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
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
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#1f2937',
                                margin: 0
                            }}>
                                휴대폰 가격 변화 추이
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
                                        fontSize: '14px',
                                        color: '#6b7280'
                                    }}>과거 데이터</span>
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
                                        fontSize: '14px',
                                        color: '#6b7280'
                                    }}>예측 데이터</span>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            height: '320px',
                            width: '100%'
                        }}>
                            <ResponsiveContainer width="100%" height="100%">
                                {renderChart()}
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChartVariations;