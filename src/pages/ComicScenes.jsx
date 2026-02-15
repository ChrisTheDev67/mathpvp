import React from 'react';

// ═══════════════════════════════════════
//  SVG COMIC CHARACTERS & SCENES
//  Hand-drawn style spy boy w/ animations
// ═══════════════════════════════════════

// ── Spy Boy Character (reusable) ──
function SpyBoy({ x = 0, y = 0, scale = 1, flip = false, className = '' }) {
    return (
        <g transform={`translate(${x}, ${y}) scale(${flip ? -scale : scale}, ${scale})`} className={className}>
            {/* Body */}
            <rect x="-12" y="0" width="24" height="30" rx="6" fill="#2d3436" stroke="#636e72" strokeWidth="1.5" />
            {/* Belt */}
            <rect x="-12" y="18" width="24" height="4" fill="#e94560" rx="1" />
            <circle cx="0" cy="20" r="2.5" fill="#ffd700" />
            {/* Head */}
            <circle cx="0" cy="-14" r="14" fill="#ffeaa7" stroke="#fdcb6e" strokeWidth="1" />
            {/* Hair */}
            <path d="M-14,-14 Q-14,-30 0,-28 Q14,-30 14,-14 Q10,-22 0,-20 Q-10,-22 -14,-14" fill="#6c5ce7" />
            {/* Eyes */}
            <ellipse cx="-5" cy="-16" rx="3" ry="3.5" fill="white" />
            <ellipse cx="5" cy="-16" rx="3" ry="3.5" fill="white" />
            <circle cx="-4" cy="-15.5" r="2" fill="#2d3436" />
            <circle cx="6" cy="-15.5" r="2" fill="#2d3436" />
            <circle cx="-3.5" cy="-16" r="0.7" fill="white" />
            <circle cx="6.5" cy="-16" r="0.7" fill="white" />
            {/* Mouth */}
            <path d="M-4,-8 Q0,-5 4,-8" fill="none" stroke="#e17055" strokeWidth="1.5" strokeLinecap="round" />
            {/* Goggles on head */}
            <ellipse cx="-6" cy="-26" rx="5" ry="3.5" fill="none" stroke="#00b894" strokeWidth="2" />
            <ellipse cx="6" cy="-26" rx="5" ry="3.5" fill="none" stroke="#00b894" strokeWidth="2" />
            <line x1="-1" y1="-26" x2="1" y2="-26" stroke="#00b894" strokeWidth="2" />
            <circle cx="-6" cy="-26" r="2" fill="rgba(0,184,148,0.3)" />
            <circle cx="6" cy="-26" r="2" fill="rgba(0,184,148,0.3)" />
            {/* Legs */}
            <rect x="-10" y="30" width="8" height="14" rx="3" fill="#2d3436" />
            <rect x="2" y="30" width="8" height="14" rx="3" fill="#2d3436" />
            {/* Shoes */}
            <ellipse cx="-6" cy="45" rx="6" ry="3" fill="#636e72" />
            <ellipse cx="6" cy="45" rx="6" ry="3" fill="#636e72" />
            {/* Arms */}
            <rect x="-20" y="2" width="8" height="22" rx="4" fill="#ffeaa7" stroke="#fdcb6e" strokeWidth="0.5" />
            <rect x="12" y="2" width="8" height="22" rx="4" fill="#ffeaa7" stroke="#fdcb6e" strokeWidth="0.5" />
        </g>
    );
}

// ── Scared Spy Boy ──
function ScaredSpyBoy({ x = 0, y = 0, scale = 1 }) {
    return (
        <g transform={`translate(${x}, ${y}) scale(${scale})`}>
            {/* Body */}
            <rect x="-12" y="0" width="24" height="30" rx="6" fill="#2d3436" stroke="#636e72" strokeWidth="1.5" />
            <rect x="-12" y="18" width="24" height="4" fill="#e94560" rx="1" />
            {/* Head */}
            <circle cx="0" cy="-14" r="14" fill="#ffeaa7" stroke="#fdcb6e" strokeWidth="1" />
            {/* Hair */}
            <path d="M-14,-14 Q-14,-30 0,-28 Q14,-30 14,-14 Q10,-22 0,-20 Q-10,-22 -14,-14" fill="#6c5ce7" />
            {/* Shocked eyes */}
            <ellipse cx="-5" cy="-16" rx="4" ry="5" fill="white" />
            <ellipse cx="5" cy="-16" rx="4" ry="5" fill="white" />
            <circle cx="-5" cy="-15" r="2.5" fill="#2d3436" />
            <circle cx="5" cy="-15" r="2.5" fill="#2d3436" />
            {/* Open mouth (scared) */}
            <ellipse cx="0" cy="-6" rx="4" ry="5" fill="#2d3436" />
            <ellipse cx="0" cy="-4" rx="3" ry="2" fill="#e94560" />
            {/* Sweat drop */}
            <path d="M16,-20 Q18,-26 20,-20 Q18,-16 16,-20" fill="#74b9ff" />
            {/* Hands up */}
            <rect x="-24" y="-15" width="8" height="22" rx="4" fill="#ffeaa7" transform="rotate(-30,-20,-4)" />
            <rect x="16" y="-15" width="8" height="22" rx="4" fill="#ffeaa7" transform="rotate(30,20,-4)" />
            {/* Legs */}
            <rect x="-10" y="30" width="8" height="14" rx="3" fill="#2d3436" />
            <rect x="2" y="30" width="8" height="14" rx="3" fill="#2d3436" />
        </g>
    );
}

// ── Angry Owner ──
function AngryOwner({ x = 0, y = 0, scale = 1 }) {
    return (
        <g transform={`translate(${x}, ${y}) scale(${scale})`}>
            {/* Body */}
            <rect x="-16" y="0" width="32" height="35" rx="6" fill="#d63031" stroke="#c0392b" strokeWidth="1.5" />
            {/* Head */}
            <circle cx="0" cy="-14" r="16" fill="#ffeaa7" stroke="#fdcb6e" strokeWidth="1" />
            {/* Angry eyebrows */}
            <line x1="-10" y1="-22" x2="-2" y2="-18" stroke="#2d3436" strokeWidth="3" strokeLinecap="round" />
            <line x1="10" y1="-22" x2="2" y2="-18" stroke="#2d3436" strokeWidth="3" strokeLinecap="round" />
            {/* Angry eyes */}
            <circle cx="-5" cy="-14" r="3" fill="white" />
            <circle cx="5" cy="-14" r="3" fill="white" />
            <circle cx="-5" cy="-14" r="2" fill="#d63031" />
            <circle cx="5" cy="-14" r="2" fill="#d63031" />
            {/* Angry mouth */}
            <path d="M-6,-4 L-2,-6 L2,-6 L6,-4" fill="none" stroke="#2d3436" strokeWidth="2" />
            {/* Fist */}
            <circle cx="22" cy="5" r="8" fill="#ffeaa7" stroke="#fdcb6e" strokeWidth="1" />
            <line x1="18" y1="3" x2="26" y2="3" stroke="#fdcb6e" strokeWidth="1" />
            <line x1="18" y1="6" x2="26" y2="6" stroke="#fdcb6e" strokeWidth="1" />
            {/* Legs */}
            <rect x="-12" y="35" width="10" height="14" rx="3" fill="#2d3436" />
            <rect x="2" y="35" width="10" height="14" rx="3" fill="#2d3436" />
        </g>
    );
}

