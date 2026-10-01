import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playCyberBeep } from '../utils/audio';

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
  { id: 'ai-ml', name: 'AI / ML', angle: 0, radius: 3.4, height: 0.8, color: '#00FF88', category: 'Core Focus' },
  { id: 'code', name: 'CODE', angle: (Math.PI * 2) / 6, radius: 3.2, height: -0.7, color: '#00F0FF', category: 'Full-Stack' },
  { id: 'data', name: 'DATA', angle: (Math.PI * 4) / 6, radius: 3.5, height: 1.1, color: '#10B981', category: 'Databases' },
  { id: 'projects', name: 'PROJECTS', angle: (Math.PI * 6) / 6, radius: 3.3, height: -0.9, color: '#38BDF8', category: 'Hands-on' },
  { id: 'nexus', name: 'NEXUS', angle: (Math.PI * 8) / 6, radius: 3.6, height: 0.5, color: '#00FF88', category: 'SIH Winner' },
  { id: 'web', name: 'WEB', angle: (Math.PI * 10) / 6, radius: 3.1, height: -0.3, color: '#A78BFA', category: 'Modern UI' },
];

export const ThreeHeroScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [nodeScreenPos, setNodeScreenPos] = useState<{ [key: string]: { x: number; y: number; visible: boolean } }>({});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const checkMobile = window.innerWidth < 768;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060a, 0.05);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, checkMobile ? 10 : 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !checkMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, checkMobile ? 1.25 : 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group that holds everything to allow uniform rotation/tilt
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // --- CENTRAL CORE: MULTI-LAYERED CYBER NUCLEUS ---
    // 1. Inner glowing sphere
    const innerCoreGeo = new THREE.IcosahedronGeometry(1.1, 3);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0x051b14,
      emissive: 0x00ff88,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    worldGroup.add(innerCoreMesh);

    // 2. Faceted geometric wireframe cage
    const wireCoreGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const wireCoreMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireCoreMesh = new THREE.Mesh(wireCoreGeo, wireCoreMat);
    worldGroup.add(wireCoreMesh);

    // 3. Floating points around core
    const corePointsGeo = new THREE.IcosahedronGeometry(1.65, 2);
    const corePointsMat = new THREE.PointsMaterial({
      color: 0x00ff88,
      size: 0.04,
      transparent: true,
      opacity: 0.75,
    });
    const corePointsMesh = new THREE.Points(corePointsGeo, corePointsMat);
    worldGroup.add(corePointsMesh);

    // 4. Orbital Cyber Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const ringGeo1 = new THREE.RingGeometry(2.1, 2.14, 64);
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI * 0.45;
    ringMesh1.rotation.y = Math.PI * 0.15;
    worldGroup.add(ringMesh1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const ringGeo2 = new THREE.RingGeometry(2.5, 2.53, 64);
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI * 0.35;
    ringMesh2.rotation.y = -Math.PI * 0.25;
    worldGroup.add(ringMesh2);

    // --- SATELLITE NODES ---
    const nodeMeshes: { mesh: THREE.Mesh; data: NodeData; initialPos: THREE.Vector3 }[] = [];
    const lineGeometries: { geo: THREE.BufferGeometry; line: THREE.Line; nodeIndex: number }[] = [];

    NODES_DATA.forEach((node, i) => {
      const nodeGeo = new THREE.SphereGeometry(0.16, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.9,
        roughness: 0.1,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);

      // Node halo
      const haloGeo = new THREE.SphereGeometry(0.24, 12, 12);
      const haloMat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
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

      // Connecting laser line to core
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.3,
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
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.15,
      });
      const interLine = new THREE.Line(interLineGeo, interLineMat);
      worldGroup.add(interLine);
    }

    // --- PARTICLE FIELD ---
    const particleCount = checkMobile ? 350 : 1100;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x00ff88);
    const c2 = new THREE.Color(0x00f0ff);
    const c3 = new THREE.Color(0x475569);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 22;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;

      const mix = Math.random();
      const col = mix > 0.6 ? c1 : mix > 0.3 ? c2 : c3;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: checkMobile ? 0.04 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x0b1120, 2.5);
    scene.add(ambientLight);

    const coreLightGreen = new THREE.PointLight(0x00ff88, 3, 10);
    coreLightGreen.position.set(0, 0, 0);
    scene.add(coreLightGreen);

    const keyLightCyan = new THREE.DirectionalLight(0x00f0ff, 2);
    keyLightCyan.position.set(5, 5, 5);
    scene.add(keyLightCyan);

    const rimLight = new THREE.DirectionalLight(0x8b5cf6, 1.2);
    rimLight.position.set(-5, -4, -2);
    scene.add(rimLight);

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

      // Smooth dampening for mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Rotate inner & wire core
      innerCoreMesh.rotation.y = elapsedTime * 0.35;
      innerCoreMesh.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2;
      wireCoreMesh.rotation.y = -elapsedTime * 0.2;
      wireCoreMesh.rotation.z = Math.cos(elapsedTime * 0.25) * 0.2;
      corePointsMesh.rotation.y = elapsedTime * 0.15;

      // Pulse core scale subtly
      const pulse = 1 + Math.sin(elapsedTime * 2.2) * 0.035;
      innerCoreMesh.scale.set(pulse, pulse, pulse);

      // Rotate orbital rings
      ringMesh1.rotation.z = elapsedTime * 0.25;
      ringMesh2.rotation.z = -elapsedTime * 0.2;

      // World tilt based on mouse and scroll
      worldGroup.rotation.y = mouseX * 0.35 + elapsedTime * 0.05;
      worldGroup.rotation.x = -mouseY * 0.25 + (scrollY * 0.0004);
      worldGroup.position.y = -scrollY * 0.0015;

      // Camera parallax
      camera.position.x = mouseX * 0.5;
      camera.position.y = mouseY * 0.35;

      // Satellite orbital oscillation & line updates
      const updatedScreenPositions: { [key: string]: { x: number; y: number; visible: boolean } } = {};

      nodeMeshes.forEach((item, idx) => {
        const orbitSpeed = 0.15;
        const currentAngle = item.data.angle + elapsedTime * orbitSpeed;
        const x = Math.cos(currentAngle) * item.data.radius;
        const z = Math.sin(currentAngle) * item.data.radius;
        const y = item.data.height + Math.sin(elapsedTime * 1.5 + idx) * 0.2;

        item.mesh.position.set(x, y, z);

        // Update line geometry
        const lineItem = lineGeometries[idx];
        if (lineItem) {
          const positions = lineItem.geo.attributes.position as THREE.BufferAttribute;
          positions.setXYZ(1, x, y, z);
          positions.needsUpdate = true;
        }

        // Project 3D coordinate to 2D screen coordinates for DOM tags
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

      // Drift particle system
      particleSystem.rotation.y = elapsedTime * 0.02 + mouseX * 0.08;
      particleSystem.rotation.x = mouseY * 0.05;

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
  }, []);

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[700px] flex items-center justify-center select-none overflow-hidden">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Cyber HUD Overlays */}
      <div className="absolute top-4 right-4 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700/60 backdrop-blur-md text-[11px] font-mono-tech text-emerald-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>3D DIGITAL CORE // ONLINE</span>
      </div>

      <div className="absolute bottom-4 left-4 pointer-events-none hidden sm:flex flex-col gap-1 text-[11px] font-mono-tech text-slate-400 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-1.5 text-cyan-400">
          <span className="text-[10px] text-slate-500">SYS:</span>
          <span>NEURAL_TOPOLOGY_V3</span>
        </div>
        <div className="text-[10px] text-slate-400">
          NODES: 6 CONNECTED • RENDER: WEBGL2
        </div>
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
                playCyberBeep(920, 0.08, 'triangle');
              }}
            >
              <div
                className={`relative px-2.5 py-1 rounded-md text-[11px] font-mono-tech font-semibold tracking-wider transition-all duration-300 backdrop-blur-md flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#00FF88]/20 border border-[#00FF88] text-white shadow-[0_0_15px_rgba(0,255,136,0.6)] scale-110'
                    : 'bg-slate-900/70 border border-slate-700/80 text-slate-200 group-hover:border-emerald-400 group-hover:text-emerald-300'
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: node.color }}
                />
                <span>{node.name}</span>

                {/* Subtitle tag on hover */}
                {isSelected && (
                  <span className="text-[9px] text-cyan-300 ml-1 border-l border-white/20 pl-1">
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
