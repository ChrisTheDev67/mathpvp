import React, { useMemo } from 'react';
import './MathBackground.css';

const SYMBOLS = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '+', '−', '×', '÷', '=', 'π', '∑', '√', '∫', '∞', '%', '≈', '≠',
    '△', '◯', '□', '⬡'
];

const MathBackground = () => {
    // Generate static random items only once on mount to avoid re-renders
    const items = useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: `${Math.random() * 2 + 1}rem`, // 1rem to 3rem
            duration: `${Math.random() * 20 + 15}s`, // 15-35s slow float
            delay: `-${Math.random() * 20}s`, // start mid-animation
            depth: Math.floor(Math.random() * 4) + 1, // 1-4 depth levels
            colorVar: Math.random() > 0.5 ? 'var(--primary)' : 'var(--text-muted)'
        }));
    }, []);

    return (
        <div className="math-background">
            <div className="math-overlay" />
            <div className="math-3d-container">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={`math-item depth-${item.depth}`}
                        style={{
                            left: item.left,
                            top: item.top,
                            fontSize: item.size,
                            animation: `float3D ${item.duration} infinite linear`,
                            animationDelay: item.delay,
                            color: item.depth >= 3 ? item.colorVar : undefined
                        }}
                    >
                        {item.symbol}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(MathBackground);
