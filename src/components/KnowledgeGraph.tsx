"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import type { Publication } from "@/types";
import PublicationCard from "./PublicationCard";

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), { ssr: false });

// ─── Graph data ───────────────────────────────────────────────────────────────

const AREA_NODES = [
  { id: "pa", type: "area", label: "Pedagogical Agents\n& Virtual Humans",  color: "#14b8a6", size: 22 },
  { id: "ml", type: "area", label: "Multimedia Learning\n& Cognitive Science", color: "#14b8a6", size: 22 },
  { id: "ai", type: "area", label: "AI, Sensing &\nLearning Analytics",     color: "#14b8a6", size: 22 },
];

const PAPER_IDS = [
  "W2100242321", "W2046145495", "W2589724482", "W4402544340",
  "W2603090530", "W2794691683", "W4207047326", "W2945435832",
  "W3080112302", "W4298005498", "W2915641965", "W7133340772",
];

const CONCEPT_NODES = [
  { id: "c1", type: "concept", label: "Meta-Analysis",      color: "#67e8f9", size: 3 },
  { id: "c2", type: "concept", label: "Cognitive Load",     color: "#67e8f9", size: 3 },
  { id: "c3", type: "concept", label: "Virtual Agents",     color: "#67e8f9", size: 3 },
  { id: "c4", type: "concept", label: "Online Learning",    color: "#67e8f9", size: 3 },
  { id: "c5", type: "concept", label: "Learning Analytics", color: "#67e8f9", size: 3 },
];

const LINKS = [
  { source: "pa", target: "W2100242321", type: "ap" },
  { source: "pa", target: "W2046145495", type: "ap" },
  { source: "pa", target: "W2589724482", type: "ap" },
  { source: "pa", target: "W4402544340", type: "ap" },
  { source: "ml", target: "W2603090530", type: "ap" },
  { source: "ml", target: "W2794691683", type: "ap" },
  { source: "ml", target: "W4207047326", type: "ap" },
  { source: "ml", target: "W2945435832", type: "ap" },
  { source: "ai", target: "W3080112302", type: "ap" },
  { source: "ai", target: "W4298005498", type: "ap" },
  { source: "ai", target: "W2915641965", type: "ap" },
  { source: "ai", target: "W7133340772", type: "ap" },
  { source: "pa", target: "ml", type: "aa" },
  { source: "ml", target: "ai", type: "aa" },
  { source: "pa", target: "ai", type: "aa" },
  { source: "pa", target: "c1", type: "cc" },
  { source: "ml", target: "c1", type: "cc" },
  { source: "ml", target: "c2", type: "cc" },
  { source: "ai", target: "c2", type: "cc" },
  { source: "pa", target: "c3", type: "cc" },
  { source: "ai", target: "c3", type: "cc" },
  { source: "ai", target: "c4", type: "cc" },
  { source: "ai", target: "c5", type: "cc" },
];

// ─── Glow sprite factory ──────────────────────────────────────────────────────

function makeGlowSprite(hexColor: string, spriteSize: number): THREE.Sprite {
  const canvas = document.createElement("canvas");
  const res = 128;
  canvas.width = res;
  canvas.height = res;
  const ctx = canvas.getContext("2d")!;
  const cx = res / 2;
  const gradient = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
  gradient.addColorStop(0,   hexColor + "ff");
  gradient.addColorStop(0.3, hexColor + "99");
  gradient.addColorStop(0.7, hexColor + "33");
  gradient.addColorStop(1,   hexColor + "00");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, res, res);
  const texture = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(spriteSize, spriteSize, 1);
  return sprite;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  publications: Publication[];
}