// ── Guard ──
function Guard({ x = 0, y = 0, scale = 1, alert = false }) {
    return (
        <g transform={`translate(${x}, ${y}) scale(${scale})`}>
            {/* Body */}
            <rect x="-14" y="0" width="28" height="32" rx="5" fill="#0a3d62" stroke="#3c6382" strokeWidth="1.5" />
            {/* Badge */}
            <polygon points="0,-2 4,4 -4,4" fill="#ffd700" />
            {/* Head */}
            <circle cx="0" cy="-14" r="13" fill="#dfe6e9" stroke="#b2bec3" strokeWidth="1" />
            {/* Cap */}
            <rect x="-14" y="-24" width="28" height="8" rx="3" fill="#0a3d62" />
            <rect x="-16" y="-18" width="32" height="3" rx="1" fill="#0a3d62" />
            {/* Eyes */}
            <circle cx="-4" cy="-14" r="2.5" fill={alert ? '#e94560' : '#2d3436'} />
            <circle cx="4" cy="-14" r="2.5" fill={alert ? '#e94560' : '#2d3436'} />
            {/* Mouth */}
            {alert
                ? <ellipse cx="0" cy="-6" rx="3" ry="3" fill="#2d3436" />
                : <line x1="-3" y1="-7" x2="3" y2="-7" stroke="#636e72" strokeWidth="1.5" />
            }
            {/* Alert icon */}
            {alert && <>
                <text x="12" y="-28" fontSize="14" fill="#e94560">!</text>
                <circle cx="14" cy="-24" r="8" fill="none" stroke="#e94560" strokeWidth="2" opacity="0.6">
                    <animate attributeName="r" from="8" to="16" dur="0.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="0.8s" repeatCount="indefinite" />
                </circle>
            </>}
            {/* Flashlight */}
            <rect x="14" y="5" width="5" height="16" rx="2" fill="#ffd700" />
            {alert && <polygon points="19,8 50,0 50,20 19,18" fill="rgba(255,215,0,0.25)" />}
            {/* Legs */}
            <rect x="-10" y="32" width="8" height="12" rx="3" fill="#0a3d62" />
            <rect x="2" y="32" width="8" height="12" rx="3" fill="#0a3d62" />
        </g>
    );
}

// ═══════════════════════════════════════
//  FULL SCENES
// ═══════════════════════════════════════

export function VaultScene() {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            {/* Background — Dark room */}
            <defs>
                <radialGradient id="vaultGlow" cx="50%" cy="60%" r="60%">
                    <stop offset="0%" stopColor="#1e3799" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#0a0a14" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="vaultBg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a1a2e" />
                    <stop offset="100%" stopColor="#2d3436" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#vaultBg)" />
            <rect width="400" height="180" fill="url(#vaultGlow)" />

            {/* Floor */}
            <rect x="0" y="150" width="400" height="30" fill="#2d3436" />
            <line x1="0" y1="150" x2="400" y2="150" stroke="#636e72" strokeWidth="1" />

            {/* Vault Door */}
            <rect x="220" y="40" width="100" height="110" rx="8" fill="#636e72" stroke="#b2bec3" strokeWidth="3" />
            <circle cx="270" cy="95" r="20" fill="none" stroke="#b2bec3" strokeWidth="3" />
            <line x1="270" y1="75" x2="270" y2="95" stroke="#b2bec3" strokeWidth="2" />
            <circle cx="270" cy="95" r="5" fill="#ffd700" />
            {/* Vault handle */}
            <rect x="295" y="85" width="15" height="6" rx="2" fill="#b2bec3" />

            {/* Cash on shelf */}
            <g transform="translate(340, 60)">
                <rect x="-12" y="0" width="24" height="14" rx="2" fill="#00b894" stroke="#55efc4" strokeWidth="1" />
                <text x="0" y="10" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="bold">$</text>
                <rect x="-10" y="-8" width="24" height="14" rx="2" fill="#00b894" stroke="#55efc4" strokeWidth="1" />
                <text x="2" y="4" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="bold">$</text>
            </g>

            {/* Spy Boy sneaking */}
            <g className="spy-sneak-anim">
                <SpyBoy x={100} y={100} scale={1.1} />
            </g>

            {/* Action lines */}
            <g opacity="0.15">
                <line x1="160" y1="60" x2="200" y2="80" stroke="#e94560" strokeWidth="2" />
                <line x1="155" y1="75" x2="195" y2="90" stroke="#e94560" strokeWidth="1.5" />
                <line x1="160" y1="90" x2="200" y2="100" stroke="#e94560" strokeWidth="1" />
            </g>
        </svg>
    );
}

