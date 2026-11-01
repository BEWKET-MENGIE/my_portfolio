// src/components/hero/HeroImage.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

const css = `
.ho-scene{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none;isolation:isolate;
  background: transparent;}
.ho-scene:not([data-active="true"]) .ho-mesh-orbit,
.ho-scene:not([data-active="true"]) .ho-plane,
.ho-scene:not([data-active="true"]) .ho-path{animation-play-state:paused}

.ho-core-stage{position:absolute;z-index:3;left:50%;top:48%;width:clamp(135px,17vw,230px);aspect-ratio:1;transform:translate(-50%,-50%);display:grid;place-items:center}
.ho-core-shadow{position:absolute;inset:12%;border-radius:50%;background:rgba(6,182,212,.12);filter:blur(27px)}
.ho-core{position:relative;width:100%;height:100%;overflow:visible;filter:drop-shadow(0 0 16px rgba(6,182,212,.25))}
.ho-face{fill:rgba(6,182,212,.12);stroke:rgba(34,211,238,.7);stroke-width:.85}
.ho-face-light{fill:rgba(34,211,238,.2)}
.ho-face-dark{fill:rgba(15,23,42,.3)}
.ho-face-mid{fill:rgba(8,145,178,.15)}
.ho-edges{stroke:rgba(56,189,248,.8);stroke-width:.8}

.ho-mesh-orbit{position:absolute;z-index:4;left:50%;top:48%;width:clamp(190px,25vw,330px);aspect-ratio:1;transform:translate(-50%,-50%)}
.ho-mesh{width:100%;height:100%;overflow:visible;stroke:rgba(6,182,212,.45);stroke-width:.7}
.ho-mesh line{vector-effect:non-scaling-stroke}
.ho-mesh polygon{stroke:rgba(34,211,238,.7);stroke-width:.95;vector-effect:non-scaling-stroke}

.ho-plane{position:absolute;z-index:2;left:50%;top:48%;width:clamp(430px,55vw,760px);height:clamp(190px,27vw,360px);transform:translate(-50%,-50%);border-radius:50%}
.ho-plane-1{animation:ho-orbit-1 29s linear infinite}
.ho-plane-2{width:clamp(540px,72vw,980px);height:clamp(240px,36vw,470px)}
.ho-plane-3{width:clamp(650px,88vw,1180px);height:clamp(300px,43vw,560px)}
.ho-track{position:absolute;inset:0;border:1px solid rgba(6,182,212,.25);border-radius:50%;box-shadow:inset 0 0 20px rgba(6,182,212,.04)}
.ho-plane-2 .ho-track{border-color:rgba(59,130,246,.25)}
.ho-plane-3 .ho-track{border-color:rgba(14,165,233,.2)}
.ho-sat{position:absolute;left:50%;top:-6px;width:12px;height:12px;display:block;transform:translateX(-50%) rotate(45deg);box-shadow:0 0 18px currentColor}
.ho-sat-amber{color:#22d3ee;background:#0891b2}
.ho-sat-teal{top:auto;bottom:-7px;left:23%;width:15px;height:15px;color:#3b82f6;background:#1d4ed8}
.ho-sat-gold{top:47%;left:auto;right:-6px;width:11px;height:11px;color:#38bdf8;background:#0284c7}

.ho-field{position:absolute;z-index:2;left:50%;top:48%;width:clamp(430px,55vw,760px);aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%}
.ho-path{position:absolute;inset:0;display:block;border-radius:50%;transform:rotate(var(--start,0deg))}
.ho-particle{position:absolute;top:0;left:50%;display:block;background:#22d3ee;transform:translateX(-50%) rotate(45deg);opacity:.85;box-shadow:0 0 11px rgba(34,211,238,.3)}
.ho-path:nth-child(even) .ho-particle{background:#3b82f6}

@keyframes ho-orbit-1{from{transform:translate(-50%,-50%) rotate(-20deg) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(-20deg) rotate(360deg)}}

@media (max-width:768px){
  .ho-core-stage,.ho-mesh-orbit,.ho-field,.ho-plane{left:50%}
  .ho-core-stage{top:45%;width:clamp(130px,38vw,190px)}
  .ho-mesh-orbit{top:45%;width:clamp(190px,52vw,270px)}
  .ho-plane-1{top:45%;width:125vw;height:48vw}
  .ho-plane-2{top:45%;width:150vw;height:62vw}
  .ho-plane-3{top:45%;width:175vw;height:76vw}
  .ho-field{top:45%;width:115vw}
}

@media (prefers-reduced-motion:reduce){
  .ho-plane-1{animation:none}
}
`;

