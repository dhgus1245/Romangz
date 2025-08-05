import React, {useState} from 'react';
import {Battery, Cpu, Heart, Search, Smartphone} from 'lucide-react';

const PhoneMarketSection = ({}) => {

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

    //검색
    const [searchTerm, setSearchTerm] = useState('');
    // const [selectedPhone, setSelectedPhone] = useState(null);

    const filteredPhones = phoneData.filter(phone =>
        phone.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
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
                    <Smartphone size={36}/>
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
                    <div style={{position: 'relative', maxWidth: '500px', margin: '0 auto'}}>
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

                            <div style={{color: 'white', textAlign: 'center'}}>
                                <h3 style={{fontSize: '20px', marginBottom: '8px', fontWeight: 'bold'}}>
                                    {phone.model}
                                </h3>
                                <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '15px'}}>
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
                                        <Cpu size={16} style={{marginBottom: '4px'}}/>
                                        <div>{phone.specs.ram}</div>
                                    </div>
                                    <div>
                                        <Smartphone size={16} style={{marginBottom: '4px'}}/>
                                        <div>{phone.specs.storage}</div>
                                    </div>
                                    <div>
                                        <Battery size={16} style={{marginBottom: '4px'}}/>
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
                                    <Heart size={16}/>
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
    );
};

export default PhoneMarketSection;