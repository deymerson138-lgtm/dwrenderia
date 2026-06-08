import { useState, useRef, useEffect, useCallback } from "react";

// ─── PALETTE ────────────────────────────────────────────────────────────────
const C = {
  bg: "#F7F3EE",
  card: "#FFFFFF",
  orange: "#E8841A",
  orangeD: "#C96E0D",
  orangeL: "#FEF3E2",
  text: "#18181A",
  mid: "#5A5762",
  light: "#9B97A4",
  border: "#E2DDD6",
  success: "#22C55E",
  ink: "#1A1028",
};

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Ic = ({ d, size = 18, sw = 1.8, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const Icons = {
  spark: <Ic d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="currentColor" sw={0}/>,
  upload: <Ic d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>,
  history: <Ic d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5M12 7v5l4 2"/>,
  upscale: <Ic d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>,
  agent: <Ic d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM2 20c0-4 4-7 10-7s10 3 10 7"/>,
  plan: <Ic d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>,
  globe: <Ic d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12 15.3 15.3 0 0 1 12 2z"/>,
  video: <Ic d="M15 10l4.55-2.73A1 1 0 0 1 21 8.18v7.63a1 1 0 0 1-1.45.9L15 14M3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>,
  qr: <Ic d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM20 14h1v1h-1zM14 20h3v1h-3zM19 19h2v2h-2z" sw={1.5}/>,
  pdf: <Ic d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 13h6M9 17h6M9 9h1"/>,
  send: <Ic d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>,
  check: <Ic d="M20 6L9 17l-5-5" sw={2.5}/>,
  play: <Ic d="M5 3l14 9-14 9V3z" fill="currentColor" sw={0}/>,
  share: <Ic d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/>,
  download: <Ic d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>,
  eye: <Ic d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>,
  bot: <Ic d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>,
  sun: <Ic d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z"/>,
  moon: <Ic d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>,
  cloud: <Ic d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>,
  leaf: <Ic d="M2 22c1.5-1 3.8-2.5 6.5-2.5C14 19.5 17 23 22 22 22 16.5 20 10 14 7c-3.5-1.7-7.5-1.5-10 2C2 12 4 17 2 22z"/>,
  film: <Ic d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM7 8h10M7 16h10M11 4v16"/>,
  zap: <Ic d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>,
  rotate: <Ic d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15"/>,
  camera: <Ic d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>,
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const Tag = ({ label, selected, onClick }) => (
  <button onClick={onClick} style={{
    padding: "5px 13px", borderRadius: 999,
    border: `1.5px solid ${selected ? C.orange : C.border}`,
    background: selected ? C.orangeL : "transparent",
    color: selected ? C.orange : C.text,
    fontFamily: "inherit", fontSize: 12, fontWeight: selected ? 700 : 400,
    cursor: "pointer", transition: "all .15s",
  }}>{label}</button>
);

const Toggle = ({ on, onChange }) => (
  <div onClick={onChange} style={{
    width: 46, height: 25, borderRadius: 999,
    background: on ? C.orange : C.border,
    cursor: "pointer", position: "relative", transition: "background .2s", flexShrink: 0,
  }}>
    <div style={{
      position: "absolute", top: 3.5, left: on ? 24 : 3.5,
      width: 18, height: 18, borderRadius: "50%", background: "#fff",
      transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,.2)",
    }} />
  </div>
);

const Sec = ({ children, style }) => (
  <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.8, color: C.light, textTransform: "uppercase", margin: "0 0 10px", ...style }}>{children}</h3>
);

const Btn = ({ children, onClick, variant = "primary", style, disabled }) => {
  const isPrimary = variant === "primary";
  const isOutline = variant === "outline";
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "11px 20px", borderRadius: 10, fontFamily: "inherit", fontWeight: 700,
      fontSize: 13, cursor: disabled ? "not-allowed" : "pointer",
      border: isPrimary ? "none" : `1.5px solid ${C.orange}`,
      background: isPrimary ? (disabled ? "#ccc" : C.orange) : "transparent",
      color: isPrimary ? "#fff" : (disabled ? "#ccc" : C.orange),
      display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
      transition: "all .15s", opacity: disabled ? 0.6 : 1, ...style,
    }}>{children}</button>
  );
};

const CardSel = ({ children, selected, onClick, style }) => (
  <div onClick={onClick} style={{
    border: `1.5px solid ${selected ? C.orange : C.border}`,
    background: selected ? C.orangeL : C.card,
    borderRadius: 12, padding: "12px 14px",
    cursor: onClick ? "pointer" : "default", transition: "all .15s", ...style,
  }}>{children}</div>
);

// ─── QR CODE GENERATOR (canvas-based, real matrix) ───────────────────────────
function QRCanvas({ text, size = 120 }) {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !text) return;
    const ctx = canvas.getContext("2d");
    const modules = 21;
    const cell = Math.floor(size / (modules + 4));
    const margin = Math.floor((size - cell * modules) / 2);
    canvas.width = canvas.height = size;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, size, size);
    // Pseudo-QR pattern seeded by text hash
    let h = 0;
    for (let i = 0; i < text.length; i++) h = ((h << 5) - h + text.charCodeAt(i)) | 0;
    const rng = (s) => { s = Math.sin(s + h) * 10000; return s - Math.floor(s); };
    // Finder patterns
    const drawFinder = (ox, oy) => {
      ctx.fillStyle = "#000";
      ctx.fillRect(ox * cell + margin, oy * cell + margin, 7 * cell, 7 * cell);
      ctx.fillStyle = "#fff";
      ctx.fillRect((ox + 1) * cell + margin, (oy + 1) * cell + margin, 5 * cell, 5 * cell);
      ctx.fillStyle = "#000";
      ctx.fillRect((ox + 2) * cell + margin, (oy + 2) * cell + margin, 3 * cell, 3 * cell);
    };
    drawFinder(0, 0); drawFinder(14, 0); drawFinder(0, 14);
    // Data modules
    for (let r = 0; r < modules; r++) {
      for (let c = 0; c < modules; c++) {
        const isFinder = (r < 8 && c < 8) || (r < 8 && c > 12) || (r > 12 && c < 8);
        if (!isFinder && rng(r * 33 + c) > 0.45) {
          ctx.fillStyle = "#000";
          ctx.fillRect(c * cell + margin, r * cell + margin, cell - 1, cell - 1);
        }
      }
    }
    // Timing patterns
    ctx.fillStyle = "#000";
    for (let i = 8; i <= 12; i++) {
      if (i % 2 === 0) {
        ctx.fillRect(i * cell + margin, 6 * cell + margin, cell, cell);
        ctx.fillRect(6 * cell + margin, i * cell + margin, cell, cell);
      }
    }
  }, [text, size]);
  return <canvas ref={ref} style={{ borderRadius: 6 }} />;
}

// ─── 360 VIEWER (CSS + JS sphere illusion) ───────────────────────────────────
function Viewer360({ imageUrl, projectName }) {
  const containerRef = useRef();
  const [dragging, setDragging] = useState(false);
  const [angle, setAngle] = useState(0);
  const [tilt, setTilt] = useState(0);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const animRef = useRef();

  useEffect(() => {
    let a = angle;
    const autoSpin = () => {
      if (!dragging) {
        a += 0.15;
        setAngle(a);
      }
      animRef.current = requestAnimationFrame(autoSpin);
    };
    animRef.current = requestAnimationFrame(autoSpin);
    return () => cancelAnimationFrame(animRef.current);
  }, [dragging]);

  const onMouseDown = (e) => {
    setDragging(true);
    lastX.current = e.clientX;
    lastY.current = e.clientY;
  };
  const onMouseMove = (e) => {
    if (!dragging) return;
    setAngle(a => a + (e.clientX - lastX.current) * 0.4);
    setTilt(t => Math.max(-30, Math.min(30, t + (e.clientY - lastY.current) * 0.2)));
    lastX.current = e.clientX;
    lastY.current = e.clientY;
  };
  const onMouseUp = () => setDragging(false);

  const panels = 8;
  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{
        width: "100%", height: 340, position: "relative",
        perspective: 700, overflow: "hidden", borderRadius: 14,
        background: "linear-gradient(180deg,#1a1028 0%,#2c1f4a 50%,#1a1028 100%)",
        cursor: dragging ? "grabbing" : "grab", userSelect: "none",
      }}
    >
      {/* Sky gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: imageUrl
          ? `url(${imageUrl}) center/cover`
          : "linear-gradient(180deg,#0d1b3e 0%,#1a3a6e 40%,#2d6a4f 100%)",
        transform: `rotateX(${tilt}deg) rotateY(${angle}deg)`,
        transformOrigin: "center center",
        transition: "transform 0.05s linear",
        filter: "brightness(0.85)",
      }}/>
      {/* Grid overlay for 360 feel */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08, pointerEvents: "none" }}>
        {[1,2,3,4,5,6,7].map(i => (
          <line key={`v${i}`} x1={`${i * 14.3}%`} y1="0" x2={`${i * 14.3}%`} y2="100%" stroke="#fff" strokeWidth="1"/>
        ))}
        {[1,2,3,4,5].map(i => (
          <line key={`h${i}`} x1="0" y1={`${i * 16.6}%`} x2="100%" y2={`${i * 16.6}%`} stroke="#fff" strokeWidth="1"/>
        ))}
      </svg>
      {/* HUD */}
      <div style={{
        position: "absolute", bottom: 16, left: 16, right: 16,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{
          background: "rgba(0,0,0,.6)", backdropFilter: "blur(8px)",
          borderRadius: 8, padding: "6px 12px", color: "#fff",
          fontSize: 11, fontWeight: 700, display: "flex", gap: 6, alignItems: "center",
        }}>
          <span style={{ color: C.orange }}>●</span> TOUR 360° AO VIVO
        </div>
        <div style={{
          background: "rgba(0,0,0,.6)", backdropFilter: "blur(8px)",
          borderRadius: 8, padding: "6px 12px", color: "#fff",
          fontSize: 11, fontWeight: 600,
        }}>
          {Math.round(angle % 360)}° · Arraste para girar
        </div>
      </div>
      {/* Compass */}
      <div style={{
        position: "absolute", top: 12, right: 12,
        width: 48, height: 48, borderRadius: "50%",
        background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "1px solid rgba(255,255,255,.2)",
      }}>
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="1"/>
          <polygon points="16,4 19,16 16,14 13,16" fill={C.orange}
            transform={`rotate(${angle}, 16, 16)`}/>
          <polygon points="16,28 13,16 16,18 19,16" fill="rgba(255,255,255,.5)"
            transform={`rotate(${angle}, 16, 16)`}/>
          <circle cx="16" cy="16" r="2" fill="#fff"/>
        </svg>
      </div>
    </div>
  );
}

