import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="app-layout">
            <Navbar />
            <main className="main-content container animate-fade-in" style={{ marginTop: '100px', paddingBottom: '50px' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
