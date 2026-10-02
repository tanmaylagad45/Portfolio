import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playCyberBeep } from '../utils/audio';
import { useTheme } from '../context/useTheme';

interface NodeData {
  id: string;
  name: string;
  angle: number;
  radius: number;
  height: number;
  color: string;
  category: string;
}

const NODES_DATA: NodeData[] = [
  { id: 'ai-ml', name: 'AI / ML', angle: 0, radius: 3.4, height: 0.7, color: '#16A34A', category: 'Core Focus' },
  { id: 'code', name: 'Full-Stack', angle: (Math.PI * 2) / 6, radius: 3.2, height: -0.6, color: '#0F766E', category: 'Software' },
  { id: 'data', name: 'Databases', angle: (Math.PI * 4) / 6, radius: 3.5, height: 0.9, color: '#2563EB', category: 'Pipelines' },
  { id: 'projects', name: 'Projects', angle: (Math.PI * 6) / 6, radius: 3.3, height: -0.8, color: '#4F46E5', category: 'Hands-on' },
  { id: 'nexus', name: 'NEXUS', angle: (Math.PI * 8) / 6, radius: 3.6, height: 0.4, color: '#D97706', category: 'SIH Winner' },
  { id: 'web', name: 'Web Dev', angle: (Math.PI * 10) / 6, radius: 3.1, height: -0.3, color: '#0D9488', category: 'Modern UI' },
];