export function VaultSuccessScene() {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
                <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0c2461" />
                    <stop offset="60%" stopColor="#1e3799" />
                    <stop offset="100%" stopColor="#4a69bd" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#nightSky)" />

            {/* Stars */}
            <circle cx="30" cy="20" r="1.5" fill="white" opacity="0.8" />
            <circle cx="120" cy="35" r="1" fill="white" opacity="0.6" />
            <circle cx="350" cy="15" r="1.5" fill="white" opacity="0.7" />
            <circle cx="280" cy="40" r="1" fill="white" opacity="0.5" />

            {/* Building */}
            <rect x="0" y="80" width="160" height="100" fill="#2d3436" />
            {/* Windows */}
            <rect x="20" y="90" width="20" height="25" rx="2" fill="#ffd700" opacity="0.5" />
            <rect x="60" y="90" width="20" height="25" rx="2" fill="#74b9ff" opacity="0.6" />
            <rect x="100" y="90" width="20" height="25" rx="2" fill="#ffd700" opacity="0.4" />
            {/* Broken window — spy jumped */}
            <rect x="60" y="60" width="25" height="25" rx="2" fill="rgba(116,185,255,0.3)" />
            <line x1="62" y1="62" x2="72" y2="72" stroke="#636e72" strokeWidth="1" />
            <line x1="83" y1="62" x2="73" y2="72" stroke="#636e72" strokeWidth="1" />

            {/* Parachute */}
            <g className="parachute-drift-anim">
                <path d="M200,15 Q230,5 260,15 Q260,45 230,40 Q200,45 200,15" fill="#e94560" opacity="0.9" />
                <path d="M210,15 Q230,8 250,15" fill="none" stroke="#ff6b81" strokeWidth="1" />
                {/* Strings */}
                <line x1="205" y1="30" x2="225" y2="70" stroke="#b2bec3" strokeWidth="1" />
                <line x1="255" y1="30" x2="235" y2="70" stroke="#b2bec3" strokeWidth="1" />
                <line x1="230" y1="35" x2="230" y2="70" stroke="#b2bec3" strokeWidth="1" />
                {/* Spy hanging */}
                <SpyBoy x={230} y={70} scale={0.7} />
            </g>

            {/* Flying cash */}
            <g className="cash-fly-anim">
                <rect x="170" y="50" width="16" height="10" rx="1" fill="#00b894" opacity="0.8" transform="rotate(-15,178,55)" />
                <rect x="190" y="70" width="16" height="10" rx="1" fill="#00b894" opacity="0.7" transform="rotate(10,198,75)" />
                <rect x="260" y="55" width="16" height="10" rx="1" fill="#00b894" opacity="0.6" transform="rotate(-25,268,60)" />
            </g>

            {/* City silhouette */}
            <rect x="280" y="120" width="40" height="60" fill="#2d3436" />
            <rect x="330" y="100" width="30" height="80" fill="#2d3436" />
            <rect x="370" y="130" width="30" height="50" fill="#2d3436" />
        </svg>
    );
}

export function VaultFailScene() {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
                <radialGradient id="alarmGlow" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#e94560" stopOpacity="0.25">
                        <animate attributeName="stop-opacity" values="0.25;0.1;0.25" dur="0.6s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="100%" stopColor="#1a1a2e" stopOpacity="0" />
                </radialGradient>
            </defs>
            <rect width="400" height="180" fill="#1a1a2e" />
            <rect width="400" height="180" fill="url(#alarmGlow)" />

            {/* Floor */}
            <rect x="0" y="150" width="400" height="30" fill="#2d3436" />

            {/* Broken door */}
            <g className="door-smash-anim">
                <rect x="180" y="30" width="60" height="120" rx="3" fill="#a0522d" stroke="#8B4513" strokeWidth="2" transform="rotate(12,210,90)" />
                {/* Crack lines */}
                <line x1="195" y1="50" x2="210" y2="90" stroke="#8B4513" strokeWidth="2" />
                <line x1="210" y1="60" x2="220" y2="100" stroke="#8B4513" strokeWidth="1.5" />
                {/* Break particles */}
                <rect x="175" y="60" width="6" height="4" fill="#a0522d" transform="rotate(-20,178,62)" />
                <rect x="240" y="50" width="5" height="3" fill="#a0522d" transform="rotate(30,242,51)" />
                <rect x="170" y="80" width="4" height="4" fill="#a0522d" transform="rotate(15,172,82)" />
            </g>

            {/* Angry Owner busting in */}
            <g className="owner-burst-anim">
                <AngryOwner x={300} y={95} scale={1.3} />
            </g>

            {/* Scared Spy */}
            <g className="spy-caught-anim">
                <ScaredSpyBoy x={90} y={100} scale={1.1} />
            </g>

            {/* Alarm lights */}
            <circle cx="50" cy="20" r="6" fill="#e94560">
                <animate attributeName="opacity" values="1;0.2;1" dur="0.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="350" cy="20" r="6" fill="#e94560">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="0.4s" repeatCount="indefinite" />
            </circle>

            {/* Impact lines */}
            <g opacity="0.3">
                <line x1="250" y1="40" x2="280" y2="30" stroke="#e94560" strokeWidth="2" />
                <line x1="250" y1="55" x2="285" y2="50" stroke="#e94560" strokeWidth="2" />
                <line x1="245" y1="70" x2="275" y2="70" stroke="#e94560" strokeWidth="1.5" />
            </g>
        </svg>
    );
}

export function EquipScene() {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
                <linearGradient id="shopBg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0a3d62" />
                    <stop offset="100%" stopColor="#1e3799" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#shopBg)" />

            {/* Floor */}
            <rect x="0" y="145" width="400" height="35" fill="#2d3436" />

            {/* Shelves */}
            <rect x="180" y="30" width="200" height="5" rx="1" fill="#636e72" />
            <rect x="180" y="75" width="200" height="5" rx="1" fill="#636e72" />
            <rect x="180" y="120" width="200" height="5" rx="1" fill="#636e72" />

            {/* Equipment on shelves */}
            {/* Flashlight */}
            <rect x="200" y="14" width="20" height="12" rx="3" fill="#ffd700" />
            <rect x="220" y="17" width="8" height="6" rx="1" fill="#fdcb6e" />
            {/* Binoculars */}
            <circle cx="260" cy="20" r="7" fill="#636e72" stroke="#b2bec3" strokeWidth="1" />
            <circle cx="275" cy="20" r="7" fill="#636e72" stroke="#b2bec3" strokeWidth="1" />
            <rect x="264" y="17" width="8" height="6" fill="#636e72" />
            {/* Keycard */}
            <rect x="310" y="12" width="25" height="16" rx="2" fill="#00b894" stroke="#55efc4" strokeWidth="1" />
            <rect x="315" y="20" width="15" height="3" rx="1" fill="#1a1a2e" />
            {/* Backpack */}
            <rect x="200" y="56" width="20" height="18" rx="4" fill="#6c5ce7" stroke="#a29bfe" strokeWidth="1" />
            <rect x="205" y="60" width="10" height="6" rx="2" fill="#a29bfe" />
            {/* Rope */}
            <path d="M265,58 Q275,62 265,68 Q275,72 265,76" fill="none" stroke="#ffeaa7" strokeWidth="3" />
            {/* Smoke bomb */}
            <circle cx="320" cy="65" r="8" fill="#636e72" stroke="#b2bec3" strokeWidth="1" />
            <path d="M320,57 Q325,50 318,48" fill="none" stroke="#b2bec3" strokeWidth="1.5" />
            {/* Grapple hook */}
            <path d="M200,103 L210,110 L200,117" fill="none" stroke="#b2bec3" strokeWidth="3" />
            <line x1="210" y1="110" x2="240" y2="110" stroke="#b2bec3" strokeWidth="2" />

            {/* Spy Boy shopping */}
            <g className="spy-sneak-anim">
                <SpyBoy x={80} y={95} scale={1.1} />
            </g>

            {/* Shopping cart */}
            <g transform="translate(120,125)">
                <rect x="0" y="-12" width="25" height="15" rx="2" fill="none" stroke="#b2bec3" strokeWidth="2" />
                <circle cx="5" cy="6" r="3" fill="#636e72" />
                <circle cx="20" cy="6" r="3" fill="#636e72" />
                <line x1="25" y1="-6" x2="32" y2="-14" stroke="#b2bec3" strokeWidth="2" />
            </g>
        </svg>
    );
}