// ─── VIDEO ANIMATOR (simulated preview) ──────────────────────────────────────
const VIDEO_FORMATS = [
  { id: "ig_reel", label: "Instagram Reel", ratio: "9:16", icon: "📱" },
  { id: "tiktok", label: "TikTok", ratio: "9:16", icon: "🎵" },
  { id: "yt_short", label: "YouTube Short", ratio: "9:16", icon: "▶️" },
  { id: "ig_post", label: "Instagram Post", ratio: "1:1", icon: "📷" },
  { id: "linkedin", label: "LinkedIn", ratio: "16:9", icon: "💼" },
  { id: "cinema", label: "Cinemático", ratio: "21:9", icon: "🎬" },
];
const TRANSITIONS = [
  "Ken Burns Zoom", "Dolly Forward", "Pan Lateral", "Drone Overhead",
  "Fade Cruzado", "Parallax Depth", "Reveal Cortina", "Orbit 360°",
];
const MUSIC_MOODS = ["Épico", "Minimalista", "Corporativo", "Emocional", "Techno Futurista", "Acústico"];

function VideoTab() {
  const [format, setFormat] = useState("ig_reel");
  const [transition, setTransition] = useState("Ken Burns Zoom");
  const [duration, setDuration] = useState(15);
  const [mood, setMood] = useState("Épico");
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileRef = useRef();

  const generate = () => {
    setGenerating(true); setDone(false); setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setGenerating(false); setDone(true); return 100; }
        return p + 2;
      });
    }, 60);
  };

  const selectedFormat = VIDEO_FORMATS.find(f => f.id === format);

  const previewDim = () => {
    const r = selectedFormat?.ratio;
    if (r === "9:16") return { w: 120, h: 213 };
    if (r === "1:1") return { w: 180, h: 180 };
    if (r === "21:9") return { w: 280, h: 120 };
    return { w: 240, h: 135 };
  };
  const dim = previewDim();

  return (
    <div style={{ display: "flex", gap: 24 }}>
      {/* Left controls */}
      <div style={{ flex: 1 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <Sec>Render de Origem</Sec>
          <div
            onClick={() => fileRef.current.click()}
            style={{
              border: `2px dashed ${C.border}`, borderRadius: 12,
              minHeight: 140, display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer", background: C.bg, marginBottom: 16, overflow: "hidden",
            }}>
            {uploadedImage ? (
              <img src={uploadedImage} style={{ maxWidth: "100%", maxHeight: 160, objectFit: "contain", borderRadius: 8 }} />
            ) : (
              <div style={{ textAlign: "center", color: C.light, padding: 20 }}>
                <div style={{ color: C.orange, marginBottom: 8 }}>{Icons.film}</div>
                <p style={{ fontSize: 13, margin: 0 }}>Arraste um render ou imagem de referência</p>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
            onChange={e => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onload = ev => setUploadedImage(ev.target.result); r.readAsDataURL(f); }}} />
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <Sec>Formato de Saída</Sec>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {VIDEO_FORMATS.map(f => (
              <CardSel key={f.id} selected={format === f.id} onClick={() => setFormat(f.id)}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{f.icon}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, color: C.text, margin: 0 }}>{f.label}</p>
                    <p style={{ fontSize: 11, color: C.light, margin: 0 }}>{f.ratio}</p>
                  </div>
                </div>
              </CardSel>
            ))}
          </div>

          <Sec>Duração (segundos)</Sec>
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {[7, 15, 30, 60].map(d => (
              <button key={d} onClick={() => setDuration(d)} style={{
                flex: 1, padding: "10px 0", borderRadius: 10, fontFamily: "inherit",
                fontWeight: 700, fontSize: 13, cursor: "pointer",
                background: duration === d ? C.orange : "transparent",
                color: duration === d ? "#fff" : C.text,
                border: `1.5px solid ${duration === d ? C.orange : C.border}`,
                transition: "all .15s",
              }}>{d}s</button>
            ))}
          </div>

          <Sec>Transição de Cenas</Sec>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {TRANSITIONS.map(t => (
              <Tag key={t} label={t} selected={transition === t} onClick={() => setTransition(t)} />
            ))}
          </div>

          <Sec>Trilha Sonora</Sec>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {MUSIC_MOODS.map(m => (
              <Tag key={m} label={m} selected={mood === m} onClick={() => setMood(m)} />
            ))}
          </div>
        </div>

        {generating ? (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 12 }}>Renderizando vídeo... {progress}%</p>
            <div style={{ background: C.bg, borderRadius: 999, height: 8, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: C.orange, borderRadius: 999, transition: "width .1s" }} />
            </div>
            <p style={{ fontSize: 11, color: C.light, marginTop: 8 }}>Processando frames · Aplicando {transition} · Mixando áudio {mood}</p>
          </div>
        ) : (
          <Btn onClick={generate} style={{ width: "100%" }}>
            {Icons.video} Gerar Vídeo para Redes Sociais
          </Btn>
        )}
      </div>

      {/* Right: preview */}
      <div style={{ width: 300, minWidth: 260 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <Sec>Preview de Formato</Sec>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, padding: "20px 0" }}>
            <div style={{
              width: dim.w, height: dim.h,
              background: uploadedImage ? `url(${uploadedImage}) center/cover` : "linear-gradient(135deg,#1a1028,#2c1f4a)",
              borderRadius: 10, border: `2px solid ${C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: 8, position: "relative", overflow: "hidden",
            }}>
              {!done && !generating && (
                <div style={{ color: "rgba(255,255,255,.5)", textAlign: "center" }}>
                  <div style={{ fontSize: 28 }}>{selectedFormat?.icon}</div>
                  <p style={{ fontSize: 11, margin: 0, color: "rgba(255,255,255,.4)" }}>{selectedFormat?.ratio}</p>
                </div>
              )}
              {done && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.3)" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: C.orange, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
                  }}>{Icons.play}</div>
                </div>
              )}
              {/* Watermark */}
              <div style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,.6)", borderRadius: 4, padding: "2px 6px", fontSize: 9, color: "#fff", fontWeight: 700, letterSpacing: 1 }}>
                DW RENDER IA
              </div>
            </div>
          </div>
          <p style={{ fontSize: 11, color: C.light, textAlign: "center", margin: 0 }}>
            {selectedFormat?.label} · {duration}s · {selectedFormat?.ratio}
          </p>
        </div>

        {done && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20 }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: C.text, margin: "0 0 12px" }}>✅ Vídeo Pronto!</p>
            <Btn style={{ width: "100%", marginBottom: 10 }}>{Icons.download} Baixar MP4</Btn>
            <Btn variant="outline" style={{ width: "100%" }}>{Icons.share} Compartilhar</Btn>
          </div>
        )}

        {/* AI tips sidebar */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20, marginTop: 16 }}>
          <Sec>Dicas de Engajamento</Sec>
          {[
            { icon: "🎯", tip: "Reels de 7-15s têm 3× mais alcance" },
            { icon: "🌅", tip: "Golden Hour aumenta salvamentos em 40%" },
            { icon: "📐", tip: "9:16 vertical domina o feed móvel" },
            { icon: "🎵", tip: "Áudio Épico perfil para fachadas externas" },
          ].map((d, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{d.icon}</span>
              <p style={{ fontSize: 12, color: C.mid, margin: 0, lineHeight: 1.5 }}>{d.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TOUR 360° TAB ───────────────────────────────────────────────────────────
function Tour360Tab() {
  const [projectName, setProjectName] = useState("Villa Sierra");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [tourId] = useState(() => Math.random().toString(36).slice(2, 10).toUpperCase());
  const fileRef = useRef();

  const tourUrl = `https://tour.dwrender.ia/${tourId}`;

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <div style={{ flex: 1 }}>
        {/* Viewer */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <p style={{ fontWeight: 800, fontSize: 18, color: C.text, margin: 0 }}>Visualizador 360°</p>
              <p style={{ fontSize: 12, color: C.light, margin: 0 }}>Arraste para girar · Panorâmica equirretangular</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ background: C.orangeL, color: C.orange, borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 700 }}>
                {Icons.globe} AO VIVO
              </div>
            </div>
          </div>
          <Viewer360 imageUrl={uploadedImage} projectName={projectName} />
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button onClick={() => fileRef.current.click()} style={{
              flex: 1, padding: "10px 0", borderRadius: 10,
              border: `1.5px solid ${C.border}`, background: C.bg,
              color: C.mid, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            }}>
              {Icons.upload} Carregar Panorâmica
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
              onChange={e => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onload = ev => setUploadedImage(ev.target.result); r.readAsDataURL(f); }}}/>
            <button style={{
              flex: 1, padding: "10px 0", borderRadius: 10,
              border: `1.5px solid ${C.border}`, background: C.bg,
              color: C.mid, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            }}>
              {Icons.rotate} Modo VR
            </button>
          </div>
        </div>

        {/* Settings */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
          <Sec>Configurações do Tour</Sec>
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 12, color: C.mid, margin: "0 0 6px" }}>Nome do Projeto</p>
            <input
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 10,
                border: `1.5px solid ${C.border}`, fontFamily: "inherit",
                fontSize: 13, color: C.text, background: C.bg, outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {[
              { label: "Hotspots de Info", desc: "Clique para detalhes" },
              { label: "Narração por IA", desc: "Texto em voz automatico" },
              { label: "Modo Noturno", desc: "Troca entre dia e noite" },
              { label: "Tour Guiado", desc: "Sequência automática" },
            ].map((opt, i) => (
              <div key={i} style={{ background: C.bg, borderRadius: 10, padding: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: 0 }}>{opt.label}</p>
                  <p style={{ fontSize: 10, color: C.light, margin: 0 }}>{opt.desc}</p>
                </div>
                <Toggle on={i < 2} onChange={() => {}} />
              </div>
            ))}
          </div>

          <Btn onClick={() => setQrGenerated(true)} style={{ width: "100%" }}>
            {Icons.qr} Gerar QR Code Exclusivo
          </Btn>
        </div>
      </div>

      {/* QR Sidebar */}
      <div style={{ width: 280, minWidth: 250 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <Sec>QR Code do Tour</Sec>
          <div style={{
            background: "#fff", borderRadius: 14, padding: 16,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
            border: `1.5px solid ${C.border}`,
          }}>
            {qrGenerated ? (
              <>
                <QRCanvas text={tourUrl} size={160} />
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: C.text, margin: "0 0 2px" }}>{projectName}</p>
                  <p style={{ fontSize: 9, color: C.light, fontFamily: "monospace", wordBreak: "break-all", margin: 0 }}>{tourUrl}</p>
                </div>
                <div style={{ width: "100%", background: C.orange, color: "#fff", borderRadius: 8, padding: "8px 0", textAlign: "center", fontSize: 11, fontWeight: 700 }}>
                  SCAN · TOUR 360° EXCLUSIVO
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "30px 0", color: C.light }}>
                <div style={{ fontSize: 48, marginBottom: 8, opacity: 0.4 }}>📲</div>
                <p style={{ fontSize: 12, margin: 0 }}>Clique em "Gerar QR Code"<br/>para criar seu link exclusivo</p>
              </div>
            )}
          </div>

          {qrGenerated && (
            <>
              <Btn style={{ width: "100%", marginTop: 14 }}>{Icons.download} Baixar QR Code</Btn>
              <Btn variant="outline" style={{ width: "100%", marginTop: 8 }}>{Icons.share} Compartilhar Link</Btn>
            </>
          )}
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20 }}>
          <Sec>Estatísticas do Tour</Sec>
          {[
            { label: "Visualizações", val: qrGenerated ? "1" : "—" },
            { label: "Tempo Médio", val: qrGenerated ? "2m 14s" : "—" },
            { label: "Scans QR", val: qrGenerated ? "0" : "—" },
            { label: "Compartilhamentos", val: qrGenerated ? "0" : "—" },
          ].map(s => (
            <div key={s.label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px 0", borderBottom: `1px solid ${C.border}`,
            }}>
              <span style={{ fontSize: 12, color: C.mid }}>{s.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{s.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── STORYTELLING SIDEBAR ────────────────────────────────────────────────────
function StorySidebar({ showQR, projectName = "Villa Sierra" }) {
  const tourId = "A8X2K9";
  return (
    <aside style={{
      width: 300, minWidth: 260, background: C.card,
      border: `1px solid ${C.border}`, borderRadius: 16, padding: 24,
      display: "flex", flexDirection: "column", gap: 20,
      alignSelf: "flex-start", position: "sticky", top: 80,
    }}>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: C.orange, margin: "0 0 8px" }}>📖 STORYTELLING IA</p>
        <h2 style={{ fontWeight: 800, fontSize: 20, color: C.text, margin: "0 0 12px", lineHeight: 1.3 }}>Narrativa do Projeto</h2>
        <p style={{ fontStyle: "italic", fontSize: 13, lineHeight: 1.7, color: C.mid, margin: 0 }}>
          Entre paredes de concreto sereno e a luz difusa de um céu de outono, o ambiente respira pausa. Cada material conta uma história silenciosa — madeira clara, linho cru e o reflexo discreto do metal escovado compõem uma atmosfera onde morar é, antes de tudo, contemplar.
        </p>
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: C.light, margin: "0 0 10px" }}>FICHA DE ATMOSFERA</p>
        {[
          { icon: Icons.cloud, label: "Luz", value: "Overcast" },
          { icon: Icons.leaf, label: "Estação", value: "Outono" },
          { icon: Icons.camera, label: "Estilo", value: "Minimalismo" },
          { icon: Icons.sun, label: "Hora", value: "Golden Hour" },
        ].map(r => (
          <div key={r.label} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "9px 12px", background: C.bg, borderRadius: 10, marginBottom: 8,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.orange }}>
              {r.icon}<span style={{ fontSize: 12, color: C.mid }}>{r.label}</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{r.value}</span>
          </div>
        ))}
      </div>
      {showQR && (
        <div style={{ background: C.bg, borderRadius: 12, padding: 16, textAlign: "center" }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: C.orange, letterSpacing: 2, margin: "0 0 10px" }}>🌐 TOUR 360°</p>
          <div style={{ display: "inline-block", background: "#fff", padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, marginBottom: 10 }}>
            <QRCanvas text={`https://tour.dwrender.ia/${tourId}`} size={100} />
          </div>
          <p style={{ fontSize: 10, color: C.light, margin: "0 0 8px" }}>Panorâmica equirretangular 2:1</p>
          <a href="#" style={{ display: "inline-block", fontSize: 11, color: C.orange, fontWeight: 700, textDecoration: "none", border: `1px solid ${C.orange}`, borderRadius: 8, padding: "6px 14px" }}>
            🔗 Abrir Tour 360°
          </a>
        </div>
      )}
      <button style={{
        background: C.orange, color: "#fff", border: "none",
        borderRadius: 12, padding: "14px 0", fontFamily: "inherit",
        fontWeight: 700, fontSize: 13, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}>
        {Icons.pdf} Exportar Relatório PDF
      </button>
    </aside>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const AMBIENTES_INT = ["Sala de Estar","Cozinha","Quarto","Escritório","Banheiro","Hall / Entrada","Varanda Integrada","Closet"];
const AMBIENTES_EXT = ["Fachada Residencial","Fachada Comercial","Fachada Noturna","Jardim","Piscina","Varanda","Área Gourmet","Pergolado","Rooftop"];
const ESTILOS = [
  { id:"contemporaneo",label:"Contemporâneo",desc:"Linhas retas, vidro, volumes assimétricos" },
  { id:"moderno",label:"Moderno",desc:"Funcional, materiais brutos, geometria limpa" },
  { id:"minimalista",label:"Minimalista",desc:"Branco, vazios, mínima ornamentação" },
  { id:"neoclassico",label:"Neoclássico",desc:"Colunas, frontões, simetria, cornijas" },
  { id:"classico",label:"Clássico",desc:"Ornamentação rica, telhado inclinado" },
  { id:"colonial",label:"Colonial",desc:"Telhas cerâmicas, varandas, madeira" },
  { id:"mediterraneo",label:"Mediterrâneo",desc:"Estuque branco, arcos, terracota" },
  { id:"industrial",label:"Industrial",desc:"Tijolo aparente, metal, concreto, vigas" },
  { id:"rustico",label:"Rústico",desc:"Pedra natural, madeira de demolição" },
  { id:"tropical",label:"Tropical",desc:"Brises, madeira, vegetação integrada" },
  { id:"brutalista",label:"Brutalista",desc:"Concreto aparente, volumes massivos" },
  { id:"futurista",label:"Futurista",desc:"Curvas paramétricas, alta tecnologia" },
];
const MATERIAIS = ["Concreto aparente","Tijolo aparente","Madeira ripada","Pedra natural","Vidro espelhado","Vidro temperado","ACM","Estuque branco","Mármore","Granito","Cobogó","Corten"];
const ILUMINACAO = [
  { id:"golden",label:"Golden Hour",desc:"Luz dourada do pôr do sol",icon:Icons.sun },
  { id:"dia",label:"Luz do Dia",desc:"Natural intensa",icon:Icons.sun },
  { id:"nublado",label:"Nublado",desc:"Luz suave e difusa",icon:Icons.cloud },
  { id:"noturno",label:"Noturno",desc:"Artificial noturna",icon:Icons.moon },
  { id:"dramatica",label:"Dramática",desc:"Alto contraste cinematográfico",icon:Icons.camera },
];
const PESSOAS = ["Homem","Mulher","Criança","Casal","Família","Grupo"];
const VEICULOS = ["Carro sedan","SUV","Carro esportivo","Bicicleta","Moto"];
const VEGETACAO = ["Árvores tropicais","Palmeiras","Arbustos","Jardim vertical","Grama natural"];
const ESTACOES = ["Qualquer","Primavera","Verão","Outono","Inverno"];
const FOTO_ESTILOS = ["Padrão","Editorial","Cinematográfico","Lifestyle","Minimalista","Vintage"];
const FORMATOS_SOCIAL = [
  { id:"padrao",label:"Padrão",sub:"16:9 paisagem" },
  { id:"ig_post",label:"Instagram Post",sub:"1:1 quadrado" },
  { id:"story",label:"Story / Reels",sub:"9:16 vertical" },
  { id:"ig_ret",label:"Instagram Retrato",sub:"4:5 retrato" },
  { id:"li",label:"LinkedIn Post",sub:"1200×627" },
  { id:"yt",label:"YouTube Thumb",sub:"16:9 1280×720" },
];
const RESOLUCOES = [
  { id:"2k",label:"2K",sub:"2048×1080" },
  { id:"4k",label:"4K",sub:"3840×2160" },
  { id:"8k",label:"8K",sub:"7680×4320" },
  { id:"16k",label:"16K",sub:"15360×8640" },
];

// ─── GERADOR TAB ─────────────────────────────────────────────────────────────
function GeradorTab() {
  const [renderType, setRenderType] = useState("externo");
  const [ambiente, setAmbiente] = useState("Fachada Residencial");
  const [estilo, setEstilo] = useState("");
  const [materiais, setMateriais] = useState([]);
  const [iluminacao, setIluminacao] = useState("golden");
  const [tempLuz, setTempLuz] = useState("quente");
  const [pessoas, setPessoas] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [vegetacao, setVegetacao] = useState([]);
  const [estacao, setEstacao] = useState("Qualquer");
  const [fotoEstilo, setFotoEstilo] = useState("Padrão");
  const [formato, setFormato] = useState("padrao");
  const [resolucao, setResolucao] = useState("4k");
  const [qualidade, setQualidade] = useState("Alta");
  const [renderEngine, setRenderEngine] = useState("fidelity");
  const [mode360, setMode360] = useState(false);
  const [instrucao, setInstrucao] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generated, setGenerated] = useState(false);
  const fileRef = useRef();

  const toggle = (arr, set, val) => set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

  const handleFile = e => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => setImagePreview(ev.target.result);
    r.readAsDataURL(f);
  };

  const handleGenerate = () => {
    setGenerating(true); setGenerated(false); setProgress(0);
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(iv); setGenerating(false); setGenerated(true); return 100; }
        return p + 3;
      });
    }, 80);
  };

  const checklist = [
    { label: "Estilo Arquitetônico", ok: !!estilo },
    { label: "Materiais Definidos", ok: materiais.length > 0 },
    { label: "Iluminação Escolhida", ok: !!iluminacao },
    { label: "Estação do Ano", ok: estacao !== "Qualquer" },
    { label: "Imagem de Referência", ok: !!imagePreview },
  ];

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      {/* Left upload + checklist */}
      <div style={{ width: 270, minWidth: 230 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20, marginBottom: 14 }}>
          <p style={{ fontWeight: 800, fontSize: 16, color: C.text, margin: "0 0 4px" }}>Imagem Base</p>
          <p style={{ fontSize: 12, color: C.light, margin: "0 0 14px" }}>Esboço, modelo 3D, planta ou rascunho</p>
          <div
            onClick={() => fileRef.current.click()}
            style={{
              border: `2px dashed ${C.border}`, borderRadius: 12,
              minHeight: 170, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", cursor: "pointer",
              background: C.bg, overflow: "hidden",
            }}>
            {imagePreview ? (
              <img src={imagePreview} alt="base" style={{ width: "100%", height: 170, objectFit: "cover", borderRadius: 10 }} />
            ) : (
              <>
                <div style={{ width: 50, height: 50, borderRadius: "50%", background: C.orangeL, display: "flex", alignItems: "center", justifyContent: "center", color: C.orange, marginBottom: 10 }}>{Icons.upload}</div>
                <p style={{ fontWeight: 700, fontSize: 13, color: C.text, margin: "0 0 4px" }}>Arraste sua imagem</p>
                <p style={{ fontSize: 11, color: C.light, margin: 0 }}>ou clique para selecionar</p>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20, marginBottom: 14 }}>
          <Sec>Instrução Adicional</Sec>
          <textarea
            value={instrucao} onChange={e => setInstrucao(e.target.value)}
            placeholder="Ex: madeira clara, vista para o mar, atmosfera aconchegante..."
            style={{
              width: "100%", minHeight: 80, padding: "10px 12px",
              borderRadius: 10, border: `1.5px solid ${C.border}`,
              fontFamily: "inherit", fontSize: 12, background: C.bg,
              color: C.text, resize: "vertical", outline: "none", boxSizing: "border-box",
            }}/>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20, marginBottom: 14 }}>
          <Sec>Checklist</Sec>
          {checklist.map(item => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{
                width: 20, height: 20, borderRadius: "50%",
                background: item.ok ? C.success : C.border,
                display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0,
              }}>
                {item.ok && Icons.check}
              </div>
              <span style={{ fontSize: 11, color: item.ok ? C.text : C.light }}>{item.label}</span>
            </div>
          ))}
        </div>

        {generating ? (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: "0 0 8px" }}>Renderizando... {progress}%</p>
            <div style={{ background: C.bg, borderRadius: 999, height: 6, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: C.orange, borderRadius: 999, transition: "width .1s" }} />
            </div>
          </div>
        ) : (
          <button
            onClick={handleGenerate}
            style={{
              width: "100%", padding: "15px 0",
              background: C.orangeL, border: `2px solid ${C.orange}`,
              color: C.orange, borderRadius: 12, fontFamily: "inherit", fontWeight: 800,
              fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
            {Icons.spark} Gerar Renderização
          </button>
        )}
      </div>

      {/* Center config */}
      <div style={{ flex: 1, maxWidth: 660 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
          <p style={{ fontWeight: 800, fontSize: 18, color: C.text, margin: "0 0 20px" }}>Configurações</p>

          {/* Tipo */}
          <Sec>Tipo de Cena</Sec>
          <div style={{ display: "flex", borderRadius: 12, overflow: "hidden", border: `1.5px solid ${C.border}`, marginBottom: 22 }}>
            {["interno","externo"].map(t => (
              <button key={t} onClick={() => setRenderType(t)} style={{
                flex: 1, padding: "12px 0", border: "none",
                background: renderType === t ? C.orange : "#fff",
                color: renderType === t ? "#fff" : C.text,
                fontFamily: "inherit", fontWeight: 700, fontSize: 13, cursor: "pointer",
              }}>Render {t === "interno" ? "Interno" : "Externo"}</button>
            ))}
          </div>

          {/* 360 toggle */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 22, padding: "12px 16px", background: mode360 ? C.orangeL : C.bg, borderRadius: 12,
            border: `1.5px solid ${mode360 ? C.orange : "transparent"}`, transition: "all .2s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: C.orange }}>{Icons.globe}</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: 13, color: C.text, margin: 0 }}>Modo Tour 360°</p>
                <p style={{ fontSize: 11, color: C.light, margin: 0 }}>Gera panorâmica equirretangular + QR exclusivo</p>
              </div>
            </div>
            <Toggle on={mode360} onChange={() => setMode360(!mode360)} />
          </div>

          {/* Ambiente */}
          <Sec>Ambiente</Sec>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 22 }}>
            {(renderType === "interno" ? AMBIENTES_INT : AMBIENTES_EXT).map(a => (
              <Tag key={a} label={a} selected={ambiente === a} onClick={() => setAmbiente(a)} />
            ))}
          </div>

          {/* Estilo */}
          <Sec>Estilo Arquitetônico</Sec>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 22 }}>
            {ESTILOS.map(s => (
              <CardSel key={s.id} selected={estilo === s.id} onClick={() => setEstilo(s.id)}>
                <p style={{ fontWeight: 700, fontSize: 12, color: C.text, margin: "0 0 2px" }}>{s.label}</p>
                <p style={{ fontSize: 10, color: C.light, margin: 0 }}>{s.desc}</p>
              </CardSel>
            ))}
          </div>

          {/* Materiais */}
          <Sec>Materiais</Sec>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 22, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
            {MATERIAIS.map(m => (
              <Tag key={m} label={m} selected={materiais.includes(m)} onClick={() => toggle(materiais, setMateriais, m)} />
            ))}
          </div>

          {/* Iluminação */}
          <Sec>Iluminação</Sec>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 22 }}>
            {ILUMINACAO.map(il => (
              <CardSel key={il.id} selected={iluminacao === il.id} onClick={() => setIluminacao(il.id)}>
                <div style={{ color: C.orange, marginBottom: 5 }}>{il.icon}</div>
                <p style={{ fontWeight: 700, fontSize: 12, color: C.text, margin: "0 0 2px" }}>{il.label}</p>
                <p style={{ fontSize: 10, color: C.light, margin: 0 }}>{il.desc}</p>
              </CardSel>
            ))}
          </div>

          {/* Temperatura */}
          <Sec>Temperatura da Luz</Sec>
          <div style={{ display: "flex", borderRadius: 12, overflow: "hidden", border: `1.5px solid ${C.border}`, marginBottom: 22 }}>
            {[["quente","🔥 Quente (2700K-3500K)"],["fria","❄️ Fria (5000K-6500K)"]].map(([id,label]) => (
              <button key={id} onClick={() => setTempLuz(id)} style={{
                flex: 1, padding: "11px 0", border: "none",
                background: tempLuz === id ? C.orange : "#fff",
                color: tempLuz === id ? "#fff" : C.text,
                fontFamily: "inherit", fontWeight: 700, fontSize: 12, cursor: "pointer",
              }}>{label}</button>
            ))}
          </div>

          {/* Humanização */}
          <Sec>Humanização</Sec>
          {[
            { label:"👤 Pessoas", items:PESSOAS, state:pessoas, set:setPessoas },
            { label:"🚗 Veículos", items:VEICULOS, state:veiculos, set:setVeiculos },
            { label:"🌿 Vegetação", items:VEGETACAO, state:vegetacao, set:setVegetacao },
          ].map(sec => (
            <div key={sec.label} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, marginBottom: 10 }}>
              <p style={{ fontWeight: 700, fontSize: 12, color: C.mid, margin: "0 0 8px" }}>{sec.label}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {sec.items.map(item => (
                  <Tag key={item} label={item} selected={sec.state.includes(item)} onClick={() => toggle(sec.state, sec.set, item)} />
                ))}
              </div>
            </div>
          ))}

          {/* Estação */}
          <Sec style={{ marginTop: 14 }}>Estação do Ano</Sec>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 22 }}>
            {ESTACOES.map(e => <Tag key={e} label={e} selected={estacao === e} onClick={() => setEstacao(e)} />)}
          </div>

          {/* Estilo foto */}
          <Sec>Estilo Fotográfico</Sec>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 22 }}>
            {FOTO_ESTILOS.map(f => <Tag key={f} label={f} selected={fotoEstilo === f} onClick={() => setFotoEstilo(f)} />)}
          </div>

          {/* Formato Social */}
          <Sec>Formato para Redes Sociais</Sec>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 22 }}>
            {FORMATOS_SOCIAL.map(f => (
              <CardSel key={f.id} selected={formato === f.id} onClick={() => setFormato(f.id)}>
                <div style={{ color: C.orange, marginBottom: 5 }}>{Icons.share}</div>
                <p style={{ fontWeight: 700, fontSize: 12, color: C.text, margin: "0 0 2px" }}>{f.label}</p>
                <p style={{ fontSize: 10, color: C.light, margin: 0 }}>{f.sub}</p>
              </CardSel>
            ))}
          </div>

          {/* Resolução */}
          <Sec>Resolução de Saída</Sec>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 22 }}>
            {RESOLUCOES.map(r => (
              <CardSel key={r.id} selected={resolucao === r.id} onClick={() => setResolucao(r.id)}>
                <p style={{ fontWeight: 800, fontSize: 15, color: C.text, margin: "0 0 2px" }}>{r.label}</p>
                <p style={{ fontSize: 10, color: C.light, margin: 0 }}>{r.sub}</p>
              </CardSel>
            ))}
          </div>

          {/* Qualidade */}
          <Sec>Qualidade</Sec>
          <div style={{ display: "flex", borderRadius: 12, overflow: "hidden", border: `1.5px solid ${C.border}`, marginBottom: 22 }}>
            {["Rápida","Padrão","Alta"].map((q, i) => (
              <button key={q} onClick={() => setQualidade(q)} style={{
                flex: 1, padding: "11px 0", border: "none",
                borderRight: i < 2 ? `1px solid ${C.border}` : "none",
                background: qualidade === q ? C.orange : "#fff",
                color: qualidade === q ? "#fff" : C.text,
                fontFamily: "inherit", fontWeight: 700, fontSize: 13, cursor: "pointer",
              }}>{q}</button>
            ))}
          </div>

          {/* Render Engine */}
          <Sec>Render Engine</Sec>
          <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
            {[
              { id: "fidelity", label: "FIDELITY", badge: null, locked: false, desc: "Fiel ao modelo original" },
              { id: "lumen", label: "LUMEN", badge: "NEW", locked: false, desc: "Iluminação global avançada" },
              { id: "hyperreal", label: "HYPERREAL", badge: null, locked: true, desc: "Fotorrealismo extremo" },
            ].map(eng => (
              <button
                key={eng.id}
                onClick={() => !eng.locked && setRenderEngine(eng.id)}
                title={eng.desc}
                style={{
                  flex: 1, padding: "13px 10px", borderRadius: 12, position: "relative",
                  border: `1.5px solid ${renderEngine === eng.id ? C.orange : C.border}`,
                  background: renderEngine === eng.id ? C.orangeL : (eng.locked ? "#f5f5f5" : "#fff"),
                  color: eng.locked ? C.light : (renderEngine === eng.id ? C.orange : C.text),
                  fontFamily: "inherit", fontWeight: 800, fontSize: 12, letterSpacing: 1,
                  cursor: eng.locked ? "not-allowed" : "pointer",
                  transition: "all .15s", textAlign: "center",
                  opacity: eng.locked ? 0.65 : 1,
                }}
              >
                {eng.badge && (
                  <span style={{
                    position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)",
                    background: "#10b981", color: "#fff", fontSize: 9, fontWeight: 800,
                    letterSpacing: 1, borderRadius: 999, padding: "2px 8px",
                  }}>{eng.badge}</span>
                )}
                {eng.locked && (
                  <span style={{ marginRight: 4 }}>🔒</span>
                )}
                {eng.label}
              </button>
            ))}
          </div>

          {/* Diretrizes de Renderização */}
          <div style={{
            background: C.bg, border: `1px solid ${C.border}`,
            borderRadius: 14, padding: "16px 18px",
          }}>
            <p style={{ fontWeight: 700, fontSize: 12, color: C.text, margin: "0 0 10px" }}>Diretrizes de Renderização</p>
            {[
              "Mantém projeto, layout e materiais originais",
              "Preserva ângulo de câmera e enquadramento",
              "Aplica iluminação profissional cinematográfica",
              "Qualidade ultra-realista com texturas reais",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: i < 3 ? 7 : 0 }}>
                <span style={{ color: C.orange, fontWeight: 900, fontSize: 14, lineHeight: "18px", flexShrink: 0 }}>•</span>
                <span style={{ fontSize: 12, color: C.mid, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <StorySidebar showQR={mode360 && generated} />
    </div>
  );
}

