import React from 'react';

const getColor = (grade) => {
    switch (grade) {
        case 'S': return '#FFD700';
        case 'A': return '#4CAF50';
        case 'B': return '#2196F3';
        case 'C': return '#FF9800';
        default: return '#ccc';
    }
};

const GradeBadge = ({ grade }) => (
    <span
        style={{
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: '12px',
            backgroundColor: getColor(grade),
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px'
        }}
    >
    {grade} 등급
  </span>
);

export default GradeBadge;