export default function KnowledgeGraph({ publications }: Props) {
  const router = useRouter();
  const graphRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  const [graphWidth, setGraphWidth] = useState(0);
  const autoRotateStarted = useRef(false);

  const pubMap = Object.fromEntries(publications.map(p => [p.id, p]));

  const graphData = {
    nodes: [
      ...AREA_NODES,
      ...PAPER_IDS.map(id => ({
        id,
        type: "paper",
        label: (pubMap[id]?.title ?? id).slice(0, 60),
        color: "#f59e0b",
        size: 5,
      })),
      ...CONCEPT_NODES,
    ],
    links: LINKS.map(l => ({ ...l })),
  };

  // Measure container width responsively
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      setGraphWidth(entries[0].contentRect.width);
    });
    ro.observe(containerRef.current);
    setGraphWidth(containerRef.current.offsetWidth);
    return () => ro.disconnect();
  }, []);

  // Configure forces + camera after simulation warms up
  const handleEngineStop = useCallback(() => {
    if (!graphRef.current || autoRotateStarted.current) return;
    autoRotateStarted.current = true;

    const fg = graphRef.current;

    // Tilt camera slightly upward for a dramatic angle
    fg.cameraPosition({ x: 0, y: 80, z: 320 }, { x: 0, y: 0, z: 0 }, 800);

    // Auto-rotate via OrbitControls
    const controls = fg.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
    }
  }, []);

  // Reconfigure forces once on first render
  useEffect(() => {
    const t = setTimeout(() => {
      if (!graphRef.current) return;
      const fg = graphRef.current;
      fg.d3Force("charge")?.strength((n: any) =>
        n.type === "area" ? -350 : n.type === "paper" ? -80 : -30
      );
      fg.d3Force("link")?.distance((l: any) =>
        l.type === "aa" ? 260 : l.type === "ap" ? 90 : 70
      );
      fg.d3ReheatSimulation();
    }, 400);
    return () => clearTimeout(t);
  }, [graphWidth]); // re-run once after graph renders

  const nodeThreeObject = useCallback((node: any) => {
    const group = new THREE.Group();

    if (node.type === "area") {
      // Octahedron: translucent fill + bright wireframe edges + large glow
      const geo = new THREE.OctahedronGeometry(11, 0);
      const fill = new THREE.Mesh(
        geo,
        new THREE.MeshBasicMaterial({ color: 0x14b8a6, transparent: true, opacity: 0.18, side: THREE.DoubleSide })
      );
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({ color: 0x2dd4bf })
      );
      group.add(fill, edges, makeGlowSprite("#14b8a6", 88));

    } else if (node.type === "paper") {
      // Solid amber sphere + warm glow
      const geo = new THREE.SphereGeometry(4, 14, 14);
      const mesh = new THREE.Mesh(
        geo,
        new THREE.MeshBasicMaterial({ color: 0xf59e0b })
      );
      group.add(mesh, makeGlowSprite("#f59e0b", 34));

    } else {
      // Concept: tiny wireframe diamond (no fill) + faint cyan glow
      const geo = new THREE.OctahedronGeometry(2.5, 0);
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({ color: 0x67e8f9 })
      );
      group.add(edges, makeGlowSprite("#67e8f9", 18));
    }

    return group;
  }, []);

  const handleNodeClick = useCallback((node: any) => {
    if (node.type === "area") {
      router.push("/research/");
    } else if (node.type === "paper") {
      const pub = pubMap[node.id];
      if (pub) setSelectedPub(prev => prev?.id === node.id ? null : pub);
    }
  }, [pubMap, router]);

  const linkColor = useCallback((l: any) =>
    l.type === "cc" ? "#67e8f9" : l.type === "aa" ? "#2dd4bf" : "#0d9488"
  , []);

  const linkWidth = useCallback((l: any) =>
    l.type === "aa" ? 1.5 : l.type === "ap" ? 0.8 : 0.5
  , []);

  const linkParticles = useCallback((l: any) =>
    l.type === "aa" ? 3 : l.type === "ap" ? 1 : 0
  , []);

  const linkParticleColor = useCallback((l: any) =>
    l.type === "aa" ? "#2dd4bf" : "#14b8a6"
  , []);

  return (
    <section
      className="bg-[#070d0c] py-16"
      style={{ borderTop: "1px solid rgba(13,148,136,0.2)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-3xl text-white tracking-tight mb-1">
              Research Landscape
            </h2>
            <p className="text-sm text-cyan-300/45">
              Drag to rotate · Scroll to zoom · Click a node to explore
            </p>
          </div>
          <a
            href="/publications/"
            className="text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors shrink-0 ml-4"
          >
            All {publications.length} papers →
          </a>
        </div>

        <div className="flex gap-4 items-start">
          {/* ── 3D Graph ── */}
          <div
            ref={containerRef}
            className="flex-1 min-w-0 rounded-xl overflow-hidden"
            style={{
              height: "480px",
              background: "#050b09",
              border: "1px solid rgba(13,148,136,0.2)",
              boxShadow: "inset 0 0 80px rgba(13,148,136,0.04)",
            }}
          >
            {graphWidth > 0 && (
              <ForceGraph3D
                ref={graphRef}
                graphData={graphData}
                width={graphWidth}
                height={480}
                backgroundColor="#050b09"
                showNavInfo={false}
                nodeColor={(n: any) => n.color}
                nodeVal={(n: any) => n.size}
                nodeLabel={(n: any) => n.label}
                nodeOpacity={0.92}
                nodeResolution={16}
                nodeThreeObject={nodeThreeObject}
                nodeThreeObjectExtend={false}
                linkColor={linkColor}
                linkWidth={linkWidth}
                linkOpacity={0.45}
                linkDirectionalParticles={linkParticles}
                linkDirectionalParticleWidth={1.8}
                linkDirectionalParticleColor={linkParticleColor}
                linkDirectionalParticleSpeed={0.005}
                d3AlphaDecay={0.018}
                d3VelocityDecay={0.3}
                onEngineStop={handleEngineStop}
                onNodeClick={handleNodeClick}
                enableNodeDrag={true}
              />
            )}
          </div>

          {/* ── Side panel ── */}
          <aside
            className="shrink-0 overflow-hidden transition-all duration-300 ease-out"
            style={{ width: selectedPub ? "288px" : "0px", opacity: selectedPub ? 1 : 0 }}
          >
            {selectedPub && (
              <div className="w-72">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-teal-400/70">
                    Selected Paper
                  </p>
                  <button
                    onClick={() => setSelectedPub(null)}
                    className="w-6 h-6 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors text-base leading-none"
                    aria-label="Close panel"
                  >
                    ×
                  </button>
                </div>
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(13,148,136,0.3), 0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(13,148,136,0.08)",
                  }}
                >
                  <PublicationCard pub={selectedPub} />
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-5 mt-4 px-1">
          <div className="flex items-center gap-2">
            {/* Octahedron icon for area */}
            <svg width="14" height="14" viewBox="0 0 14 14" className="shrink-0">
              <polygon points="7,1 13,7 7,13 1,7" fill="rgba(20,184,166,0.2)" stroke="#2dd4bf" strokeWidth="1.2" />
            </svg>
            <span className="text-xs text-white/35">Research area — click to explore</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: "#f59e0b", boxShadow: "0 0 6px rgba(245,158,11,0.8)" }}
            />
            <span className="text-xs text-white/35">Key paper — click to preview</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Small diamond for concept */}
            <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0">
              <polygon points="5,0 10,5 5,10 0,5" fill="none" stroke="#67e8f9" strokeWidth="1.2" />
            </svg>
            <span className="text-xs text-white/35">Concept bridge</span>
          </div>
        </div>
      </div>

      {/* Mobile bottom sheet */}
      {selectedPub && (
        <div
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4"
          style={{
            background: "#0a1210",
            borderTop: "1px solid rgba(13,148,136,0.3)",
            boxShadow: "0 -20px 60px rgba(0,0,0,0.6)",
            animation: "fade-up 0.25s ease-out both",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-400/70">
              Selected Paper
            </p>
            <button
              onClick={() => setSelectedPub(null)}
              className="w-6 h-6 flex items-center justify-center rounded-full text-white/40 hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <PublicationCard pub={selectedPub} />
        </div>
      )}
    </section>
  );
}
