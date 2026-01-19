import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import MathBackground from './MathBackground';

const Layout = () => {
    return (
        <div className="app-layout">
            <MathBackground />
            <Navbar />
            <main className="main-content container animate-fade-in" style={{ marginTop: '100px', paddingBottom: '50px' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