const meshLines = [
  [100, 8, 145, 28], [145, 28, 178, 70], [178, 70, 165, 125],
  [165, 125, 125, 170], [125, 170, 75, 185], [75, 185, 32, 150],
  [32, 150, 18, 95], [18, 95, 40, 42], [40, 42, 100, 8],
  [100, 8, 100, 58], [145, 28, 135, 78], [178, 70, 135, 78],
  [178, 70, 120, 110], [165, 125, 120, 110], [125, 170, 120, 110],
  [75, 185, 82, 132], [32, 150, 82, 132], [18, 95, 65, 95],
  [40, 42, 65, 95], [100, 58, 65, 95], [100, 58, 135, 78],
  [65, 95, 82, 132], [82, 132, 120, 110], [65, 95, 120, 110],
  [100, 8, 135, 78], [40, 42, 100, 58], [18, 95, 82, 132],
  [145, 28, 100, 58], [32, 150, 120, 110], [75, 185, 120, 110],
  [100, 58, 100, 145], [135, 78, 100, 145], [65, 95, 100, 145],
];

const satellites = [
  { angle: 12, size: 10, delay: "-2s" },
  { angle: 78, size: 7, delay: "-8s" },
  { angle: 144, size: 11, delay: "-13s" },
  { angle: 208, size: 6, delay: "-4s" },
  { angle: 268, size: 9, delay: "-17s" },
  { angle: 326, size: 7, delay: "-10s" },
];

export default function HeroImage() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    let isIntersecting = false;
    const updateActivity = () => {
      setIsActive(isIntersecting && document.visibilityState === "visible");
    };

    if (!("IntersectionObserver" in window)) {
      isIntersecting = true;
      updateActivity();
    } else {
      const observer = new IntersectionObserver(([entry]) => {
        isIntersecting = entry.isIntersecting;
        updateActivity();
      });
      observer.observe(scene);
      document.addEventListener("visibilitychange", updateActivity);

      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", updateActivity);
      };
    }

    document.addEventListener("visibilitychange", updateActivity);
    return () => document.removeEventListener("visibilitychange", updateActivity);
  }, []);

  return (
    <div
      ref={sceneRef}
      className="ho-scene"
      data-hero-scene
      data-active={isActive}
      aria-hidden="true"
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* The solid geometric core stays still. */}
      <div className="ho-core-stage">
        <div className="ho-core-shadow" />
        <svg className="ho-core" viewBox="0 0 200 200" fill="none">
          <polygon points="100,28 151,58 151,118 100,150 49,120 49,60" className="ho-face" />
          <polygon points="100,28 100,88 151,118 151,58" className="ho-face-light" />
          <polygon points="100,88 100,150 49,120" className="ho-face-dark" />
          <polygon points="100,88 151,58 151,118" className="ho-face-mid" />
          <path
            d="M100 28 L100 88 L49 60 M100 88 L151 58 M100 88 L151 118 M100 88 L49 120 M49 60 L49 120 M151 58 L151 118"
            className="ho-edges"
          />
        </svg>
      </div>

      {/* Polygon mesh around the core. */}
      <div className="ho-mesh-orbit">
        <svg viewBox="0 0 200 200" className="ho-mesh" fill="none">
          {meshLines.map(([x1, y1, x2, y2], index) => (
            <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
          <polygon points="100,8 145,28 178,70 165,125 125,170 75,185 32,150 18,95 40,42" />
          <polygon points="100,58 135,78 120,110 82,132 65,95" />
        </svg>
      </div>

      {/* One moving orbital plane, with two static layers for depth. */}
      <div className="ho-plane ho-plane-1">
        <span className="ho-track" />
        <span className="ho-sat ho-sat-amber" />
      </div>
      <div className="ho-plane ho-plane-2">
        <span className="ho-track" />
        <span className="ho-sat ho-sat-teal" />
      </div>
      <div className="ho-plane ho-plane-3">
        <span className="ho-track" />
        <span className="ho-sat ho-sat-gold" />
      </div>

      {/* Small particles circling the same center. */}
      <div className="ho-field">
        {satellites.map((satellite, index) => (
          <span
            key={index}
            className="ho-path"
            style={
              {
                "--start": `${satellite.angle}deg`,
                animationDelay: satellite.delay,
              } as React.CSSProperties
            }
          >
            <span
              className="ho-particle"
              style={{
                width: `${satellite.size}px`,
                height: `${satellite.size}px`,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}