export function EquipWrongScene() {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <rect width="400" height="180" fill="#1a1a2e" />
            <rect x="0" y="145" width="400" height="35" fill="#2d3436" />

            {/* BIG X mark */}
            <g className="wrong-x-anim" opacity="0.2">
                <line x1="100" y1="20" x2="300" y2="160" stroke="#e94560" strokeWidth="12" strokeLinecap="round" />
                <line x1="300" y1="20" x2="100" y2="160" stroke="#e94560" strokeWidth="12" strokeLinecap="round" />
            </g>

            {/* Wrong item bouncing */}
            <g className="wrong-item-bounce-anim">
                {/* Teddy bear */}
                <circle cx="200" cy="70" r="20" fill="#a0522d" />
                <circle cx="200" cy="52" r="14" fill="#a0522d" />
                <circle cx="190" cy="50" r="3" fill="#2d3436" />
                <circle cx="210" cy="50" r="3" fill="#2d3436" />
                <circle cx="200" cy="56" r="2" fill="#e94560" />
                {/* Ears */}
                <circle cx="188" cy="40" r="5" fill="#c0856d" />
                <circle cx="212" cy="40" r="5" fill="#c0856d" />
                {/* Arms */}
                <ellipse cx="178" cy="70" rx="6" ry="10" fill="#a0522d" />
                <ellipse cx="222" cy="70" rx="6" ry="10" fill="#a0522d" />
            </g>

            {/* "WRONG!" text effect */}
            <text x="200" y="130" textAnchor="middle" fontSize="28" fontWeight="900" fill="#e94560" fontFamily="sans-serif" letterSpacing="4" className="wrong-text-anim">
                WRONG!
            </text>

            {/* Confused spy */}
            <g className="spy-caught-anim">
                <ScaredSpyBoy x={330} y={95} scale={0.9} />
            </g>
        </svg>
    );
}

export function HackScene() {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <rect width="400" height="180" fill="#0a0a14" />
            <rect x="0" y="150" width="400" height="30" fill="#1a1a2e" />

            {/* Computer terminal */}
            <rect x="180" y="25" width="120" height="85" rx="5" fill="#2d3436" stroke="#636e72" strokeWidth="2" />
            {/* Screen */}
            <rect x="188" y="32" width="104" height="65" rx="3" fill="#0a0a14" />

            {/* Code on screen */}
            <g className="code-scroll-anim">
                <text x="195" y="48" fontSize="6" fill="#00b894" fontFamily="monospace">&gt; bypass_firewall()</text>
                <text x="195" y="58" fontSize="6" fill="#6c5ce7" fontFamily="monospace">password: ********</text>
                <text x="195" y="68" fontSize="6" fill="#00b894" fontFamily="monospace">&gt; decrypting...</text>
                <text x="195" y="78" fontSize="6" fill="#ffd700" fontFamily="monospace">&gt; ACCESS: ████████</text>
                <text x="195" y="88" fontSize="6" fill="#00b894" fontFamily="monospace">&gt; cracking_hash()</text>
                {/* Blinking cursor */}
                <rect x="195" y="91" width="5" height="7" fill="#00b894">
                    <animate attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite" />
                </rect>
            </g>

            {/* Monitor stand */}
            <rect x="225" y="110" width="30" height="8" rx="1" fill="#636e72" />
            <rect x="215" y="118" width="50" height="4" rx="2" fill="#636e72" />

            {/* Keyboard */}
            <rect x="200" y="126" width="80" height="15" rx="3" fill="#2d3436" stroke="#636e72" strokeWidth="1" />
            {/* Keys */}
            <g opacity="0.5">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i =>
                    <rect key={i} x={206 + i * 8} y={129} width="6" height="4" rx="1" fill="#636e72" />
                )}
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i =>
                    <rect key={i} x={210 + i * 8} y={135} width="6" height="3" rx="1" fill="#636e72" />
                )}
            </g>

            {/* Spy at keyboard */}
            <g className="hacker-type-anim">
                <SpyBoy x={120} y={100} scale={1} />
            </g>

            {/* Matrix-style falling chars */}
            <g opacity="0.1" className="matrix-rain">
                {[30, 60, 90, 320, 340, 360].map(x =>
                    <text key={x} x={x} fontSize="8" fill="#00b894" fontFamily="monospace">
                        <animate attributeName="y" values="-20;200" dur={`${2 + Math.random() * 2}s`} repeatCount="indefinite" />
                        {String.fromCharCode(48 + ((x % 10)))}
                    </text>
                )}
            </g>
        </svg>
    );
}

export function HackFailScene() {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <rect width="400" height="180" fill="#0a0a14" />

            {/* Alarm glow */}
            <rect width="400" height="180" fill="#e94560" opacity="0.1">
                <animate attributeName="opacity" values="0.1;0.25;0.1" dur="0.4s" repeatCount="indefinite" />
            </rect>

            {/* Screen with ACCESS DENIED */}
            <rect x="100" y="20" width="200" height="100" rx="8" fill="#2d3436" stroke="#e94560" strokeWidth="3" />
            <rect x="110" y="28" width="180" height="80" rx="4" fill="#0a0a14" />
            {/* Red warning */}
            <text x="200" y="60" textAnchor="middle" fontSize="14" fontWeight="900" fill="#e94560" fontFamily="monospace">
                ⛔ ACCESS DENIED ⛔
            </text>
            <text x="200" y="80" textAnchor="middle" fontSize="8" fill="#e94560" fontFamily="monospace" opacity="0.7">
                WRONG PASSWORD
            </text>
            <text x="200" y="95" textAnchor="middle" fontSize="8" fill="#e94560" fontFamily="monospace" opacity="0.5">
                SECURITY ALERT TRIGGERED
            </text>

            {/* Alarm icons */}
            <g className="alarm-shake-anim">
                <circle cx="50" cy="30" r="12" fill="none" stroke="#e94560" strokeWidth="2" />
                <circle cx="50" cy="30" r="5" fill="#e94560">
                    <animate attributeName="opacity" values="1;0.3;1" dur="0.3s" repeatCount="indefinite" />
                </circle>
                <line x1="42" y1="22" x2="38" y2="16" stroke="#e94560" strokeWidth="2" />
                <line x1="58" y1="22" x2="62" y2="16" stroke="#e94560" strokeWidth="2" />
            </g>
            <g className="alarm-shake-anim" transform="translate(300,0)">
                <circle cx="50" cy="30" r="12" fill="none" stroke="#e94560" strokeWidth="2" />
                <circle cx="50" cy="30" r="5" fill="#e94560">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="0.3s" repeatCount="indefinite" />
                </circle>
            </g>

            {/* Scared spy */}
            <g className="spy-caught-anim">
                <ScaredSpyBoy x={200} y={140} scale={0.8} />
            </g>
        </svg>
    );
}

