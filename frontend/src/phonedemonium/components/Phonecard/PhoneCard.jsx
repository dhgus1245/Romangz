import React from 'react';
import GradeBadge from '../Common/GradeBadge';

const PhoneCard = ({ phone }) => (
    <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '12px', color: 'white', textAlign: 'center' }}>
        <img
            src={phone.imageUrl}
            alt={phone.name}
            style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }}
        />
        <h3 style={{ margin: '10px 0', fontSize: '18px' }}>{phone.name}</h3>
        <GradeBadge grade={phone.grade} />
        <p style={{ marginTop: '8px', color: '#aaa' }}>{phone.price}원</p>
    </div>
);

export default PhoneCard;