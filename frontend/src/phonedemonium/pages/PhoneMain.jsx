import React, {useEffect, useState} from 'react';
//css
import '../styles/main.css';
//prop
import ModalAlert from '../components/Common/ModalAlert';
import GalaxyAppleBackground from '../components/Layout/GalaxyAppleBackground';
import MainSection from '../components/Sections/MainSection';
import PbtiSection from '../components/Sections/PbtiSection';
import EstimateSection from '../components/Sections/EstimateSection';

const SmartphonePlatform = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // ✅ 여기에 위치해야 함

    // 공통 스타일 - section과 container는 고정
    const styles = {
        sectionBlock: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
        },
        containerBlock: {
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '30px',
            padding: isMobile ? '40px 20px' : '60px 40px',
            border: '1px solid rgba(255,255,255,0.2)',
            maxWidth: isMobile ? '100%' : '850px',
            width: '100%',
            textAlign: 'center',
            position: 'relative'
        },
        contentBlock:{
            background: 'white',
            borderRadius: '15px',
            padding: isMobile ? '20px' : '30px',
            marginBottom: '20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const backgroundStyles = {
        pc: {
            background: `
            linear-gradient(rgba(16, 10, 46, 0.6), rgba(26, 35, 126, 0.5), rgba(57, 73, 171, 0.4)),
            url('/image/phone/background.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
        },
        mobile: {
            background: 'linear-gradient(135deg, #0a0a2e 0%, #16213e 25%, #1a237e 50%, #3949ab 75%, #5c6bc0 100%)'
        }
    };

    const scrollToSection = (section) => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    };

    //모달알림
    const [modalAlert, setModalAlert] = useState({
        isOpen: false,
        type: 'info',
        title: 'title',
        message: 'msg'
    });
    
    return (
        <div style={{minHeight: '100vh',
            ...(isMobile ? backgroundStyles.mobile : backgroundStyles.pc),
            position: 'relative',
            overflow: 'hidden',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'}}>
            <GalaxyAppleBackground isMobile={isMobile} />
            <MainSection scrollToSection={scrollToSection} isMobile={isMobile} styles={styles} />
            <EstimateSection scrollToSection={scrollToSection} setModalAlert={setModalAlert} isMobile={isMobile} styles={styles} />
            <PbtiSection scrollToSection={scrollToSection} isMobile={isMobile} styles={styles} />
            {/*<PhoneMarketSection/>*/}
            <ModalAlert
                isMobile={isMobile}
                setIsMobile = {setIsMobile}
                isOpen={modalAlert.isOpen}
                onClose={() => setModalAlert(prev => ({ ...prev, isOpen: false }))}
                type={modalAlert.type}
                title={modalAlert.title}
                message={modalAlert.message}
            />
        </div>
    );
};

export default SmartphonePlatform;