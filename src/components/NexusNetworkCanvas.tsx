import React, { useRef, useEffect, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { ProjectEntity } from '../data/portfolioData';
import { playCyberBeep } from '../utils/audio';

interface NexusCanvasProps {
  interactive?: boolean;
  onNodeSelect?: (entity: ProjectEntity) => void;
  className?: string;
}

export const NexusNetworkCanvas: React.FC<NexusCanvasProps> = ({
  interactive = true,
  onNodeSelect,
  className = 'w-full h-80',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<ProjectEntity | null>(null);
  const [selectedNode, setSelectedNode] = useState<ProjectEntity | null>(null);

  const rawEntities = PORTFOLIO_DATA.nexusDemoGraph.nodes;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.clientWidth || 500);
    let height = (canvas.height = canvas.clientHeight || 320);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initial node positioning in an aesthetic topological layout
    const layoutCoords: { [key: string]: { x: number; y: number } } = {
      e1: { x: 0.28, y: 0.32 }, // Arjun
      e2: { x: 0.68, y: 0.28 }, // Rohan
      e3: { x: 0.48, y: 0.52 }, // BlueArc Logistics
      e4: { x: 0.78, y: 0.68 }, // Warehouse
      e5: { x: 0.22, y: 0.72 }, // Encrypted Drive
      e6: { x: 0.50, y: 0.84 }, // Case
    };

    const nodePositions = rawEntities.map((ent, idx) => {
      const coord = layoutCoords[ent.id] || {
        x: 0.2 + (idx % 3) * 0.3,
        y: 0.3 + Math.floor(idx / 3) * 0.4,
      };
      return {
        ...ent,
        x: coord.x * width,
        y: coord.y * height,
        baseX: coord.x * width,
        baseY: coord.y * height,
        radius: ent.type === 'CASE' ? 14 : 11,
        color:
          ent.type === 'PERSON'
            ? '#00FF88'
            : ent.type === 'ORGANIZATION'
            ? '#00F0FF'
            : ent.type === 'LOCATION'
            ? '#F59E0B'
            : ent.type === 'EVIDENCE'
            ? '#EC4899'
            : '#8B5CF6',
      };
    });

    // Simulated data pulses traveling along edges
    interface Packet {
      from: string;
      to: string;
      progress: number;
      speed: number;
    }

    const packets: Packet[] = [
      { from: 'e1', to: 'e3', progress: 0.1, speed: 0.008 },
      { from: 'e3', to: 'e4', progress: 0.5, speed: 0.007 },
      { from: 'e5', to: 'e1', progress: 0.3, speed: 0.009 },
      { from: 'e2', to: 'e4', progress: 0.8, speed: 0.006 },
      { from: 'e5', to: 'e6', progress: 0.2, speed: 0.007 },
    ];

    let mouseX = -999;
    let mouseY = -999;

    const onMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      let found: ProjectEntity | null = null;
      for (const node of nodePositions) {
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        if (Math.sqrt(dx * dx + dy * dy) < node.radius + 8) {
          found = rawEntities.find((r) => r.id === node.id) || null;
          break;
        }
      }
      setHoveredNode(found);
    };

    const onClick = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      for (const node of nodePositions) {
        const dx = clickX - node.x;
        const dy = clickY - node.y;
        if (Math.sqrt(dx * dx + dy * dy) < node.radius + 8) {
          const ent = rawEntities.find((r) => r.id === node.id) || null;
          setSelectedNode(ent);
          if (ent) {
            playCyberBeep(850, 0.06, 'triangle');
            if (onNodeSelect) onNodeSelect(ent);
          }
          break;
        }
      }
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onClick);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Micro float oscillation for nodes
      nodePositions.forEach((node, i) => {
        node.x = node.baseX + Math.sin(time + i) * 3;
        node.y = node.baseY + Math.cos(time + i * 1.3) * 3;
      });

      const currentActive = hoveredNode || selectedNode;

      // 1. Draw Edges
      nodePositions.forEach((node) => {
        node.connections.forEach((targetId) => {
          const target = nodePositions.find((n) => n.id === targetId);
          if (!target || node.id > target.id) return; // Prevent double drawing

          const isConnectedToActive =
            currentActive &&
            (currentActive.id === node.id ||
              currentActive.id === target.id ||
              (currentActive.connections.includes(node.id) &&
                currentActive.connections.includes(target.id)));

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);

          if (isConnectedToActive) {
            ctx.strokeStyle = '#00FF88';
            ctx.lineWidth = 2.5;
            ctx.shadowColor = '#00FF88';
            ctx.shadowBlur = 12;
          } else {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 1;
            ctx.shadowBlur = 0;
          }
          ctx.stroke();
        });
      });

      // 2. Draw Moving Data Packets along lines
      packets.forEach((pkt) => {
        pkt.progress += pkt.speed;
        if (pkt.progress > 1) pkt.progress = 0;

        const fromNode = nodePositions.find((n) => n.id === pkt.from);
        const toNode = nodePositions.find((n) => n.id === pkt.to);
        if (!fromNode || !toNode) return;

        const px = fromNode.x + (toNode.x - fromNode.x) * pkt.progress;
        const py = fromNode.y + (toNode.y - fromNode.y) * pkt.progress;

        ctx.fillStyle = '#00F0FF';
        ctx.shadowColor = '#00F0FF';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Nodes
      nodePositions.forEach((node) => {
        const isSelf = currentActive && currentActive.id === node.id;
        const isNeighbor = currentActive && currentActive.connections.includes(node.id);
        const isDimmed = currentActive && !isSelf && !isNeighbor;

        ctx.save();
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isSelf ? 22 : isNeighbor ? 12 : 6;

        // Outer pulsing ring if active
        if (isSelf) {
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 6 + Math.sin(time * 4) * 2, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Main node body
        ctx.fillStyle = isDimmed ? 'rgba(30, 41, 59, 0.5)' : node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Node Label
        ctx.font = isSelf ? 'bold 11px "Space Grotesk", sans-serif' : '10px "JetBrains Mono", monospace';
        ctx.fillStyle = isDimmed ? 'rgba(148, 163, 184, 0.4)' : isSelf ? '#FFFFFF' : '#CBD5E1';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y + node.radius + 14);

        // Small Type label under name
        ctx.font = '8px "JetBrains Mono", monospace';
        ctx.fillStyle = isDimmed ? 'rgba(100, 116, 139, 0.3)' : node.color;
        ctx.fillText(node.type, node.x, node.y + node.radius + 24);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('click', onClick);
    };
  }, [interactive, onNodeSelect, rawEntities, hoveredNode, selectedNode]);

  const activeEntity = hoveredNode || selectedNode;

  return (
    <div className={`relative ${className} select-none`}>
      <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />

      {/* Cyber HUD Info Tooltip overlay when hovering a node */}
      {activeEntity && (
        <div className="absolute top-3 left-3 max-w-[260px] p-3 rounded-xl bg-slate-950/90 border border-emerald-500/50 backdrop-blur-xl shadow-[0_0_20px_rgba(0,255,136,0.2)] pointer-events-none transition-all duration-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-mono-tech uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              {activeEntity.type}
            </span>
            <span className="text-[9px] font-mono-tech text-slate-400">
              {activeEntity.connections.length} LINKS
            </span>
          </div>

          <h4 className="font-heading font-bold text-sm text-white mb-1">
            {activeEntity.name}
          </h4>

          <p className="text-[11px] text-slate-300 font-mono-tech leading-snug">
            {activeEntity.details}
          </p>

          <div className="mt-2 pt-1.5 border-t border-slate-800 text-[9px] font-mono-tech text-cyan-400 flex items-center justify-between">
            <span>AI HYPERGRAPH ENTITY</span>
            <span>CLICK TO DRILL DOWN</span>
          </div>
        </div>
      )}

      {/* Legend badge */}
      <div className="absolute bottom-2 right-3 hidden sm:flex items-center gap-2 text-[9px] font-mono-tech text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800 pointer-events-none">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" /> Person
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" /> Org
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899]" /> Evidence
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" /> Case
        </span>
      </div>
    </div>
  );
};
