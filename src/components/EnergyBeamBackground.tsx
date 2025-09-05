"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * EnergyBeamBackground — Three.js + GLSL (somente feixe, fundo transparente)
 * Correção: efeitos separados (init [] e updates com deps) para evitar
 * "The final argument passed to useEffect changed size between renders".
 */
export type EnergyBeamProps = {
  beamColorA?: string;
  beamColorB?: string;
  coreColor?: string;
  speed?: number;
  intensity?: number;
  opacity?: number;
  beamWidth?: number;
  edgeSoftness?: number;
  stripeSpread?: number;
  noiseAmp?: number;
  sparkDensity?: number;
  parallax?: number;
};

const VERT = `
precision highp float;
attribute vec3 position;
void main(){
  gl_Position = vec4(position, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

uniform vec3 u_beamA;
uniform vec3 u_beamB;
uniform vec3 u_core;

uniform float u_speed;
uniform float u_intensity;
uniform float u_opacity;
uniform float u_beamWidth;
uniform float u_edgeSoftness;
uniform float u_stripeSpread;
uniform float u_noiseAmp;
uniform float u_sparkDensity;
uniform float u_parallax;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0,0.0));
  float c = hash(i + vec2(0.0,1.0));
  float d = hash(i + vec2(1.0,1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}

float fbm(vec2 p){
  float v = 0.0; float a = 0.5; mat2 m = mat2(1.6,-1.2,1.2,1.6);
  for(int i=0;i<5;i++){ v += a*noise(p); p = m*p; a *= 0.5; }
  return v;
}

void main(){
  vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy) / min(u_res.x, u_res.y);
  p += (u_mouse - 0.5) * u_parallax;
  float t = u_time * u_speed;

  float n = fbm(vec2(p.x*6.0 + t*1.2, p.y*4.0 - t*0.7));
  float y = p.y + (n - 0.5) * u_noiseAmp;
  float dLine = abs(y);

  float core = smoothstep(u_beamWidth, 0.0, dLine);

  float bands = 0.0;
  for(int i=0;i<3;i++){
    float phase = float(i) * 1.57;
    float s = sin(12.0*p.x + t*4.0 + phase) * 0.5 + 0.5;
    float l = smoothstep(u_beamWidth + u_stripeSpread*0.5, 0.0, abs(y - (s-0.5)*u_stripeSpread));
    bands += l;
  }
  bands = clamp(bands, 0.0, 1.0);

  vec3 beamCol = mix(u_beamA, u_beamB, bands*0.85 + 0.15*fbm(p*8.0)) * (0.6 + 0.4*bands);
  beamCol += u_core * pow(core, 2.0) * 1.4;
  beamCol *= u_intensity;

  vec2 sparkUV = vec2(p.x*4.5 + t*1.8, p.y*8.0 - t*0.6);
  float sp = noise(sparkUV);
  float nearBeam = smoothstep(u_beamWidth*1.2, 0.0, dLine);
  float th = 1.0 - clamp(u_sparkDensity, 0.0, 1.0) * 0.03 - 0.005;
  float sparks = step(th, sp) * nearBeam;
  vec3 sparkCol = mix(u_beamB, u_core, 0.7) * sparks * 1.4;

  vec3 col = beamCol + sparkCol;

  float energy = max(core, bands);
  float alpha = u_opacity * smoothstep(0.0, 1.0, pow(energy, u_edgeSoftness));
  col *= alpha;

  gl_FragColor = vec4(col, alpha);
}
`;

export default function EnergyBeamBackground({
  beamColorA = "#6b21a8",
  beamColorB = "#c026d3",
  coreColor = "#f5e1ff",
  speed = 1.0,
  intensity = 1.0,
  opacity = 0.9,
  beamWidth = 0.12,
  edgeSoftness = 1.6,
  stripeSpread = 0.18,
  noiseAmp = 0.2,
  sparkDensity = 0.5,
  parallax = 0.05,
}: EnergyBeamProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const uniformsRef = useRef<any>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);

  // 1) INIT + CLEANUP — roda uma vez
  useEffect(() => {
    if (!ref.current) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(ref.current.clientWidth, ref.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    ref.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();

    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]);
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    const toVec3 = (hex: string) => {
      const c = new THREE.Color(hex);
      return new THREE.Vector3(c.r, c.g, c.b);
    };

    const uniforms: any = {
      u_res: {
        value: new THREE.Vector2(
          renderer.domElement.width,
          renderer.domElement.height
        ),
      },
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_beamA: { value: toVec3(beamColorA) },
      u_beamB: { value: toVec3(beamColorB) },
      u_core: { value: toVec3(coreColor) },
      u_speed: { value: speed },
      u_intensity: { value: intensity },
      u_opacity: { value: opacity },
      u_beamWidth: { value: beamWidth },
      u_edgeSoftness: { value: edgeSoftness },
      u_stripeSpread: { value: stripeSpread },
      u_noiseAmp: { value: noiseAmp },
      u_sparkDensity: { value: sparkDensity },
      u_parallax: { value: parallax },
    };
    uniformsRef.current = uniforms;

    const material = new THREE.RawShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthTest: false,
      blending: THREE.NormalBlending,
      uniforms,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onResize = () => {
      if (!ref.current || !rendererRef.current || !uniformsRef.current) return;
      const { clientWidth, clientHeight } = ref.current;
      rendererRef.current.setSize(clientWidth, clientHeight, false);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      uniformsRef.current.u_res.value.set(
        rendererRef.current.domElement.width,
        rendererRef.current.domElement.height
      );
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(ref.current);
    roRef.current = ro;

    const onMouseMove = (e: MouseEvent) => {
      if (!ref.current || !uniformsRef.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      uniformsRef.current.u_mouse.value.set(x, 1 - y);
    };
    window.addEventListener("mousemove", onMouseMove);

    const start = performance.now();
    const tick = () => {
      if (!rendererRef.current) return;
      uniformsRef.current.u_time.value = (performance.now() - start) / 1000.0;
      rendererRef.current.render(scene, camera);
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement)
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      rendererRef.current = null;
      roRef.current = null;
      uniformsRef.current = null;
    };
    // vazio de propósito — init único
  }, []);

  // 2) UPDATES — quando as props mudam, atualiza uniforms sem recriar renderer
  useEffect(() => {
    const u = uniformsRef.current as any;
    if (!u) return;

    const toVec3 = (hex: string) => {
      const c = new THREE.Color(hex);
      return new THREE.Vector3(c.r, c.g, c.b);
    };
    u.u_beamA.value.copy(toVec3(beamColorA));
    u.u_beamB.value.copy(toVec3(beamColorB));
    u.u_core.value.copy(toVec3(coreColor));
    u.u_speed.value = speed;
    u.u_intensity.value = intensity;
    u.u_opacity.value = opacity;
    u.u_beamWidth.value = beamWidth;
    u.u_edgeSoftness.value = edgeSoftness;
    u.u_stripeSpread.value = stripeSpread;
    u.u_noiseAmp.value = noiseAmp;
    u.u_sparkDensity.value = sparkDensity;
    u.u_parallax.value = parallax;
  }, [
    beamColorA,
    beamColorB,
    coreColor,
    speed,
    intensity,
    opacity,
    beamWidth,
    edgeSoftness,
    stripeSpread,
    noiseAmp,
    sparkDensity,
    parallax,
  ]);

  return (
    <div
      ref={ref}
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
    />
  );
}