export function StealthScene() {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <rect width="400" height="180" fill="#0a0a14" />
            <rect x="0" y="150" width="400" height="30" fill="#1a1a2e" />

            {/* Corridor walls */}
            <rect x="0" y="0" width="400" height="12" fill="#2d3436" />
            <rect x="0" y="0" width="8" height="180" fill="#2d3436" />
            <rect x="392" y="0" width="8" height="180" fill="#2d3436" />

            {/* Laser beams */}
            <line x1="8" y1="55" x2="392" y2="55" stroke="#e94560" strokeWidth="2" opacity="0.8">
                <animate attributeName="y1" values="55;65;55" dur="3s" repeatCount="indefinite" />
                <animate attributeName="y2" values="55;65;55" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="8" y1="55" x2="392" y2="55" stroke="#e94560" strokeWidth="6" opacity="0.15">
                <animate attributeName="y1" values="55;65;55" dur="3s" repeatCount="indefinite" />
                <animate attributeName="y2" values="55;65;55" dur="3s" repeatCount="indefinite" />
            </line>

            <line x1="8" y1="100" x2="392" y2="100" stroke="#e94560" strokeWidth="2" opacity="0.8">
                <animate attributeName="y1" values="100;85;100" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="y2" values="100;85;100" dur="2.5s" repeatCount="indefinite" />
            </line>
            <line x1="8" y1="100" x2="392" y2="100" stroke="#e94560" strokeWidth="6" opacity="0.15">
                <animate attributeName="y1" values="100;85;100" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="y2" values="100;85;100" dur="2.5s" repeatCount="indefinite" />
            </line>

            {/* Security cameras */}
            <g transform="translate(50,12)">
                <rect x="-4" y="0" width="8" height="10" fill="#636e72" />
                <rect x="-8" y="10" width="16" height="10" rx="3" fill="#636e72" />
                <circle cx="0" cy="15" r="3" fill="#e94560" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
                </circle>
            </g>

            {/* Spy crouching through */}
            <g className="stealth-move-anim">
                <SpyBoy x={160} y={105} scale={0.9} />
            </g>

            {/* Guard at end */}
            <Guard x={340} y={100} scale={0.9} />

            {/* Dim light patches */}
            <ellipse cx="200" cy="150" rx="50" ry="8" fill="#1e3799" opacity="0.15" />
        </svg>
    );
}

export function StealthFailScene() {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <rect width="400" height="180" fill="#0a0a14" />
            <rect x="0" y="150" width="400" height="30" fill="#1a1a2e" />

            {/* Spotlight beam */}
            <polygon points="300,12 140,150 260,150" fill="rgba(255,215,0,0.15)" className="spotlight-on-anim" />
            <polygon points="300,12 170,150 230,150" fill="rgba(255,215,0,0.08)" />

            {/* Spy caught in spotlight */}
            <g className="spy-caught-anim">
                <ScaredSpyBoy x={200} y={100} scale={1.1} />
            </g>

            {/* Guard alerted */}
            <g className="guard-alert-anim">
                <Guard x={330} y={100} scale={1} alert={true} />
            </g>

            {/* Flashlight source */}
            <circle cx="300" cy="12" r="8" fill="#ffd700" opacity="0.8" />

            {/* Alert rings */}
            <circle cx="200" cy="100" r="30" fill="none" stroke="#e94560" strokeWidth="2" opacity="0.3">
                <animate attributeName="r" from="30" to="60" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.3" to="0" dur="1s" repeatCount="indefinite" />
            </circle>
        </svg>
    );
}

export function CodeScene() {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
                <linearGradient id="codeBg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e272e" />
                    <stop offset="100%" stopColor="#2c3e50" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#codeBg)" />
            <rect x="0" y="150" width="400" height="30" fill="#2d3436" />

            {/* Large monitor */}
            <rect x="140" y="15" width="160" height="100" rx="6" fill="#2d3436" stroke="#636e72" strokeWidth="2" />
            <rect x="148" y="22" width="144" height="82" rx="3" fill="#0a0a14" />

            {/* Code on screen */}
            <text x="155" y="37" fontSize="6.5" fill="#6c5ce7" fontFamily="monospace">function solve(x) {'{'}</text>
            <text x="155" y="48" fontSize="6.5" fill="#00b894" fontFamily="monospace">  let key = x * ???</text>
            <text x="155" y="59" fontSize="6.5" fill="#e94560" fontFamily="monospace">  if (key === CODE) {'{'}</text>
            <text x="155" y="70" fontSize="6.5" fill="#ffd700" fontFamily="monospace">    unlock_door()</text>
            <text x="155" y="81" fontSize="6.5" fill="#e94560" fontFamily="monospace">  {'}'}</text>
            <text x="155" y="92" fontSize="6.5" fill="#6c5ce7" fontFamily="monospace">{'}'}</text>
            {/* Cursor */}
            <rect x="155" y="96" width="5" height="7" fill="#00b894">
                <animate attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite" />
            </rect>

            {/* Monitor stand */}
            <rect x="200" y="115" width="40" height="6" rx="1" fill="#636e72" />
            <rect x="190" y="121" width="60" height="4" rx="2" fill="#636e72" />

            {/* Spy typing */}
            <g className="hacker-type-anim">
                <SpyBoy x={80} y={100} scale={1} />
            </g>

            {/* Binary decorations */}
            <g opacity="0.08">
                <text x="20" y="30" fontSize="8" fill="#00b894" fontFamily="monospace">01001</text>
                <text x="330" y="50" fontSize="8" fill="#00b894" fontFamily="monospace">11010</text>
                <text x="340" y="130" fontSize="8" fill="#6c5ce7" fontFamily="monospace">10110</text>
            </g>
        </svg>
    );
}


