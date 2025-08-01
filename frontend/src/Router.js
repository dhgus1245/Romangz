import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 컴포넌트 import 추가
import App from './App';
import Phone from './phonedemonium/index';  // 정확한 경로로 바꿔주세요
import Sample from './phonedemonium/sample';  // 정확한 경로로 바꿔주세요
import Sample2 from './phonedemonium/sample2';  // 정확한 경로로 바꿔주세요

function Router() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/phone" element={<Phone />} />
            <Route path="/phone/sample" element={<Sample />} />
            <Route path="/phone/sample2" element={<Sample2 />} />
        </Routes>
    );
}

export default Router;
