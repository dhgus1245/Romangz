import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => (
    <div style={{ marginBottom: '30px', textAlign: 'center' }}>
            <input
                type="text"
                placeholder="스마트폰 이름을 검색하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                        padding: '10px',
                        width: '80%',
                        maxWidth: '400px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        border: '1px solid #ccc'
                }}
            />
    </div>
);

export default SearchBar;