import React from 'react';

export default function TerminalSchematic() {
  return (
    <div className="w-full max-w-full overflow-hidden border border-black bg-white shadow-none">
      {/* Schematic Top Metadata Strip */}
      <div className="flex items-center justify-between border-b border-black px-3 py-1.5 bg-[#F4F4F2] font-mono text-[10px] text-[#525252]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-black">SCHEMATIC_REF:</span>
          <span className="text-[#0055FF] font-bold">TERMINAL-WS-01</span>
          <span className="hidden sm:inline text-[#737373]">{'//'}</span>
          <span className="hidden sm:inline">SYS: SCHEMATIC_VECTOR</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-[#737373]">DIM: 1024x640mm // AXIS-01</span>
          <span className="border border-black/20 px-1.5 py-0.5 bg-white text-black font-semibold">
            SCALE: 1:1
          </span>
        </div>
      </div>

      {/* SVG Technical Workstation Schematic */}
      <svg
        viewBox="0 0 800 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-full block select-none"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Technical Engineering Terminal Schematic"
      >
        <defs>
          <pattern id="schematic-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 0, 0, 0.04)" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Background Grid Pattern within SVG */}
        <rect x="0" y="0" width="800" height="480" fill="url(#schematic-grid)" />

        {/* Outer Frame Perimeter (1px structural line) */}
        <rect
          x="1"
          y="1"
          width="798"
          height="478"
          stroke="#000000"
          strokeWidth="1"
          fill="none"
          className="schematic-frame-draw"
        />

        {/* Technical Corner Brackets */}
        {/* Top-Left */}
        <path d="M 8 20 L 8 8 L 20 8" stroke="#000000" strokeWidth="1.5" fill="none" />
        {/* Top-Right */}
        <path d="M 780 8 L 792 8 L 792 20" stroke="#000000" strokeWidth="1.5" fill="none" />
        {/* Bottom-Left */}
        <path d="M 8 460 L 8 472 L 20 472" stroke="#000000" strokeWidth="1.5" fill="none" />
        {/* Bottom-Right */}
        <path d="M 780 472 L 792 472 L 792 460" stroke="#000000" strokeWidth="1.5" fill="none" />

        {/* Header Telemetry Bar Line */}
        <line x1="1" y1="32" x2="799" y2="32" stroke="#000000" strokeWidth="1" className="schematic-line-draw" />

        {/* Header Bar Telemetry Text */}
        <g className="font-mono text-[9px]" fill="#0A0A0A" style={{ fontFamily: 'monospace' }}>
          <text x="14" y="21" fontWeight="bold" fontSize="9" letterSpacing="0.05em">
            SYSTEM TELEMETRY // WORKSTATION TERMINAL [NODE: AG-SYS-01]
          </text>
          <text x="470" y="21" fill="#525252" fontSize="8" className="hidden sm:inline">
            CPU: ARM64/X86_64
          </text>
          <text x="590" y="21" fill="#525252" fontSize="8">
            BUS_FREQ: 3.8GHz
          </text>
          <text x="705" y="21" fill="#0055FF" fontWeight="bold" fontSize="8">
            PWR: 100% OK
          </text>
        </g>

        {/* Dimension & Measurement Axis Marks (Top) */}
        <g stroke="#000000" strokeWidth="0.75" className="schematic-line-draw">
          <line x1="40" y1="36" x2="40" y2="42" />
          <line x1="110" y1="36" x2="110" y2="40" />
          <line x1="180" y1="36" x2="180" y2="40" />
          <line x1="250" y1="36" x2="250" y2="42" />
          <line x1="320" y1="36" x2="320" y2="40" />
          <line x1="390" y1="36" x2="390" y2="40" />
          <line x1="460" y1="36" x2="460" y2="42" />
          <line x1="530" y1="36" x2="530" y2="40" />
          <line x1="600" y1="36" x2="600" y2="40" />
          <line x1="670" y1="36" x2="670" y2="42" />
          <line x1="740" y1="36" x2="740" y2="42" />
        </g>
        <g fill="#737373" className="font-mono text-[7px]" style={{ fontFamily: 'monospace' }}>
          <text x="42" y="41" fontSize="7">X:000mm</text>
          <text x="252" y="41" fontSize="7">X:250mm</text>
          <text x="462" y="41" fontSize="7">X:500mm</text>
          <text x="672" y="41" fontSize="7">X:750mm</text>
          <text x="742" y="41" fontSize="7">DIM: 1024x640</text>
        </g>

        {/* Main Terminal Display Chassis Box */}
        <rect
          x="28"
          y="48"
          width="744"
          height="384"
          stroke="#000000"
          strokeWidth="1"
          fill="#FAFAF9"
          className="schematic-frame-draw"
        />

        {/* Inner Terminal Header Bar */}
        <rect x="29" y="49" width="742" height="26" fill="#F4F4F2" />
        <line x1="28" y1="75" x2="772" y2="75" stroke="#000000" strokeWidth="1" className="schematic-line-draw" />

        {/* Terminal Window Controls / Indicators */}
        <g fill="none" stroke="#000000" strokeWidth="1">
          <circle cx="44" cy="62" r="3.5" fill="#FFFFFF" />
          <circle cx="56" cy="62" r="3.5" fill="#FFFFFF" />
          <circle cx="68" cy="62" r="3.5" fill="#0055FF" />
        </g>

        {/* Terminal Window Title */}
        <g className="font-mono" fill="#0A0A0A" style={{ fontFamily: 'monospace' }}>
          <text x="84" y="66" fontSize="9" fontWeight="bold" letterSpacing="0.02em">
            TERMINAL // zsh — ag@workstation: ~/projects/kairoku (main)
          </text>
          <text x="680" y="66" fontSize="8" fill="#0055FF" fontWeight="bold">
            STATUS: ONLINE
          </text>
        </g>

        {/* Terminal Screen Text Output (Sequential Reveal) */}
        <g className="font-mono" style={{ fontFamily: 'monospace' }}>
          {/* Prompt 1: Command Executed */}
          <g className="term-line-1">
            <text x="44" y="110" fontSize="16" fontWeight="bold" fill="#0055FF">
              ag@workstation:~$
            </text>
            <text x="210" y="110" fontSize="16" fill="#0A0A0A">
              kairoku init --prod
            </text>
          </g>

          {/* Response Line 2 */}
          <g className="term-line-2">
            <text x="44" y="150" fontSize="14" fill="#525252">
              [SYS:001]
            </text>
            <text x="120" y="150" fontSize="14" fill="#0A0A0A">
              Initializing hardware telemetry bus...
            </text>
            <text x="600" y="150" fontSize="14" fontWeight="bold" fill="#0055FF">
              [OK]
            </text>
          </g>

          {/* Response Line 3 */}
          <g className="term-line-3">
            <text x="44" y="190" fontSize="14" fill="#525252">
              [SYS:002]
            </text>
            <text x="120" y="190" fontSize="14" fill="#0A0A0A">
              Mounting engine: /opt/kairoku/core...
            </text>
            <text x="600" y="190" fontSize="14" fontWeight="bold" fill="#0055FF">
              [OK]
            </text>
          </g>

          {/* Response Line 4 */}
          <g className="term-line-4">
            <text x="44" y="230" fontSize="14" fill="#525252">
              [SYS:003]
            </text>
            <text x="120" y="230" fontSize="14" fill="#0A0A0A">
              Microservices cluster: 6/6 pods...
            </text>
            <text x="600" y="230" fontSize="14" fontWeight="bold" fill="#0055FF">
              [ONLINE]
            </text>
          </g>

          {/* Diagnostics Box inside Terminal */}
          <g className="term-line-5">
            <rect x="44" y="260" width="712" height="70" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
            <text x="56" y="286" fontSize="14" fontWeight="bold" fill="#0A0A0A">
              DIAGNOSTIC TELEMETRY REPORT:
            </text>
            <text x="56" y="312" fontSize="14" fill="#525252">
              CPU: 0.12% // IO: active // STATUS: NOMINAL
            </text>
          </g>

          {/* Active Prompt with Blinking Monospace Cursor */}
          <g className="term-line-6">
            <text x="44" y="380" fontSize="16" fontWeight="bold" fill="#0055FF">
              ag@workstation:~/kairoku$
            </text>
            <text x="290" y="380" fontSize="16" fill="#0A0A0A">
              sys-status
            </text>
            <text
              x="400"
              y="380"
              fontSize="18"
              fontWeight="bold"
              fill="#0055FF"
              className="animate-terminal-cursor"
            >
              █
            </text>
          </g>
        </g>

        {/* Hardware Schematic Circuit / Bus Traces */}
        <g stroke="#000000" strokeWidth="1" fill="none" className="schematic-bus-draw">
          {/* Right Bus Line */}
          <path d="M 772 100 L 788 100 L 788 140 L 795 140" />
          <path d="M 772 200 L 788 200 L 788 240 L 795 240" />
          <path d="M 772 300 L 788 300 L 788 340 L 795 340" />
          {/* Left Bus Line */}
          <path d="M 28 100 L 12 100 L 12 140 L 5 140" />
          <path d="M 28 200 L 12 200 L 12 240 L 5 240" />
          <path d="M 28 300 L 12 300 L 12 340 L 5 340" />
        </g>

        {/* Bus Nodes */}
        <g fill="#0055FF">
          <circle cx="795" cy="140" r="2.5" />
          <circle cx="795" cy="240" r="2.5" />
          <circle cx="795" cy="340" r="2.5" />
          <circle cx="5" cy="140" r="2.5" />
          <circle cx="5" cy="240" r="2.5" />
          <circle cx="5" cy="340" r="2.5" />
        </g>

        {/* Bottom Technical Measurement / Dimension Footer Bar */}
        <line x1="1" y1="444" x2="799" y2="444" stroke="#000000" strokeWidth="1" className="schematic-line-draw" />
        <g className="font-mono text-[8px]" fill="#525252" style={{ fontFamily: 'monospace' }}>
          <text x="14" y="462" fontWeight="bold" fill="#0A0A0A">
            SCHEMATIC SPEC: IEEE-1471-SYS // REVISION: 2.6.0 // DIM_REF: 1024x640
          </text>
          <text x="320" y="462" className="hidden sm:inline">
            BUS_BANDWIDTH: 128GB/s // LATENCY: &lt;1ms // PORT: 8080
          </text>
          <text x="600" y="462" fill="#0055FF" fontWeight="bold">
            DIAGNOSTICS: NOMINAL [SYS_OK]
          </text>
        </g>
      </svg>
    </div>
  );
}