export function EscapeScene({ playerPos = 10 }) {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
                <linearGradient id="escapeSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0c2461" />
                    <stop offset="40%" stopColor="#1e3799" />
                    <stop offset="100%" stopColor="#4a69bd" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#escapeSky)" />

            {/* Stars */}
            <circle cx="40" cy="15" r="1.5" fill="white" opacity="0.7" />
            <circle cx="150" cy="25" r="1" fill="white" opacity="0.5" />
            <circle cx="250" cy="10" r="1.5" fill="white" opacity="0.8" />

            {/* Rooftop */}
            <rect x="0" y="130" width="400" height="50" fill="#2d3436" />
            <rect x="0" y="128" width="400" height="5" fill="#636e72" />

            {/* Building details */}
            <rect x="10" y="135" width="15" height="20" rx="2" fill="#636e72" opacity="0.5" />
            <rect x="30" y="140" width="10" height="15" rx="2" fill="#636e72" opacity="0.4" />

            {/* Helicopter */}
            <g className="helicopter-hover-anim" transform="translate(310,50)">
                {/* Body */}
                <ellipse cx="0" cy="0" rx="30" ry="14" fill="#636e72" stroke="#b2bec3" strokeWidth="1.5" />
                {/* Cockpit */}
                <ellipse cx="20" cy="-2" rx="14" ry="10" fill="#74b9ff" opacity="0.5" />
                {/* Tail */}
                <rect x="-55" y="-4" width="30" height="8" rx="3" fill="#636e72" />
                <rect x="-60" y="-14" width="8" height="18" rx="2" fill="#636e72" />
                {/* Rotor */}
                <line x1="-35" y1="-14" x2="35" y2="-14" stroke="#b2bec3" strokeWidth="2">
                    <animate attributeName="x1" values="-35;35;-35" dur="0.2s" repeatCount="indefinite" />
                    <animate attributeName="x2" values="35;-35;35" dur="0.2s" repeatCount="indefinite" />
                </line>
                {/* Skids */}
                <line x1="-15" y1="14" x2="-15" y2="22" stroke="#b2bec3" strokeWidth="2" />
                <line x1="15" y1="14" x2="15" y2="22" stroke="#b2bec3" strokeWidth="2" />
                <line x1="-25" y1="22" x2="25" y2="22" stroke="#b2bec3" strokeWidth="2" />
                {/* Light */}
                <circle cx="30" cy="0" r="3" fill="#e94560">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
                </circle>
            </g>

            {/* Spy running */}
            <g style={{ transform: `translateX(${playerPos * 3}px)` }} className="spy-run-anim">
                <SpyBoy x={40} y={85} scale={0.9} />
            </g>

            {/* Wind lines */}
            <g opacity="0.2">
                <line x1="50" y1="70" x2="100" y2="70" stroke="white" strokeWidth="1" />
                <line x1="80" y1="80" x2="140" y2="80" stroke="white" strokeWidth="1" />
                <line x1="60" y1="90" x2="120" y2="90" stroke="white" strokeWidth="0.5" />
            </g>
        </svg>
    );
}

export function CaughtScene() {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <rect width="400" height="180" fill="#2d3436" />

            {/* Spotlight */}
            <circle cx="200" cy="90" r="100" fill="rgba(255, 255, 255, 0.1)" />
            <circle cx="200" cy="90" r="80" fill="rgba(255, 255, 255, 0.1)" />

            {/* Jail Bars Background - Darker */}
            <g stroke="#000" strokeWidth="6" opacity="0.3">
                {[40, 80, 120, 160, 200, 240, 280, 320, 360].map(x => (
                    <line key={x} x1={x} y1="0" x2={x} y2="180" />
                ))}
            </g>

            {/* Sad Spy */}
            <g transform="translate(180, 90)">
                <ScaredSpyBoy scale={1.2} />
            </g>

            {/* Jail Bars Foreground - Slamming Down Animation */}
            <g stroke="#b2bec3" strokeWidth="8">
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    from="0 -200"
                    to="0 0"
                    dur="0.5s"
                    fill="freeze"
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1"
                />
                {[40, 80, 120, 160, 200, 240, 280, 320, 360].map(x => (
                    <line key={x} x1={x} y1="0" x2={x} y2="180" />
                ))}
                {/* Cross bars */}
                <line x1="0" y1="40" x2="400" y2="40" />
                <line x1="0" y1="140" x2="400" y2="140" />
            </g>

            {/* Lock */}
            <g transform="translate(200, 90)">
                <animateTransform
                    attributeName="transform"
                    type="scale"
                    values="0; 1.5; 1"
                    dur="0.4s"
                    begin="0.5s"
                    fill="freeze"
                />
                <rect x="-15" y="-15" width="30" height="25" rx="3" fill="#ffd700" stroke="#e67e22" strokeWidth="2" />
                <path d="M-10,-15 Q-10,-30 0,-30 Q10,-30 10,-15" fill="none" stroke="#b2bec3" strokeWidth="4" />
                <circle cx="0" cy="-2" r="3" fill="#2d3436" />
                <rect x="-2" y="-2" width="4" height="8" fill="#2d3436" />
            </g>

            {/* CAUGHT Text */}
            <text x="200" y="160" textAnchor="middle" fontSize="40" fontWeight="900" fill="#e94560" stroke="white" strokeWidth="1" transform="rotate(-5, 200, 160)">
                <animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.6s" fill="freeze" />
                CAUGHT!
            </text>
        </svg>
    );
}

export function GrabMoneyScene() {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
                <linearGradient id="vaultGlow" cx="50%" cy="60%" r="60%">
                    <stop offset="0%" stopColor="#1e3799" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#0a0a14" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="vaultBg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a1a2e" />
                    <stop offset="100%" stopColor="#2d3436" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#vaultBg)" />
            <rect width="400" height="180" fill="url(#vaultGlow)" />

            {/* Vault Shelves */}
            <rect x="0" y="150" width="400" height="30" fill="#2d3436" />
            <rect x="220" y="40" width="100" height="110" rx="8" fill="#636e72" stroke="#b2bec3" strokeWidth="3" />

            {/* Open Vault Door */}
            <g transform="translate(140, 40) rotate(-45, 0, 55)">
                <rect x="0" y="0" width="80" height="110" rx="8" fill="#b2bec3" stroke="#636e72" strokeWidth="3" />
                <circle cx="60" cy="55" r="15" fill="#636e72" />
                <rect x="10" y="10" width="20" height="90" fill="#95a5a6" />
            </g>

            {/* Action Lines */}
            <g transform="translate(200, 90)">
                <line x1="-50" y1="0" x2="50" y2="0" stroke="white" strokeWidth="2" strokeDasharray="10,10" opacity="0.5">
                    <animate attributeName="x1" values="-50;0" dur="0.2s" fill="freeze" />
                    <animate attributeName="opacity" values="0.5;0" dur="0.5s" fill="freeze" />
                </line>
            </g>

            {/* Spy Grabbing */}
            <g transform="translate(150, 100)">
                <SpyBoy scale={1.1} />
                {/* Arm reaching out */}
                <path d="M12,2 Q30,-10 45,5" fill="none" stroke="#fdcb6e" strokeWidth="6" strokeLinecap="round">
                    <animate attributeName="d" values="M12,2 Q30,-10 45,5; M12,2 Q20,10 15,15" dur="0.3s" begin="0.1s" fill="freeze" />
                </path>
            </g>

            {/* Money Bag */}
            <g transform="translate(260, 110)">
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="260,110; 160,110"
                    dur="0.3s"
                    begin="0.1s"
                    fill="freeze"
                />
                <animate attributeName="opacity" values="1;0" dur="0.1s" begin="0.35s" fill="freeze" />

                <path d="M-15,0 Q-15,-20 0,-25 Q15,-20 15,0 Q15,15 0,15 Q-15,15 -15,0" fill="#00b894" stroke="#00cec9" strokeWidth="1.5" />
                <rect x="-8" y="-18" width="16" height="4" fill="#fdcb6e" />
                <text x="0" y="5" textAnchor="middle" fontSize="16" fill="#fdcb6e" fontWeight="bold">$</text>
            </g>

            {/* Floating +$$$ */}
            <g transform="translate(160, 80)" opacity="0">
                <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.4s" />
                <animateTransform attributeName="transform" type="translate" values="160,80; 160,40" dur="1s" begin="0.4s" />
                <text x="0" y="0" textAnchor="middle" fontSize="24" fill="#2ecc71" fontWeight="bold" stroke="white" strokeWidth="1">+$500</text>
            </g>
        </svg>
    );
}

