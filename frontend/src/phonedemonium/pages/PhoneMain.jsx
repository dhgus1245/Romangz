import React, {useEffect, useState} from 'react';
//css
import '../styles/main.css';
//prop
import GalaxyAppleBackground from '../components/Layout/GalaxyAppleBackground';
import MainSection from '../components/Sections/MainSection';
import PbtiSection from '../components/Sections/PbtiSection';
import EstimateSection from '../components/Sections/EstimateSection';
import PhoneMarketSection from '../components/Sections/PhoneMarketSection';
import IntroPopup from '../components/Popup/IntroPopup';

// 예시 데이터
const dummyPhones = [
    { name: '아이폰 14 Pro', grade: 'S', price: '1,200,000', imageUrl: '/images/iphone14pro.jpg' },
    { name: '갤럭시 S23', grade: 'A', price: '950,000', imageUrl: '/images/galaxys23.jpg' },
    { name: '아이폰 13', grade: 'B', price: '700,000', imageUrl: '/images/iphone13.jpg' },
    { name: '갤럭시 노트20', grade: 'C', price: '500,000', imageUrl: '/images/note20.jpg' },
    // ... 더 많은 예시 데이터
];

const SmartphonePlatform = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // ✅ 여기에 위치해야 함
    const [showPopup, setShowPopup] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);

    const filteredPhones = dummyPhones.filter(phone =>
        phone.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    useEffect(() => {
        if (isMobile) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % filteredPhones.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [filteredPhones.length, isMobile]);

    const scrollToSection = (section) => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div style={{minHeight: '100vh',
            ...(isMobile ? backgroundStyles.mobile : backgroundStyles.pc),
            position: 'relative',
            overflow: 'hidden',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'}}>
            <GalaxyAppleBackground />
            {showPopup && <IntroPopup onClose={() => setShowPopup(false)} />}
            <MainSection scrollToSection={scrollToSection} />
            <EstimateSection />
            <PbtiSection />
            <PhoneMarketSection
                filteredPhones={filteredPhones}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isMobile={isMobile}
                currentSlide={currentSlide}
            />
        </div>
    );
};

export default SmartphonePlatform;