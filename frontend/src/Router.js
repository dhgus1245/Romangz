import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 컴포넌트 import 추가
import App from './App';
import Phone from './phonedemonium/pages/PhoneMain';  // 정확한 경로로 바꿔주세요

function Router() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/phone" element={<Phone />} />
        </Routes>
    );
}

export default Router;