export function GrabItemScene() {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
                <linearGradient id="shopBg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0a3d62" />
                    <stop offset="100%" stopColor="#1e3799" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#shopBg)" />
            <rect x="0" y="145" width="400" height="35" fill="#2d3436" />

            {/* Shelves */}
            <rect x="180" y="30" width="200" height="5" rx="1" fill="#636e72" />
            <rect x="180" y="75" width="200" height="5" rx="1" fill="#636e72" />
            <rect x="180" y="120" width="200" height="5" rx="1" fill="#636e72" />

            {/* Other Items Fading Out */}
            <g opacity="0.3">
                <rect x="310" y="12" width="25" height="16" rx="2" fill="#00b894" stroke="#55efc4" strokeWidth="1" />
                <rect x="200" y="56" width="20" height="18" rx="4" fill="#6c5ce7" stroke="#a29bfe" strokeWidth="1" />
            </g>

            {/* Spy Grabbing */}
            <g className="spy-sneak-anim">
                <SpyBoy x={100} y={95} scale={1.1} />
                {/* Arm swiping */}
                <path d="M12,2 Q40,-10 60,5" fill="none" stroke="#fdcb6e" strokeWidth="6" strokeLinecap="round">
                    <animate attributeName="d" values="M12,2 Q40,-10 60,5; M12,2 Q30,15 20,20" dur="0.3s" begin="0.1s" fill="freeze" />
                </path>
            </g>

            {/* Item Flying into bag */}
            <g transform="translate(200, 30)">
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="200,30; 110,100"
                    dur="0.3s"
                    begin="0.1s"
                    fill="freeze"
                />
                <animateTransform
                    attributeName="transform"
                    type="scale"
                    values="1; 0.2"
                    dur="0.3s"
                    begin="0.1s"
                    fill="freeze"
                    additive="sum"
                />
                <animate attributeName="opacity" values="1;0" dur="0.1s" begin="0.35s" fill="freeze" />

                {/* Generic Gadget (Flashlight) */}
                <rect x="-10" y="-6" width="20" height="12" rx="3" fill="#ffd700" />
                <rect x="10" y="-3" width="8" height="6" rx="1" fill="#fdcb6e" />

                {/* Speed lines */}
                <line x1="-15" y1="0" x2="-35" y2="-5" stroke="white" strokeWidth="2" opacity="0.5" />
                <line x1="-15" y1="5" x2="-30" y2="10" stroke="white" strokeWidth="2" opacity="0.5" />
            </g>

            {/* "GOT IT!" Bubble */}
            <g transform="translate(140, 60)" opacity="0">
                <animate attributeName="opacity" values="0;1;1;0" dur="1s" begin="0.3s" />
                <animateTransform attributeName="transform" type="scale" values="0;1.2;1" dur="0.3s" begin="0.3s" fill="freeze" additive="sum" />

                <path d="M0,0 Q10,-10 20,0 Q30,-10 40,0 L35,20 L5,20 Z" fill="white" stroke="#2d3436" strokeWidth="2" />
                <text x="20" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#00b894">GOT IT!</text>
            </g>
        </svg>
    );
}

export function HackSuccessScene() {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <rect width="400" height="180" fill="#0a0a14" />
            <rect x="0" y="150" width="400" height="30" fill="#1a1a2e" />

            {/* Computer terminal - Green Glow */}
            <rect x="180" y="25" width="120" height="85" rx="5" fill="#2d3436" stroke="#00b894" strokeWidth="3">
                <animate attributeName="stroke-width" values="3;5;3" dur="1s" repeatCount="indefinite" />
            </rect>
            {/* Screen */}
            <rect x="188" y="32" width="104" height="65" rx="3" fill="#000" />

            {/* Access Granted Screen */}
            <rect x="188" y="32" width="104" height="65" rx="3" fill="#00b894" opacity="0.1">
                <animate attributeName="opacity" values="0.1;0.3;0.1" dur="0.5s" repeatCount="indefinite" />
            </rect>

            <text x="240" y="60" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#00b894" fontFamily="monospace">ACCESS GRANTED</text>
            <text x="240" y="75" textAnchor="middle" fontSize="30" fontWeight="bold" fill="#00b894">🔓</text>

            {/* Spy typing fast */}
            <g className="hacker-type-anim">
                <SpyBoy x={120} y={100} scale={1} />
                {/* Speed lines near hands */}
                <line x1="160" y1="120" x2="170" y2="110" stroke="#00b894" strokeWidth="1" opacity="0.6">
                    <animate attributeName="x1" values="160;165;160" dur="0.1s" repeatCount="indefinite" />
                </line>
                <line x1="180" y1="120" x2="190" y2="130" stroke="#00b894" strokeWidth="1" opacity="0.6">
                    <animate attributeName="x2" values="190;185;190" dur="0.1s" repeatCount="indefinite" />
                </line>
            </g>

            {/* Matrix Rain - Intense */}
            <g opacity="0.3">
                {[40, 80, 120, 320, 360].map((x, i) =>
                    <text key={x} x={x} fontSize="8" fill="#00b894" fontFamily="monospace">
                        <animate attributeName="y" values="-20;200" dur={`${0.5 + i * 0.2}s`} repeatCount="indefinite" />
                        10101
                    </text>
                )}
            </g>
        </svg>
    );
}