export const ThreeHeroScene: React.FC = () => {
  const { theme } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [nodeScreenPos, setNodeScreenPos] = useState<{ [key: string]: { x: number; y: number; visible: boolean } }>({});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isDark = theme === 'dark';
    const checkMobile = window.innerWidth < 768;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDark ? 0x0B0F17 : 0xF7F8FA, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, checkMobile ? 9.8 : 8.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !checkMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, checkMobile ? 1.25 : 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.1 : 1.0;
    container.appendChild(renderer.domElement);

    // Group that holds everything to allow uniform rotation/tilt
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // --- SLEEK METALLIC NUCLEUS ---
    const innerCoreGeo = new THREE.IcosahedronGeometry(1.15, 2);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1E293B : 0x1E293B,
      metalness: 0.85,
      roughness: 0.25,
      emissive: isDark ? 0x0F172A : 0x0F172A,
      emissiveIntensity: isDark ? 0.3 : 0.15,
      wireframe: false,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    worldGroup.add(innerCoreMesh);

    // Refined geometric wireframe cage
    const wireCoreGeo = new THREE.IcosahedronGeometry(1.42, 1);
    const wireCoreMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x64748B : 0x94A3B8,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.45 : 0.35,
    });
    const wireCoreMesh = new THREE.Mesh(wireCoreGeo, wireCoreMat);
    worldGroup.add(wireCoreMesh);

    // Floating points around core
    const corePointsGeo = new THREE.IcosahedronGeometry(1.65, 2);
    const corePointsMat = new THREE.PointsMaterial({
      color: isDark ? 0x22C55E : 0x16A34A,
      size: 0.03,
      transparent: true,
      opacity: isDark ? 0.6 : 0.45,
    });
    const corePointsMesh = new THREE.Points(corePointsGeo, corePointsMat);
    worldGroup.add(corePointsMesh);

    // Orbital Tracks / Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: isDark ? 0x475569 : 0xCBD5E1,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    });
    const ringGeo1 = new THREE.RingGeometry(2.1, 2.12, 64);
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI * 0.45;
    ringMesh1.rotation.y = Math.PI * 0.15;
    worldGroup.add(ringMesh1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: isDark ? 0x22C55E : 0x16A34A,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
      side: THREE.DoubleSide,
    });
    const ringGeo2 = new THREE.RingGeometry(2.5, 2.52, 64);
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI * 0.35;
    ringMesh2.rotation.y = -Math.PI * 0.25;
    worldGroup.add(ringMesh2);

    // --- SATELLITE NODES ---
    const nodeMeshes: { mesh: THREE.Mesh; data: NodeData; initialPos: THREE.Vector3 }[] = [];
    const lineGeometries: { geo: THREE.BufferGeometry; line: THREE.Line; nodeIndex: number }[] = [];

    NODES_DATA.forEach((node, i) => {
      const nodeGeo = new THREE.SphereGeometry(0.14, 20, 20);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: node.color,
        metalness: 0.4,
        roughness: 0.3,
        emissive: isDark ? node.color : 0x000000,
        emissiveIntensity: isDark ? 0.35 : 0,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);

      // Subtle node halo
      const haloGeo = new THREE.SphereGeometry(0.2, 12, 12);
      const haloMat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.35 : 0.25,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      nodeMesh.add(haloMesh);

      const x = Math.cos(node.angle) * node.radius;
      const z = Math.sin(node.angle) * node.radius;
      const y = node.height;
      const initialPos = new THREE.Vector3(x, y, z);
      nodeMesh.position.copy(initialPos);
      worldGroup.add(nodeMesh);

      nodeMeshes.push({ mesh: nodeMesh, data: node, initialPos });

      // Connecting line to core
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: isDark ? 0x334155 : 0xCBD5E1,
        transparent: true,
        opacity: isDark ? 0.45 : 0.35,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      worldGroup.add(line);
      lineGeometries.push({ geo: lineGeo, line, nodeIndex: i });
    });

    // Interconnect adjacent nodes
    for (let i = 0; i < nodeMeshes.length; i++) {
      const nextIdx = (i + 1) % nodeMeshes.length;
      const interLineGeo = new THREE.BufferGeometry().setFromPoints([
        nodeMeshes[i].mesh.position,
        nodeMeshes[nextIdx].mesh.position,
      ]);
      const interLineMat = new THREE.LineBasicMaterial({
        color: isDark ? 0x1E293B : 0xE2E8F0,
        transparent: true,
        opacity: isDark ? 0.35 : 0.25,
      });
      const interLine = new THREE.Line(interLineGeo, interLineMat);
      worldGroup.add(interLine);
    }

    // --- REFINED MINIMAL PARTICLES ---
    const particleCount = checkMobile ? 40 : 120;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(isDark ? 0x64748B : 0x94A3B8);
    const c2 = new THREE.Color(isDark ? 0x22C55E : 0x16A34A);
    const c3 = new THREE.Color(isDark ? 0x334155 : 0xCBD5E1);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 1;

      const mix = Math.random();
      const col = mix > 0.7 ? c2 : mix > 0.3 ? c1 : c3;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: checkMobile ? 0.035 : 0.04,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.55 : 0.45,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- SOFT LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, isDark ? 1.4 : 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xF8FAFC, isDark ? 1.8 : 1.6);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const softFillLight = new THREE.DirectionalLight(0xE2E8F0, isDark ? 0.6 : 0.9);
    softFillLight.position.set(-5, -3, 3);
    scene.add(softFillLight);

    const subtleAccentLight = new THREE.PointLight(isDark ? 0x22C55E : 0x16A34A, isDark ? 1.5 : 1.2, 12);
    subtleAccentLight.position.set(0, 0, 0);
    scene.add(subtleAccentLight);

    // --- MOUSE & SCROLL STATE ---
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const relY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = relX;
      targetMouseY = relY;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.25 : 1.75));
    };
    window.addEventListener('resize', handleResize);

    // --- ANIMATION LOOP ---
    let reqId: number;
    const startTime = performance.now();
    const tempVec = new THREE.Vector3();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      scrollY += (targetScrollY - scrollY) * 0.06;

      innerCoreMesh.rotation.y = elapsedTime * 0.2;
      innerCoreMesh.rotation.x = Math.sin(elapsedTime * 0.15) * 0.15;
      wireCoreMesh.rotation.y = -elapsedTime * 0.12;
      wireCoreMesh.rotation.z = Math.cos(elapsedTime * 0.18) * 0.15;
      corePointsMesh.rotation.y = elapsedTime * 0.08;

      const pulse = 1 + Math.sin(elapsedTime * 1.5) * 0.02;
      innerCoreMesh.scale.set(pulse, pulse, pulse);

      ringMesh1.rotation.z = elapsedTime * 0.15;
      ringMesh2.rotation.z = -elapsedTime * 0.12;

      worldGroup.rotation.y = mouseX * 0.25 + elapsedTime * 0.03;
      worldGroup.rotation.x = -mouseY * 0.18 + (scrollY * 0.0003);
      worldGroup.position.y = -scrollY * 0.001;

      camera.position.x = mouseX * 0.35;
      camera.position.y = mouseY * 0.25;

      const updatedScreenPositions: { [key: string]: { x: number; y: number; visible: boolean } } = {};

      nodeMeshes.forEach((item, idx) => {
        const orbitSpeed = 0.1;
        const currentAngle = item.data.angle + elapsedTime * orbitSpeed;
        const x = Math.cos(currentAngle) * item.data.radius;
        const z = Math.sin(currentAngle) * item.data.radius;
        const y = item.data.height + Math.sin(elapsedTime * 1.2 + idx) * 0.15;

        item.mesh.position.set(x, y, z);

        const lineItem = lineGeometries[idx];
        if (lineItem) {
          const positions = lineItem.geo.attributes.position as THREE.BufferAttribute;
          positions.setXYZ(1, x, y, z);
          positions.needsUpdate = true;
        }

        item.mesh.getWorldPosition(tempVec);
        tempVec.project(camera);

        const isBehind = tempVec.z > 1;
        const screenX = (tempVec.x * 0.5 + 0.5) * container.clientWidth;
        const screenY = (-(tempVec.y * 0.5) + 0.5) * container.clientHeight;

        updatedScreenPositions[item.data.id] = {
          x: screenX,
          y: screenY,
          visible: !isBehind && screenX > 0 && screenX < container.clientWidth && screenY > 0 && screenY < container.clientHeight,
        };
      });

      setNodeScreenPos(updatedScreenPositions);

      particleSystem.rotation.y = elapsedTime * 0.01 + mouseX * 0.04;
      particleSystem.rotation.x = mouseY * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      wireCoreGeo.dispose();
      wireCoreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [theme]);

  return (
    <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] flex items-center justify-center select-none overflow-hidden">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Clean Minimal Core Indicator */}
      <div className="absolute top-4 right-4 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs backdrop-blur-md text-[11px] font-mono-tech text-slate-700 dark:text-slate-300">
        <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
        <span>3D Interactive Architecture</span>
      </div>

      <div className="absolute bottom-4 left-4 pointer-events-none hidden sm:flex items-center gap-2 text-[11px] font-mono-tech text-slate-500 dark:text-slate-400 bg-white/90 dark:bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-800 shadow-xs backdrop-blur-md">
        <span>Drag to rotate • 6 interconnected domains</span>
      </div>

      {/* Dynamic 2D HTML Projection Nodes linked to 3D positions */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {NODES_DATA.map((node) => {
          const pos = nodeScreenPos[node.id];
          if (!pos || !pos.visible) return null;
          const isSelected = activeNode === node.id;

          return (
            <div
              key={node.id}
              style={{
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
                transition: 'transform 0.05s linear',
              }}
              className="absolute -top-3 -left-12 pointer-events-auto cursor-pointer group"
              onMouseEnter={() => {
                setActiveNode(node.id);
                playCyberBeep(700, 0.04, 'sine');
              }}
              onMouseLeave={() => setActiveNode(null)}
              onClick={() => {
                setActiveNode(node.id);
                playCyberBeep(920, 0.06, 'triangle');
              }}
            >
              <div
                className={`relative px-2.5 py-1 rounded-full text-[11px] font-medium tracking-tight transition-all duration-200 backdrop-blur-md flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-md scale-105'
                    : 'bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-xs hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: node.color }}
                />
                <span>{node.name}</span>

                {/* Subtitle tag on hover */}
                {isSelected && (
                  <span className="text-[10px] text-slate-300 dark:text-emerald-100 ml-1 border-l border-white/20 pl-1 font-mono-tech">
                    {node.category}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
