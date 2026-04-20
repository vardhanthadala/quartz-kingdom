'use client';

import React, { useRef, useEffect } from 'react';

class ElectricBorder {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    // Configuration
    this.width = options.width || 475;
    this.height = options.height || 625;
    this.octaves = options.octaves || 10;
    this.lacunarity = options.lacunarity || 1.6;
    this.gain = options.gain || 0.6;
    this.amplitude = options.amplitude || 0.2;
    this.frequency = options.frequency || 5;
    this.baseFlatness = options.baseFlatness || 0.2;
    this.displacement = options.displacement || 60;
    this.speed = options.speed || 1;
    this.borderOffset = options.borderOffset || 60;
    this.borderRadius = options.borderRadius || 40;
    this.lineWidth = options.lineWidth || 1;
    this.color = options.color || "#0284c7";

    this.animationId = null;
    this.time = 0;
    this.lastFrameTime = 0;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.start();
  }

  random(x) {
    return (Math.sin(x * 12.9898) * 43758.5453) % 1;
  }

  noise2D(x, y) {
    const i = Math.floor(x);
    const j = Math.floor(y);
    const fx = x - i;
    const fy = y - j;

    const a = this.random(i + j * 57);
    const b = this.random(i + 1 + j * 57);
    const c = this.random(i + (j + 1) * 57);
    const d = this.random(i + 1 + (j + 1) * 57);

    const ux = fx * fx * (3.0 - 2.0 * fx);
    const uy = fy * fy * (3.0 - 2.0 * fy);

    return (
      a * (1 - ux) * (1 - uy) +
      b * ux * (1 - uy) +
      c * (1 - ux) * uy +
      d * ux * uy
    );
  }

  octavedNoise(x, octaves, lacunarity, gain, baseAmplitude, baseFrequency, time = 0, seed = 0, baseFlatness = 1.0) {
    let y = 0;
    let amplitude = baseAmplitude;
    let frequency = baseFrequency;

    for (let i = 0; i < octaves; i++) {
      let octaveAmplitude = amplitude;
      if (i === 0) octaveAmplitude *= baseFlatness;
      y += octaveAmplitude * this.noise2D(frequency * x + seed * 100, time * frequency * 0.3);
      frequency *= lacunarity;
      amplitude *= gain;
    }
    return y;
  }

  getRoundedRectPoint(t, left, top, width, height, radius) {
    const straightWidth = width - 2 * radius;
    const straightHeight = height - 2 * radius;
    const cornerArc = (Math.PI * radius) / 2;
    const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
    const distance = t * totalPerimeter;
    let accumulated = 0;

    if (distance <= accumulated + straightWidth) {
      const progress = (distance - accumulated) / straightWidth;
      return { x: left + radius + progress * straightWidth, y: top };
    }
    accumulated += straightWidth;

    if (distance <= accumulated + cornerArc) {
      const progress = (distance - accumulated) / cornerArc;
      return this.getCornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, progress);
    }
    accumulated += cornerArc;

    if (distance <= accumulated + straightHeight) {
      const progress = (distance - accumulated) / straightHeight;
      return { x: left + width, y: top + radius + progress * straightHeight };
    }
    accumulated += straightHeight;

    if (distance <= accumulated + cornerArc) {
      const progress = (distance - accumulated) / cornerArc;
      return this.getCornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, progress);
    }
    accumulated += cornerArc;

    if (distance <= accumulated + straightWidth) {
      const progress = (distance - accumulated) / straightWidth;
      return { x: left + width - radius - progress * straightWidth, y: top + height };
    }
    accumulated += straightWidth;

    if (distance <= accumulated + cornerArc) {
      const progress = (distance - accumulated) / cornerArc;
      return this.getCornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, progress);
    }
    accumulated += cornerArc;

    if (distance <= accumulated + straightHeight) {
      const progress = (distance - accumulated) / straightHeight;
      return { x: left, y: top + height - radius - progress * straightHeight };
    }
    accumulated += straightHeight;

    const progress = (distance - accumulated) / cornerArc;
    return this.getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, progress);
  }

  getCornerPoint(centerX, centerY, radius, startAngle, arcLength, progress) {
    const angle = startAngle + progress * arcLength;
    return { x: centerX + radius * Math.cos(angle), y: centerY + radius * Math.sin(angle) };
  }

  drawElectricBorder(currentTime = 0) {
    if (!this.canvas || !this.ctx) return;
    const deltaTime = (currentTime - this.lastFrameTime) / 1000;
    this.time += deltaTime * this.speed;
    this.lastFrameTime = currentTime;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    const scale = this.displacement;
    const left = this.borderOffset;
    const top = this.borderOffset;
    const borderWidth = this.canvas.width - 2 * this.borderOffset;
    const borderHeight = this.canvas.height - 2 * this.borderOffset;
    const radius = Math.min(this.borderRadius, Math.min(borderWidth, borderHeight) / 2);

    const approximatePerimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
    const sampleCount = Math.floor(approximatePerimeter / 2);

    this.ctx.beginPath();
    for (let i = 0; i <= sampleCount; i++) {
      const progress = i / sampleCount;
      const point = this.getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);
      const xNoise = this.octavedNoise(progress * 8, this.octaves, this.lacunarity, this.gain, this.amplitude, this.frequency, this.time, 0, this.baseFlatness);
      const yNoise = this.octavedNoise(progress * 8, this.octaves, this.lacunarity, this.gain, this.amplitude, this.frequency, this.time, 1, this.baseFlatness);
      const displacedX = point.x + xNoise * scale;
      const displacedY = point.y + yNoise * scale;
      if (i === 0) this.ctx.moveTo(displacedX, displacedY);
      else this.ctx.lineTo(displacedX, displacedY);
    }
    this.ctx.closePath();
    this.ctx.stroke();

    this.animationId = requestAnimationFrame((time) => this.drawElectricBorder(time));
  }

  start() {
    this.animationId = requestAnimationFrame((time) => this.drawElectricBorder(time));
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}