export function StealthSuccessScene() {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <rect width="400" height="180" fill="#0a0a14" />
            <rect x="0" y="150" width="400" height="30" fill="#1a1a2e" />

            {/* Lasers - Deactivated/Flickering out */}
            <line x1="8" y1="55" x2="392" y2="55" stroke="#e94560" strokeWidth="1" opacity="0.2" strokeDasharray="5,5" />
            <line x1="8" y1="100" x2="392" y2="100" stroke="#e94560" strokeWidth="1" opacity="0.2" strokeDasharray="5,5" />

            {/* Guard Looking Away / Sleeping */}
            <g transform="translate(340, 100) scale(0.9)">
                {/* Zzz animation */}
                <text x="10" y="-30" fontSize="12" fill="white" opacity="0.8">Z</text>
                <text x="20" y="-40" fontSize="14" fill="white" opacity="0.6">z</text>
                <Guard alert={false} />
            </g>

            {/* Spy Rolling / Sneaking Past */}
            <g>
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="50,110; 250,110"
                    dur="1s"
                    fill="freeze"
                />
                <SpyBoy scale={0.9} />
                {/* Motion blur */}
                <rect x="-20" y="10" width="40" height="2" fill="white" opacity="0.2" />
            </g>

            {/* "NINJA!" Text */}
            <text x="200" y="40" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#6c5ce7" opacity="0" transform="rotate(-5, 200, 40)">
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.5s" />
                🥷 NINJA!
            </text>
        </svg>
    );
}

export function CodeSuccessScene() {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
                <radialGradient id="unlockGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00b894" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#00b894" stopOpacity="0" />
                </radialGradient>
            </defs>
            <rect width="400" height="180" fill="#1e272e" />
            <rect x="0" y="150" width="400" height="30" fill="#2d3436" />

            {/* Huge Digital Lock */}
            <circle cx="200" cy="80" r="60" fill="#2d3436" stroke="#636e72" strokeWidth="4" />

            {/* Spinning Lock Dial */}
            <g transform="translate(200, 80)">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0; 360; 720; 0"
                    dur="0.6s"
                    fill="freeze"
                />
                <circle cx="0" cy="0" r="45" fill="#0a0a14" stroke="#00b894" strokeWidth="2" />
                <line x1="0" y1="-45" x2="0" y2="-35" stroke="#00b894" strokeWidth="4" />
                <line x1="0" y1="45" x2="0" y2="35" stroke="#00b894" strokeWidth="4" />
                <line x1="-45" y1="0" x2="-35" y2="0" stroke="#00b894" strokeWidth="4" />
                <line x1="45" y1="0" x2="35" y2="0" stroke="#00b894" strokeWidth="4" />

                {/* Center Green Light */}
                <circle cx="0" cy="0" r="15" fill="#00b894">
                    <animate attributeName="fill" values="#2d3436; #00b894" dur="0.6s" fill="freeze" />
                </circle>
            </g>

            {/* Unlock Glow */}
            <circle cx="200" cy="80" r="80" fill="url(#unlockGlow)" opacity="0">
                <animate attributeName="opacity" values="0;1;0" dur="0.8s" begin="0.6s" />
            </circle>

            {/* "UNLOCKED" Text */}
            <text x="200" y="170" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#00b894" letterSpacing="4">
                <animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.6s" fill="freeze" />
                UNLOCKED
            </text>

            {/* Spy giving thumbs up */}
            <g transform="translate(40, 100)">
                <animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.6s" fill="freeze" />
                <SpyBoy scale={1} />
                <g transform="translate(0, 0)">
                    {/* Manual Thumbs Up Arm - adjusted */}
                    {/* Ignoring refined arm to avoid complexity, keeping standard SpyBoy as base */}
                </g>
            </g>
        </svg>
    );
}

export function AdventureIntroScene() {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
                <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#74b9ff" />
                    <stop offset="100%" stopColor="#dfe6e9" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#skyGradient)" />

            {/* Mountains */}
            <path d="M0,180 L100,50 L200,180" fill="#636e72" stroke="#2d3436" strokeWidth="2" />
            <path d="M150,180 L250,20 L350,180" fill="#b2bec3" stroke="#2d3436" strokeWidth="2" />
            <path d="M280,180 L380,80 L480,180" fill="#636e72" stroke="#2d3436" strokeWidth="2" />

            {/* Snow Caps */}
            <path d="M100,50 L120,80 L100,70 L80,80 Z" fill="white" />
            <path d="M250,20 L280,60 L250,50 L220,60 Z" fill="white" />

            <SpyBoy x={50} y={130} />

            <text x="200" y="160" textAnchor="middle" fontSize="14" fill="#2d3436" fontWeight="bold">TO THE TOP!</text>
        </svg>
    );
}

export function AdventureShopScene() {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <rect width="400" height="180" fill="#2d3436" />

            {/* Tent */}
            <path d="M100,150 L200,50 L300,150" fill="#e17055" stroke="#d63031" strokeWidth="3" />
            <path d="M180,150 L200,50 L220,150" fill="#2d3436" />

            {/* Campfire */}
            <circle cx="200" cy="160" r="15" fill="#e17055" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="1s" repeatCount="indefinite" />
            </circle>
            <path d="M190,170 L210,150 M210,170 L190,150" stroke="#636e72" strokeWidth="3" />

            {/* Merchant */}
            <circle cx="200" cy="120" r="10" fill="#ffeaa7" />
            <text x="200" y="40" textAnchor="middle" fill="white" fontSize="16">BASE CAMP</text>
        </svg>
    );
}

export function AdventureBattleScene({ monsterHp }) {
    return (
        <svg viewBox="0 0 400 180" className="comic-scene-svg" preserveAspectRatio="xMidYMid meet">
            <rect width="400" height="180" fill="#dfe6e9" />

            {/* Spy */}
            <SpyBoy x={80} y={100} />

            {/* Yeti */}
            <g transform="translate(280, 80)">
                <ellipse cx="0" cy="0" rx="40" ry="50" fill="white" stroke="#b2bec3" strokeWidth="2" />
                <circle cx="-15" cy="-10" r="5" fill="#d63031" />
                <circle cx="15" cy="-10" r="5" fill="#d63031" />
                <path d="M-20,20 Q0,40 20,20" fill="none" stroke="#2d3436" strokeWidth="3" />
                {/* Arms */}
                <path d="M-35,0 L-60,20" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M35,0 L60,20" stroke="white" strokeWidth="10" strokeLinecap="round" />
            </g>

            {/* HP Bar */}
            <rect x="240" y="20" width="80" height="10" fill="#fab1a0" />
            <rect x="240" y="20" width={80 * (monsterHp / 3)} height="10" fill="#d63031" />
        </svg>
    );
}
