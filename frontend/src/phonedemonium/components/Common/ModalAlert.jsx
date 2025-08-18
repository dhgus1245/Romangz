import React, { useState, useEffect } from 'react';

// 모달 알림 컴포넌트 (내부 상태 제거, props 기반)
export const ModalAlert = ({ isOpen, onClose, title, message, type = 'info', showCancel = false, isMobile, setIsMobile}) => {

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 480);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            default: return 'ℹ️';
        }
    };

    const getColors = () => {
        switch (type) {
            case 'success': return { primary: '#10B981', secondary: '#059669' };
            case 'error': return { primary: '#EF4444', secondary: '#DC2626' };
            case 'warning': return { primary: '#F59E0B', secondary: '#D97706' };
            default: return { primary: '#3B82F6', secondary: '#2563EB' };
        }
    };

    const colors = getColors();

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '16px'
    };

    const modalStyle = {
        backgroundColor: 'white',
        borderRadius: '24px',
        width: '100%',
        maxWidth: isMobile ? '340px' : '400px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(50px)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        position: 'relative',
        overflow: 'hidden'
    };

    const colorBarStyle = {
        height: '4px',
        background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px'
    };

    const contentStyle = {
        padding: isMobile ? '24px' : '32px',
        textAlign: 'center'
    };

    const iconContainerStyle = {
        position: 'relative',
        marginBottom: '24px'
    };

    const iconStyle = {
        fontSize: isMobile ? '40px' : '48px',
        marginBottom: '16px',
        display: 'block'
    };

    const iconBackgroundStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '80px',
        height: '80px',
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        borderRadius: '50%',
        opacity: 0.2,
        transform: 'translate(-50%, -50%)',
        animation: 'pulse 2s infinite'
    };

    const titleStyle = {
        fontSize: isMobile ? '20px' : '24px',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '12px',
        lineHeight: '1.2'
    };

    const messageStyle = {
        fontSize: isMobile ? '14px' : '16px',
        color: '#6B7280',
        lineHeight: '1.5',
        marginBottom: '32px',
        wordBreak: 'break-word'
    };

    const buttonContainerStyle = {
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        flexDirection: isMobile ? 'column' : 'row'
    };

    const primaryButtonStyle = {
        padding: '12px 32px',
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        minWidth: '120px'
    };

    const secondaryButtonStyle = {
        padding: '12px 32px',
        backgroundColor: '#E5E7EB',
        color: '#6B7280',
        border: 'none',
        borderRadius: '25px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        minWidth: '120px'
    };

    return (
        <>
            <style>
                {`
          @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.05); }
            100% { transform: translate(-50%, -50%) scale(1); }
          }
          
          .modal-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }
          
          .modal-button:active {
            transform: translateY(0);
          }
        `}
            </style>
            <div style={overlayStyle} onClick={onClose}>
                <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                    <div style={colorBarStyle} />
                    <div style={contentStyle}>
                        <div style={iconContainerStyle}>
                            <div style={iconBackgroundStyle} />
                            <span style={iconStyle}>{getIcon()}</span>
                        </div>
                        <h3 style={titleStyle}>{title}</h3>
                        <p style={messageStyle}>{message}</p>
                        <div style={buttonContainerStyle}>
                            <button
                                style={{...primaryButtonStyle, margin: "auto"}}
                                className="modal-button"
                                onClick={onClose}
                            >
                                확인
                            </button>
                            {showCancel && (
                                <button
                                    style={secondaryButtonStyle}
                                    className="modal-button"
                                    onClick={onClose}
                                >
                                    취소
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// 글래스모피즘 알림 컴포넌트
export const GlassAlert = ({ isOpen, onClose, title, message }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 480);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!isOpen) return null;

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '16px'
    };

    const glassModalStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '24px',
        padding: isMobile ? '32px' : '40px',
        width: '100%',
        maxWidth: isMobile ? '340px' : '400px',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
        transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(30px)',
        transition: 'all 0.5s ease-out'
    };

    const titleStyle = {
        color: 'white',
        fontSize: isMobile ? '20px' : '24px',
        fontWeight: 'bold',
        marginBottom: '16px',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        lineHeight: '1.2'
    };

    const messageStyle = {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: isMobile ? '14px' : '16px',
        lineHeight: '1.5',
        marginBottom: '32px',
        wordBreak: 'break-word'
    };

    const iconStyle = {
        fontSize: isMobile ? '40px' : '48px',
        marginBottom: '16px',
        display: 'block'
    };

    const buttonStyle = {
        padding: '12px 32px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        color: 'white',
        fontWeight: '600',
        borderRadius: '25px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontSize: '16px',
        minWidth: '140px'
    };

    return (
        <>
            <style>
                {`
          .glass-button:hover {
            background-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }
          
          .glass-button:active {
            transform: translateY(0);
          }
        `}
            </style>
            <div style={overlayStyle} onClick={onClose}>
                <div style={glassModalStyle} onClick={(e) => e.stopPropagation()}>
                    <span style={iconStyle}>✨</span>
                    <h3 style={titleStyle}>{title}</h3>
                    <p style={messageStyle}>{message}</p>
                    <button
                        style={buttonStyle}
                        className="glass-button"
                        onClick={onClose}
                    >
                        멋져요! ✨
                    </button>
                </div>
            </div>
        </>
    );
};