export default function ElectricBorderCard({ children, color, className = "" }) {
  const canvasRef = useRef(null);
  const borderInstance = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      borderInstance.current = new ElectricBorder(canvasRef.current, {
        width: 1000,
        height: 1000,
        octaves: 10,
        lacunarity: 1.6,
        gain: 0.7,
        amplitude: 0.1,
        frequency: 8,
        baseFlatness: 0,
        displacement: 60,
        speed: 1.2,
        borderOffset: 150,
        borderRadius: 48,
        lineWidth: 3,
        color: color
      });
    }

    return () => {
      if (borderInstance.current) {
        borderInstance.current.stop();
      }
    };
  }, [color]);

  return (
    <div className={`relative h-full overflow-hidden rounded-[32px] border border-[#e2e8f0] bg-white group transition-all duration-700 hover:shadow-2xl ${className}`}>
        {/* Electric Border Background Container - only visible on hover for that dramatic effect */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            {/* Background Glow Layer (overlay-1 & 2 logic) */}
            <div 
                className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-30 blur-2xl scale-[1.1] transition-all duration-700" 
                style={{ background: `linear-gradient(-30deg, ${color}, transparent, ${color})` }}
            />
            
            <canvas 
                ref={canvasRef} 
                className="absolute w-[150%] h-[150%] pointer-events-none" 
            />
            
            {/* Glow Layer 1 (Blur 1px) */}
            <div 
                className="absolute inset-0 border-2 rounded-[32px] filter blur-[1px] opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                style={{ borderColor: color }}
            />
            
            {/* Glow Layer 2 (Blur 4px) */}
            <div 
                className="absolute inset-0 border-2 rounded-[32px] filter blur-[4px] opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                style={{ borderColor: color }}
            />
        </div>

        {/* Card Content Overlay */}
        <div className="relative z-10 h-full p-8 md:p-12 lg:p-16 flex flex-col pointer-events-auto">
            {children}
        </div>

        {/* Shine Sweep Overlay */}
        <div className="absolute -inset-px opacity-0 group-hover:opacity-25 transition duration-1000 bg-gradient-to-r from-transparent via-white to-transparent translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none" />
    </div>
  );
}
