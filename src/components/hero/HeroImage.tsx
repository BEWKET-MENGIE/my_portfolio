"use client";

import React from "react";

/*
  Self-contained version: the CSS is embedded below, so this component no
  longer depends on HeroImage.module.css (filename, location, or HMR issues).
  You can delete HeroImage.module.css after switching to this file.
*/

const css = `
.ho-scene{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none;isolation:isolate;
  background:radial-gradient(ellipse at 48% 43%,rgba(89,65,32,.2),transparent 38%),radial-gradient(ellipse at center,#17120d 0%,#100c09 64%,#0d0a08 100%)}
.ho-glow{position:absolute;left:47%;top:43%;width:min(46vw,620px);aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:rgba(165,111,35,.13);filter:blur(75px)}
.ho-grid{position:absolute;left:-30%;right:-30%;bottom:-40%;height:90%;opacity:.48;transform:perspective(520px) rotateX(62deg);transform-origin:center top;
  background-image:linear-gradient(rgba(180,140,71,.22) 1px,transparent 1px),linear-gradient(90deg,rgba(180,140,71,.22) 1px,transparent 1px);background-size:44px 30px;
  mask-image:linear-gradient(to bottom,transparent 0%,#000 24%,#000 76%,transparent 100%);-webkit-mask-image:linear-gradient(to bottom,transparent 0%,#000 24%,#000 76%,transparent 100%)}
.ho-axis{position:absolute;top:0;bottom:0;left:47.1%;width:1px;opacity:.48;background:linear-gradient(to bottom,transparent,rgba(180,140,71,.25) 20%,rgba(180,140,71,.45) 52%,transparent)}


.ho-core-stage{position:absolute;z-index:3;left:47.1%;top:48%;width:clamp(135px,17vw,230px);aspect-ratio:1;transform:translate(-50%,-50%);display:grid;place-items:center}
.ho-core-shadow{position:absolute;inset:12%;border-radius:50%;background:rgba(177,128,46,.16);filter:blur(27px)}
.ho-core{position:relative;width:100%;height:100%;overflow:visible;filter:drop-shadow(0 0 14px rgba(195,157,78,.13))}
.ho-face{fill:rgba(149,111,46,.23);stroke:rgba(205,169,94,.78);stroke-width:.85}
.ho-face-light{fill:rgba(187,143,62,.3)}
.ho-face-dark{fill:rgba(88,67,33,.34)}
.ho-face-mid{fill:rgba(161,121,51,.2)}
.ho-edges{stroke:rgba(221,183,103,.75);stroke-width:.8}

.ho-mesh-orbit{position:absolute;z-index:4;left:47.1%;top:48%;width:clamp(190px,25vw,330px);aspect-ratio:1;transform:translate(-50%,-50%);animation:ho-mesh-turn 32s linear infinite;will-change:transform}
.ho-mesh{width:100%;height:100%;overflow:visible;stroke:rgba(199,164,88,.68);stroke-width:.7}
.ho-mesh line{vector-effect:non-scaling-stroke}
.ho-mesh polygon{stroke:rgba(219,181,100,.78);stroke-width:.95;vector-effect:non-scaling-stroke}

.ho-plane{position:absolute;z-index:2;left:47.1%;top:48%;width:clamp(430px,55vw,760px);height:clamp(190px,27vw,360px);transform:translate(-50%,-50%);border-radius:50%;will-change:transform}
.ho-plane-1{animation:ho-orbit-1 29s linear infinite}
.ho-plane-2{width:clamp(540px,72vw,980px);height:clamp(240px,36vw,470px);animation:ho-orbit-2 43s linear infinite reverse}
.ho-plane-3{width:clamp(650px,88vw,1180px);height:clamp(300px,43vw,560px);animation:ho-orbit-3 57s linear infinite}
.ho-track{position:absolute;inset:0;border:1px solid rgba(187,147,70,.36);border-radius:50%;box-shadow:inset 0 0 20px rgba(187,147,70,.04)}
.ho-plane-2 .ho-track{border-color:rgba(63,151,153,.34)}
.ho-plane-3 .ho-track{border-color:rgba(193,159,87,.26)}
.ho-sat{position:absolute;left:50%;top:-6px;width:12px;height:12px;display:block;transform:translateX(-50%) rotate(45deg);box-shadow:0 0 18px currentColor}
.ho-sat-amber{color:#d5a64f;background:#b58a3b}
.ho-sat-teal{top:auto;bottom:-7px;left:23%;width:15px;height:15px;color:#4ba6a5;background:#236b6b}
.ho-sat-gold{top:47%;left:auto;right:-6px;width:11px;height:11px;color:#c9a15a;background:#8e7037}

.ho-field{position:absolute;z-index:2;left:47.1%;top:48%;width:clamp(430px,55vw,760px);aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%}
.ho-path{position:absolute;inset:0;display:block;border-radius:50%;transform:rotate(var(--start,0deg));animation:ho-satellite 24s linear infinite;will-change:transform}
.ho-particle{position:absolute;top:0;left:50%;display:block;background:#bda05e;transform:translateX(-50%) rotate(45deg);opacity:.86;box-shadow:0 0 11px rgba(189,160,94,.25)}
.ho-path:nth-child(even) .ho-particle{background:#478d8d}

.ho-vignette{position:absolute;inset:0;z-index:5;
  background:linear-gradient(to bottom,rgba(10,8,6,.12),transparent 28%,transparent 72%,rgba(10,8,6,.2)),radial-gradient(ellipse at center,transparent 42%,rgba(8,6,5,.48) 100%)}

@keyframes ho-mesh-turn{from{transform:translate(-50%,-50%) rotate(0deg) rotateX(8deg)}to{transform:translate(-50%,-50%) rotate(360deg) rotateX(8deg)}}
@keyframes ho-orbit-1{from{transform:translate(-50%,-50%) rotate(-20deg) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(-20deg) rotate(360deg)}}
@keyframes ho-orbit-2{from{transform:translate(-50%,-50%) rotate(28deg) rotate(0deg) scaleY(.92)}to{transform:translate(-50%,-50%) rotate(28deg) rotate(360deg) scaleY(.92)}}
@keyframes ho-orbit-3{from{transform:translate(-50%,-50%) rotate(-8deg) rotate(0deg) scaleY(.82)}to{transform:translate(-50%,-50%) rotate(-8deg) rotate(360deg) scaleY(.82)}}
@keyframes ho-satellite{from{transform:rotate(var(--start,0deg))}to{transform:rotate(calc(var(--start,0deg) + 360deg))}}

@media (max-width:768px){
  .ho-core-stage,.ho-mesh-orbit,.ho-field,.ho-plane,.ho-axis{left:50%}
  .ho-core-stage{top:45%;width:clamp(130px,38vw,190px)}
  .ho-mesh-orbit{top:45%;width:clamp(190px,52vw,270px)}
  .ho-plane-1{top:45%;width:125vw;height:48vw}
  .ho-plane-2{top:45%;width:150vw;height:62vw}
  .ho-plane-3{top:45%;width:175vw;height:76vw}
  .ho-field{top:45%;width:115vw}
  .ho-grid{left:-80%;right:-80%;bottom:-24%;height:68%}
  .ho-glow{left:50%;top:44%;width:85vw}
}

@media (prefers-reduced-motion:reduce){
  .ho-mesh-orbit,.ho-plane-1,.ho-plane-2,.ho-plane-3,.ho-path{animation-duration:90s}
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
  return (
    <div className="ho-scene" data-hero-scene aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="ho-glow" />
      <div className="ho-grid" />
      <div className="ho-axis" />

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

      {/* Polygon mesh rotating around the core. */}
      <div className="ho-mesh-orbit">
        <svg viewBox="0 0 200 200" className="ho-mesh" fill="none">
          {meshLines.map(([x1, y1, x2, y2], index) => (
            <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
          <polygon points="100,8 145,28 178,70 165,125 125,170 75,185 32,150 18,95 40,42" />
          <polygon points="100,58 135,78 120,110 82,132 65,95" />
        </svg>
      </div>

      {/* Three orbital planes at different speeds and directions. */}
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

      <div className="ho-vignette" />
    </div>
  );
}