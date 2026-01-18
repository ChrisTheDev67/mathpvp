import React from 'react';
import './MathBackground.css';

// Simplified static background - no animations for better performance
const MathBackground = () => {
    return (
        <div className="math-background">
            <div className="math-overlay" />
            <div className="math-pattern" />
        </div>
    );
};

export default MathBackground;