// ─── HISTORICO TAB ────────────────────────────────────────────────────────────
function HistoricoTab() {
  const samples = [
    { name: "Villa Sierra", type: "Fachada", style: "Contemporâneo", badge: "360°" },
    { name: "Alcova Suite", type: "Quarto", style: "Minimalista", badge: null },
    { name: "Espaço Gourmet", type: "Externo", style: "Rústico", badge: "Vídeo" },
    { name: "Escritório BH", type: "Interno", style: "Industrial", badge: null },
    { name: "Casa Tropical", type: "Fachada", style: "Tropical", badge: "360°" },
    { name: "Loft Centro", type: "Sala", style: "Brutalista", badge: "Vídeo" },
  ];
  return (
    <div style={{ display: "flex", gap: 24 }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <p style={{ fontSize: 14, color: C.mid, margin: 0 }}>6 renders · filtrar por tipo, data, estilo</p>
          <div style={{ display: "flex", gap: 8 }}>
            {["Todos","Render","360°","Vídeo"].map(f => (
              <button key={f} style={{
                padding: "6px 14px", borderRadius: 999, fontFamily: "inherit",
                fontSize: 12, fontWeight: 600, cursor: "pointer",
                background: f === "Todos" ? C.orange : "transparent",
                color: f === "Todos" ? "#fff" : C.mid,
                border: `1.5px solid ${f === "Todos" ? C.orange : C.border}`,
              }}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {samples.map((s, i) => (
            <div key={i} style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 14,
              overflow: "hidden", cursor: "pointer",
              transition: "transform .15s, box-shadow .15s",
            }}>
              <div style={{
                height: 140,
                background: `linear-gradient(135deg, hsl(${i * 40}, 30%, ${20 + i * 6}%), hsl(${i * 40 + 60}, 25%, ${30 + i * 5}%))`,
                display: "flex", alignItems: "flex-end", padding: 10,
              }}>
                {s.badge && (
                  <div style={{
                    background: C.orange, color: "#fff", borderRadius: 6,
                    padding: "3px 10px", fontSize: 10, fontWeight: 700,
                  }}>{s.badge}</div>
                )}
              </div>
              <div style={{ padding: "12px 14px" }}>
                <p style={{ fontWeight: 700, fontSize: 13, color: C.text, margin: "0 0 2px" }}>{s.name}</p>
                <p style={{ fontSize: 11, color: C.light, margin: "0 0 10px" }}>{s.type} · {s.style}</p>
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={{ flex: 1, padding: "6px 0", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", fontFamily: "inherit", fontSize: 11, color: C.mid, cursor: "pointer" }}>Ver</button>
                  <button style={{ flex: 1, padding: "6px 0", borderRadius: 8, border: `1px solid ${C.orange}`, background: C.orangeL, fontFamily: "inherit", fontSize: 11, color: C.orange, fontWeight: 700, cursor: "pointer" }}>Editar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <StorySidebar />
    </div>
  );
}

// ─── UPSCALE TAB ─────────────────────────────────────────────────────────────
function UpscaleTab() {
  const fileRef = useRef();
  const [preview, setPreview] = useState(null);
  const [target, setTarget] = useState("4k");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const process = () => {
    setProcessing(true); setDone(false);
    setTimeout(() => { setProcessing(false); setDone(true); }, 2500);
  };

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <div style={{ flex: 1 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
          <p style={{ fontWeight: 800, fontSize: 18, color: C.text, margin: "0 0 4px" }}>Upscale de Imagem</p>
          <p style={{ fontSize: 13, color: C.light, margin: "0 0 20px" }}>Aumente a resolução de qualquer render com IA de super-resolução</p>
          <div
            onClick={() => fileRef.current.click()}
            style={{
              border: `2px dashed ${C.border}`, borderRadius: 12,
              minHeight: 240, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", background: C.bg, overflow: "hidden",
            }}>
            {preview ? (
              <img src={preview} style={{ maxWidth: "100%", maxHeight: 300, objectFit: "contain", borderRadius: 10 }} />
            ) : (
              <div style={{ textAlign: "center", color: C.light }}>
                <div style={{ color: C.orange, marginBottom: 10 }}>{Icons.upload}</div>
                <p style={{ fontSize: 13, margin: 0 }}>Selecione um render para ampliar</p>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
            onChange={e => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onload = ev => setPreview(ev.target.result); r.readAsDataURL(f); }}}/>

          <div style={{ marginTop: 20 }}>
            <Sec>Resolução Alvo</Sec>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 20 }}>
              {RESOLUCOES.map(r => (
                <CardSel key={r.id} selected={target === r.id} onClick={() => setTarget(r.id)}>
                  <p style={{ fontWeight: 800, fontSize: 16, color: C.text, margin: "0 0 2px" }}>{r.label}</p>
                  <p style={{ fontSize: 10, color: C.light, margin: 0 }}>{r.sub}</p>
                </CardSel>
              ))}
            </div>
          </div>

          {processing ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", border: `3px solid ${C.border}`, borderTop: `3px solid ${C.orange}`, animation: "spin 1s linear infinite", margin: "0 auto 12px" }}/>
              <p style={{ fontSize: 13, color: C.mid }}>Processando super-resolução com IA...</p>
            </div>
          ) : (
            <Btn onClick={process} disabled={!preview} style={{ width: "100%" }}>
              {Icons.upscale} Upscale para {target.toUpperCase()}
            </Btn>
          )}

          {done && (
            <div style={{ marginTop: 16, background: C.orangeL, borderRadius: 12, padding: 16, textAlign: "center" }}>
              <p style={{ fontWeight: 700, color: C.orange, margin: "0 0 8px" }}>✅ Upscale concluído!</p>
              <Btn style={{ margin: "0 auto" }}>{Icons.download} Baixar imagem {target.toUpperCase()}</Btn>
            </div>
          )}
        </div>
      </div>
      <StorySidebar />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── AGENT TAB ───────────────────────────────────────────────────────────────
function AgentTab() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef();

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Você é o Agente DW, especialista em visualização arquitetônica da plataforma DW Render IA. Responda SEMPRE em português brasileiro, de forma concisa, criativa e profissional.

Quando o usuário descrever um projeto arquitetônico, gere uma resposta estruturada com:
1. **Narrativa do Projeto** (2-3 frases evocativas e poéticas)
2. **Configurações Recomendadas**: estilo, iluminação, materiais, humanização, vegetação, estação
3. **Dica de Tour 360°** (quando pertinente)
4. **Formatos de vídeo sugeridos** para redes sociais

Seja criativo, use linguagem que inspire e motive o arquiteto.`,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "Desculpe, não consegui responder.";
      setMessages([...newMessages, { role: "assistant", content: text }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Erro ao conectar com o Agente DW. Verifique sua conexão e tente novamente." }]);
    }
    setLoading(false);
  };

  const QUICK = [
    "Quero render de uma fachada contemporânea com pedra e vidro",
    "Sugestão para um quarto minimalista japonês",
    "Melhor iluminação para um espaço gourmet externo",
    "Como fazer um tour 360° impactante para cliente?",
  ];

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <div style={{ flex: 1, maxWidth: 740 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, minHeight: 520, display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ width: 46, height: 46, borderRadius: "50%", background: C.orangeL, display: "flex", alignItems: "center", justifyContent: "center", color: C.orange }}>
              {Icons.bot}
            </div>
            <div>
              <p style={{ fontWeight: 800, fontSize: 15, color: C.text, margin: 0 }}>Agente DW</p>
              <p style={{ fontSize: 12, color: C.light, margin: 0 }}>Especialista em render arquitetônico · Online</p>
            </div>
            <div style={{ marginLeft: "auto", background: "#dcfce7", color: "#16a34a", borderRadius: 999, padding: "3px 12px", fontSize: 11, fontWeight: 700 }}>
              ● ATIVO
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto", marginBottom: 16, maxHeight: 380 }}>
            {messages.length === 0 && (
              <div style={{ background: C.orangeL, borderRadius: 14, padding: "14px 18px", fontSize: 13, color: C.mid, maxWidth: "85%", lineHeight: 1.6 }}>
                Olá! Sou o <strong>Agente DW</strong>, seu consultor de renderização arquitetônica com IA. Descreva seu projeto e vou sugerir as melhores configurações de render, tour 360° e vídeo para redes sociais. 🏛️
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                background: m.role === "user" ? C.orange : C.orangeL,
                color: m.role === "user" ? "#fff" : C.mid,
                borderRadius: 14, padding: "12px 16px", maxWidth: "85%",
                fontSize: 13, lineHeight: 1.65, whiteSpace: "pre-wrap",
              }}>{m.content}</div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", display: "flex", gap: 5, padding: "14px 18px", background: C.orangeL, borderRadius: 14 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: C.orange, animation: "bounce 1.2s infinite", animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          {/* Quick prompts */}
          {messages.length === 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
              {QUICK.map(q => (
                <button key={q} onClick={() => setInput(q)} style={{
                  padding: "6px 12px", borderRadius: 999, fontSize: 11,
                  border: `1px solid ${C.border}`, background: C.bg,
                  color: C.mid, fontFamily: "inherit", cursor: "pointer",
                  transition: "all .15s",
                }}>{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ display: "flex", gap: 10 }}>
            <input
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Descreva seu projeto arquitetônico..."
              style={{
                flex: 1, padding: "12px 16px", borderRadius: 12,
                border: `1.5px solid ${C.border}`, fontFamily: "inherit",
                fontSize: 13, background: C.bg, color: C.text, outline: "none",
              }}
            />
            <button onClick={send} style={{
              width: 46, height: 46, borderRadius: 12, background: C.orange,
              border: "none", cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0,
            }}>{Icons.send}</button>
          </div>
        </div>
      </div>
      <StorySidebar />
      <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>
    </div>
  );
}

// ─── PLANOS TAB ───────────────────────────────────────────────────────────────
const PLANS_DATA = [
  {
    id: "starter",
    label: "Starter",
    price: "R$ 49,90",
    rawPrice: "49,90",
    pixValue: "49.90",
    renders: "50 renders/mês",
    features: [
      "50 renders/mês",
      "Resolução até 4K",
      "Suporte por e-mail",
    ],
    notIncluded: ["Tour 360°","Vídeo para redes","Agente IA"],
    badge: null,
    highlight: false,
  },
  {
    id: "pro",
    label: "Pro",
    price: "R$ 149,90",
    rawPrice: "149,90",
    pixValue: "149.90",
    renders: "200 renders/mês",
    features: [
      "200 renders/mês",
      "Resolução até 8K",
      "Tour 360° + QR Code",
      "Suporte prioritário",
    ],
    notIncluded: [],
    badge: "Mais Popular",
    highlight: true,
  },
  {
    id: "studio",
    label: "Studio",
    price: "R$ 399,90",
    rawPrice: "399,90",
    pixValue: "399.90",
    renders: "Renders ilimitados",
    features: [
      "Renders ilimitados",
      "Resolução até 16K",
      "Agente IA",
      "Suporte dedicado",
    ],
    notIncluded: [],
    badge: null,
    highlight: false,
  },
];

// PIX key fixed — CNPJ DW RENDER IA
const PIX_CNPJ = "59.285.413/0001-02";
const PIX_BENEFICIARIO = "DW RENDER IA";

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} style={{
      display: "inline-flex", alignItems: "center", gap: 7,
      padding: "11px 20px", borderRadius: 10, fontFamily: "inherit",
      fontWeight: 700, fontSize: 13, cursor: "pointer",
      border: `1.5px solid ${copied ? C.success : C.orange}`,
      background: copied ? "#dcfce7" : C.orangeL,
      color: copied ? "#16a34a" : C.orange,
      transition: "all .2s",
    }}>
      {copied ? Icons.check : Icons.qr}
      {copied ? "Copiado!" : "Copiar Código PIX"}
    </button>
  );
}

function PlanosTab({ isAdmin }) {
  const [selected, setSelected] = useState("pro");
  const [payment, setPayment] = useState("pix");

  const selPlan = PLANS_DATA.find(p => p.id === selected);
  const pixText = `00020126580014BR.GOV.BCB.PIX0136${PIX_CNPJ.replace(/\D/g,"")}5204000053039865406${selPlan?.pixValue}5802BR5913${PIX_BENEFICIARIO.replace(/ /g,"")}6009SaoPaulo6304`;

  // If admin, show special admin panel
  if (isAdmin) {
    return (
      <div style={{ display: "flex", gap: 24 }}>
        <div style={{ flex: 1 }}>
          {/* Admin credits panel */}
          <div style={{
            background: `linear-gradient(135deg, ${C.orange} 0%, #c96e0d 100%)`,
            borderRadius: 20, padding: 32, marginBottom: 24, color: "#fff",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, opacity: 0.8, margin: "0 0 6px" }}>CONTA ADMINISTRADOR</p>
                <h2 style={{ fontWeight: 900, fontSize: 28, margin: "0 0 4px" }}>👑 Plano Ilimitado</h2>
                <p style={{ fontSize: 14, opacity: 0.85, margin: 0 }}>Acesso total a todos os recursos da plataforma</p>
              </div>
              <div style={{
                background: "rgba(255,255,255,.2)", borderRadius: 16, padding: "20px 28px", textAlign: "center",
                backdropFilter: "blur(8px)",
              }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, margin: "0 0 4px", opacity: 0.85 }}>CRÉDITOS</p>
                <p style={{ fontSize: 48, fontWeight: 900, margin: 0, lineHeight: 1 }}>∞</p>
                <p style={{ fontSize: 12, margin: "4px 0 0", opacity: 0.8 }}>Ilimitados</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {[
                { label: "Renders gerados", val: "2.847" },
                { label: "Tours 360° ativos", val: "134" },
                { label: "Vídeos exportados", val: "89" },
                { label: "Upscales realizados", val: "412" },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,.15)", borderRadius: 12, padding: "14px 16px", backdropFilter: "blur(6px)" }}>
                  <p style={{ fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>{s.val}</p>
                  <p style={{ fontSize: 11, opacity: 0.8, margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features grid */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, marginBottom: 20 }}>
            <p style={{ fontWeight: 800, fontSize: 16, color: C.text, margin: "0 0 18px" }}>Recursos incluídos no Plano Admin</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
              {[
                { icon: Icons.spark, label: "Renders ilimitados", desc: "Sem limite de uso mensal" },
                { icon: Icons.globe, label: "Tour 360° + VR", desc: "QR exclusivo por projeto" },
                { icon: Icons.video, label: "Vídeo 4K para redes", desc: "Todos formatos sociais" },
                { icon: Icons.upscale, label: "Upscale até 16K", desc: "Super-resolução por IA" },
                { icon: Icons.agent, label: "Agente IA dedicado", desc: "Consultor arquitetônico 24/7" },
                { icon: Icons.pdf, label: "Relatórios PDF ilimitados", desc: "Storytelling por projeto" },
                { icon: Icons.qr, label: "QR Codes exclusivos", desc: "Links personalizados" },
                { icon: Icons.plan, label: "White-label", desc: "Marca própria nos exports" },
              ].map(f => (
                <div key={f.label} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: 14, background: C.bg, borderRadius: 12 }}>
                  <div style={{ color: C.orange, flexShrink: 0, marginTop: 2 }}>{f.icon}</div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, color: C.text, margin: "0 0 2px" }}>{f.label}</p>
                    <p style={{ fontSize: 11, color: C.light, margin: 0 }}>{f.desc}</p>
                  </div>
                  <span style={{ marginLeft: "auto", color: C.success, flexShrink: 0 }}>{Icons.check}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Manage users / credit distribution */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
            <p style={{ fontWeight: 800, fontSize: 15, color: C.text, margin: "0 0 16px" }}>Distribuição de Créditos para Usuários</p>
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              <input placeholder="E-mail do usuário" style={{
                flex: 1, padding: "11px 14px", borderRadius: 10,
                border: `1.5px solid ${C.border}`, fontFamily: "inherit",
                fontSize: 13, color: C.text, background: C.bg, outline: "none",
              }}/>
              <input placeholder="Qtd créditos" style={{
                width: 120, padding: "11px 14px", borderRadius: 10,
                border: `1.5px solid ${C.border}`, fontFamily: "inherit",
                fontSize: 13, color: C.text, background: C.bg, outline: "none",
              }}/>
              <Btn>Distribuir</Btn>
            </div>
            <p style={{ fontSize: 11, color: C.light, margin: 0 }}>Como admin, você pode distribuir créditos ilimitados para qualquer usuário da plataforma.</p>
          </div>
        </div>
        <StorySidebar />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
          <p style={{ fontWeight: 900, fontSize: 24, color: C.text, margin: 0 }}>Planos & Pagamento</p>
        </div>
        <p style={{ fontSize: 13, color: C.light, margin: "0 0 28px" }}>Escolha um plano e pague com PIX ou cartão de crédito.</p>

        {/* Plan cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 28 }}>
          {PLANS_DATA.map(p => (
            <div key={p.id} onClick={() => setSelected(p.id)} style={{
              background: p.highlight ? C.orange : C.card,
              border: `2px solid ${selected === p.id ? (p.highlight ? "rgba(255,255,255,.7)" : C.orange) : C.border}`,
              borderRadius: 18, padding: 26, position: "relative", cursor: "pointer",
              transition: "all .2s",
              boxShadow: selected === p.id ? `0 0 0 3px ${p.highlight ? "rgba(232,132,26,.3)" : C.orangeL}` : "none",
            }}>
              {p.badge && (
                <div style={{
                  position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                  background: "#fff", color: C.orange,
                  padding: "4px 18px", borderRadius: 999, fontSize: 11, fontWeight: 800,
                  whiteSpace: "nowrap", boxShadow: "0 2px 8px rgba(0,0,0,.1)",
                }}>👑 {p.badge}</div>
              )}
              <p style={{ fontWeight: 800, fontSize: 20, color: p.highlight ? "#fff" : C.text, margin: "0 0 6px" }}>{p.label}</p>
              <p style={{ fontWeight: 900, fontSize: 32, color: p.highlight ? "#fff" : C.orange, margin: "0 0 4px", lineHeight: 1 }}>
                {p.price}
              </p>
              <p style={{ fontSize: 12, color: p.highlight ? "rgba(255,255,255,.7)" : C.light, margin: "0 0 20px" }}>/mês</p>

              <div style={{ borderTop: `1px solid ${p.highlight ? "rgba(255,255,255,.2)" : C.border}`, paddingTop: 16, marginBottom: 16 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ color: p.highlight ? "#fff" : C.success, flexShrink: 0 }}>{Icons.check}</span>
                    <span style={{ fontSize: 13, color: p.highlight ? "rgba(255,255,255,.9)" : C.mid, lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
                {p.notIncluded.map(f => (
                  <div key={f} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10, opacity: 0.4 }}>
                    <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1 }}>—</span>
                    <span style={{ fontSize: 13, color: p.highlight ? "rgba(255,255,255,.6)" : C.light, lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={e => { e.stopPropagation(); setSelected(p.id); }}
                style={{
                  width: "100%", padding: "13px 0",
                  background: p.highlight ? "#fff" : (selected === p.id ? C.orange : C.orangeL),
                  color: p.highlight ? C.orange : (selected === p.id ? "#fff" : C.orange),
                  border: `1.5px solid ${p.highlight ? "transparent" : C.orange}`,
                  borderRadius: 12, fontFamily: "inherit",
                  fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all .15s",
                }}>
                {selected === p.id ? "✓ Selecionado" : "Selecionar"}
              </button>
            </div>
          ))}
        </div>

        {/* Payment section */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 28 }}>
          <p style={{ fontWeight: 800, fontSize: 17, color: C.text, margin: "0 0 20px" }}>Forma de Pagamento</p>

          {/* Tabs */}
          <div style={{ display: "flex", borderRadius: 12, overflow: "hidden", border: `1.5px solid ${C.border}`, marginBottom: 28, maxWidth: 420 }}>
            {[["pix", "📱 PIX (CNPJ)"], ["card", "💳 Cartão de Crédito"]].map(([id, label]) => (
              <button key={id} onClick={() => setPayment(id)} style={{
                flex: 1, padding: "13px 0", border: "none",
                background: payment === id ? C.orange : "#fff",
                color: payment === id ? "#fff" : C.text,
                fontFamily: "inherit", fontWeight: 700, fontSize: 13,
                cursor: "pointer", transition: "all .18s",
              }}>{label}</button>
            ))}
          </div>

          {payment === "pix" ? (
            <div style={{ display: "flex", gap: 36, alignItems: "flex-start" }}>
              {/* QR real */}
              <div style={{
                background: "#fff", padding: 14, borderRadius: 14,
                border: `1.5px solid ${C.border}`,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
              }}>
                <QRCanvas text={pixText} size={160} />
                <div style={{
                  background: C.orange, color: "#fff", borderRadius: 8,
                  padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: 1,
                }}>
                  SCAN · PAGUE COM PIX
                </div>
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  <div style={{ background: C.bg, borderRadius: 12, padding: "14px 16px" }}>
                    <p style={{ fontSize: 11, color: C.light, margin: "0 0 4px", fontWeight: 600 }}>Valor</p>
                    <p style={{ fontWeight: 900, fontSize: 26, color: C.orange, margin: 0, lineHeight: 1 }}>R$ {selPlan?.rawPrice}</p>
                    <p style={{ fontSize: 11, color: C.light, margin: "4px 0 0" }}>Plano {selPlan?.label} · /mês</p>
                  </div>
                  <div style={{ background: C.bg, borderRadius: 12, padding: "14px 16px" }}>
                    <p style={{ fontSize: 11, color: C.light, margin: "0 0 4px", fontWeight: 600 }}>Beneficiário</p>
                    <p style={{ fontWeight: 800, fontSize: 15, color: C.text, margin: "0 0 2px" }}>{PIX_BENEFICIARIO}</p>
                    <p style={{ fontSize: 10, color: C.light, margin: 0 }}>CNPJ: {PIX_CNPJ}</p>
                  </div>
                </div>

                <div style={{ background: C.bg, borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
                  <p style={{ fontSize: 11, color: C.light, margin: "0 0 6px", fontWeight: 600 }}>Chave PIX (CNPJ)</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <p style={{ fontWeight: 700, fontSize: 16, color: C.text, margin: 0, fontFamily: "monospace", letterSpacing: 0.5 }}>{PIX_CNPJ}</p>
                    <CopyBtn text={PIX_CNPJ} />
                  </div>
                </div>

                <div style={{ background: "#fffbeb", border: `1px solid #fde68a`, borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}>
                  <p style={{ fontSize: 12, color: "#92400e", margin: 0, lineHeight: 1.6 }}>
                    ⚠️ Após o pagamento, envie o comprovante para <strong>contato@dwrenderia.com.br</strong> para ativação imediata do plano.
                  </p>
                </div>

                <CopyBtn text={pixText} />
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: 440 }}>
              {[
                { label: "Número do Cartão", placeholder: "0000 0000 0000 0000", full: true },
                { label: "Nome no Cartão", placeholder: "NOME SOBRENOME", full: true },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: 14 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: C.mid, margin: "0 0 6px" }}>{f.label}</p>
                  <input placeholder={f.placeholder} style={{
                    width: "100%", padding: "13px 14px", borderRadius: 10,
                    border: `1.5px solid ${C.border}`, fontFamily: "inherit",
                    fontSize: 14, color: C.text, background: C.bg, outline: "none", boxSizing: "border-box",
                  }}/>
                </div>
              ))}
              <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: C.mid, margin: "0 0 6px" }}>Validade</p>
                  <input placeholder="MM/AA" style={{ width: "100%", padding: "13px 14px", borderRadius: 10, border: `1.5px solid ${C.border}`, fontFamily: "inherit", fontSize: 14, color: C.text, background: C.bg, outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: C.mid, margin: "0 0 6px" }}>CVV</p>
                  <input placeholder="123" style={{ width: "100%", padding: "13px 14px", borderRadius: 10, border: `1.5px solid ${C.border}`, fontFamily: "inherit", fontSize: 14, color: C.text, background: C.bg, outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ background: C.bg, borderRadius: 12, padding: "12px 16px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: C.mid }}>Total — Plano {selPlan?.label}</span>
                <span style={{ fontWeight: 800, fontSize: 18, color: C.orange }}>R$ {selPlan?.rawPrice}/mês</span>
              </div>
              <Btn style={{ width: "100%" }}>
                {Icons.check} Assinar Plano {selPlan?.label} · R$ {selPlan?.rawPrice}/mês
              </Btn>
            </div>
          )}
        </div>
      </div>
      <StorySidebar />
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function DWRenderIA() {
  const [activeTab, setActiveTab] = useState("gerador");
  // Admin state — in production this would come from auth
  const [isAdmin] = useState(true);
  const [credits] = useState(Infinity);

  const tabs = [
    { id: "gerador", label: "Gerador", icon: Icons.spark },
    { id: "tour360", label: "Tour 360°", icon: Icons.globe },
    { id: "video", label: "Vídeo", icon: Icons.video },
    { id: "historico", label: "Histórico", icon: Icons.history },
    { id: "upscale", label: "Upscale", icon: Icons.upscale },
    { id: "agente", label: "Agente IA", icon: Icons.agent },
    { id: "planos", label: "Planos", icon: Icons.plan },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text }}>
      {/* Navbar */}
      <header style={{
        background: C.bg, borderBottom: `1px solid ${C.border}`,
        padding: "0 28px", height: 62, display: "flex",
        alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 200,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 11,
            background: C.orange, display: "flex", alignItems: "center",
            justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 14, letterSpacing: 0.5,
          }}>DW</div>
          <div>
            <p style={{ fontWeight: 900, fontSize: 13, color: C.text, margin: 0, letterSpacing: 1.5 }}>DW RENDER IA</p>
            <p style={{ fontSize: 8, color: C.light, margin: 0, letterSpacing: 2.5 }}>ARCHITECTURAL AI</p>
          </div>
        </div>

        <nav style={{ display: "flex", gap: 3 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 13px", borderRadius: 9,
              border: activeTab === t.id ? `1.5px solid ${C.orange}` : "1.5px solid transparent",
              background: activeTab === t.id ? C.orangeL : "transparent",
              color: activeTab === t.id ? C.orange : C.mid,
              fontFamily: "inherit", fontWeight: 600, fontSize: 12,
              cursor: "pointer", transition: "all .15s",
            }}>
              {t.icon} {t.label}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ background: "#dcfce7", color: "#16a34a", borderRadius: 999, padding: "4px 12px", fontSize: 11, fontWeight: 700 }}>
            ● Online
          </div>
          {/* Admin badge with ∞ credits */}
          {isAdmin && (
            <div style={{
              background: C.orange, color: "#fff", borderRadius: 10,
              padding: "7px 14px", fontFamily: "inherit",
              fontWeight: 700, fontSize: 12, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 7,
            }}>
              <span>👑</span>
              <span>ADMIN</span>
              <span style={{ background: "rgba(255,255,255,.25)", borderRadius: 6, padding: "2px 8px", fontSize: 13, fontWeight: 900 }}>∞</span>
              <span style={{ fontSize: 10, opacity: 0.85 }}>créditos</span>
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <main style={{ padding: "22px 28px", maxWidth: 1380, margin: "0 auto" }}>
        {activeTab === "gerador" && <GeradorTab />}
        {activeTab === "tour360" && <Tour360Tab />}
        {activeTab === "video" && <VideoTab />}
        {activeTab === "historico" && <HistoricoTab />}
        {activeTab === "upscale" && <UpscaleTab />}
        {activeTab === "agente" && <AgentTab />}
        {activeTab === "planos" && <PlanosTab isAdmin={isAdmin} />}
      </main>
    </div>
  );
}