// 사용 예시 컴포넌트
const EstimateExample = () => {
    const [modalAlert, setModalAlert] = useState({
        isOpen: true, // 처음부터 모달 열림
        type: 'info',
        title: '테스트 모달',
        message: '모달이 정상적으로 열렸습니다!'
    });

    const [glassAlert, setGlassAlert] = useState({
        isOpen: false,
        title: '',
        message: ''
    });

    const handleEstimate = () => {
        const estimateResult = {
            msg: "견적이 성공적으로 계산되었습니다! 총 금액은 150,000원입니다."
        };

        setModalAlert({
            isOpen: true,
            type: 'success',
            title: '견적 완료',
            message: estimateResult.msg
        });
    };

    const handleError = () => {
        setModalAlert({
            isOpen: true,
            type: 'error',
            title: '오류 발생',
            message: '처리 중 오류가 발생했습니다.'
        });
    };

    const showGlass = () => {
        setGlassAlert({
            isOpen: true,
            title: '글래스모피즘 알림',
            message: '반투명하고 아름다운 알림입니다!'
        });
    };

    const closeModal = () => {
        setModalAlert(prev => ({ ...prev, isOpen: false }));
    };

    const closeGlass = () => {
        setGlassAlert(prev => ({ ...prev, isOpen: false }));
    };

    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '32px',
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
    };

    const titleStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '24px',
        color: '#333'
    };

    const buttonStyle = {
        padding: '12px 24px',
        margin: '8px',
        border: 'none',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        color: 'white',
        transition: 'all 0.3s ease'
    };

    return (
        <div style={cardStyle}>
            <h1 style={titleStyle}>📊 견적 시스템 테스트</h1>

            <button
                style={{
                    ...buttonStyle,
                    background: 'linear-gradient(135deg, #10B981, #059669)'
                }}
                onClick={handleEstimate}
            >
                ✅ 견적 계산
            </button>

            <button
                style={{
                    ...buttonStyle,
                    background: 'linear-gradient(135deg, #EF4444, #DC2626)'
                }}
                onClick={handleError}
            >
                ❌ 에러 테스트
            </button>

            <button
                style={{
                    ...buttonStyle,
                    background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
                }}
                onClick={showGlass}
            >
                ✨ 글래스 알림
            </button>

            <div style={{
                marginTop: '24px',
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
                fontSize: '14px',
                color: '#6b7280',
                textAlign: 'left'
            }}>
                <strong>🔧 수정 사항:</strong><br />
                • useEffect로 window.innerWidth 감지<br />
                • 무한 렌더링 방지<br />
                • 반응형 동작 최적화
            </div>

            {/* 모달 알림 */}
            <ModalAlert
                isOpen={modalAlert.isOpen}
                onClose={closeModal}
                type={modalAlert.type}
                title={modalAlert.title}
                message={modalAlert.message}
                showCancel={false}
            />

            {/* 글래스 알림 */}
            <GlassAlert
                isOpen={glassAlert.isOpen}
                onClose={closeGlass}
                title={glassAlert.title}
                message={glassAlert.message}
            />
        </div>
    );
};

export default ModalAlert;
