export default function NodeGraph() {
  // Organic neural scatter — 4 cortical regions + bridging hub/spike nodes
  const nodes: Array<{ pos: [number, number]; r: number; type: "small" | "medium" | "hub" | "spike" }> = [
    // Region A — top-left cluster
    { pos: [60,  45],  r: 2,   type: "small"  },
    { pos: [140, 30],  r: 3.5, type: "medium" },
    { pos: [95,  100], r: 3.5, type: "medium" },
    { pos: [180, 75],  r: 2,   type: "small"  },
    { pos: [50,  145], r: 2,   type: "small"  },
    // Spike hub — bridges A / B / C
    { pos: [310, 95],  r: 7,   type: "spike"  },
    // Region B — top-right cluster
    { pos: [420, 35],  r: 2,   type: "small"  },
    { pos: [520, 65],  r: 3.5, type: "medium" },
    { pos: [480, 125], r: 3.5, type: "medium" },
    { pos: [590, 90],  r: 2,   type: "small"  },
    { pos: [660, 50],  r: 2,   type: "small"  },
    // Region C — centre
    { pos: [240, 170], r: 3.5, type: "medium" },
    { pos: [320, 145], r: 3.5, type: "medium" },
    { pos: [200, 235], r: 3.5, type: "medium" },
    { pos: [295, 265], r: 2,   type: "small"  },
    { pos: [380, 215], r: 2,   type: "small"  },
    // Spike hub — bridges B / C / D
    { pos: [450, 190], r: 7,   type: "spike"  },
    // Bridge hub — A / C
    { pos: [155, 220], r: 5.5, type: "hub"    },
    // Region D — bottom spread
    { pos: [130, 315], r: 2,   type: "small"  },
    { pos: [260, 345], r: 2,   type: "small"  },
    { pos: [420, 305], r: 3.5, type: "medium" },
    { pos: [540, 335], r: 2,   type: "small"  },
    { pos: [680, 315], r: 2,   type: "small"  },
    { pos: [760, 270], r: 2,   type: "small"  },
    // Hub — bridges C / D + right scatter
    { pos: [580, 250], r: 5.5, type: "hub"    },
    // Right scatter
    { pos: [720, 155], r: 2,   type: "small"  },
    { pos: [700, 235], r: 2,   type: "small"  },
    // Far left
    { pos: [30,  275], r: 2,   type: "small"  },
  ];

  // [nodeA, nodeB, opacity]
  const edges: [number, number, number][] = [
    // Region A internal
    [0,1,0.25],[0,2,0.25],[1,3,0.2],[2,4,0.2],[1,2,0.3],
    // Spike 5 bridges A→B,C
    [0,5,0.45],[2,5,0.5],[1,5,0.4],[3,5,0.35],
    [5,7,0.5],[5,8,0.55],[5,11,0.45],[5,12,0.5],
    // Region B internal
    [6,7,0.25],[7,8,0.3],[7,9,0.25],[8,9,0.25],[9,10,0.2],[6,8,0.2],
    // Spike 16 bridges B→C,D
    [8,16,0.5],[9,16,0.45],[12,16,0.5],[15,16,0.45],
    [16,20,0.5],[16,24,0.55],
    // Region C internal
    [11,12,0.3],[11,13,0.3],[12,15,0.25],[13,14,0.2],
    [13,17,0.35],[14,15,0.2],[11,17,0.3],
    // Hub 17 (A–C bridge)
    [4,17,0.35],[17,18,0.35],[2,17,0.3],
    // Hub 24 (C–D + right)
    [15,24,0.4],[20,24,0.4],[22,24,0.35],[25,24,0.35],[26,24,0.3],
    // Region D internal
    [18,19,0.2],[19,20,0.25],[20,21,0.25],[21,22,0.2],[22,23,0.2],
    // Right scatter
    [9,25,0.2],[25,26,0.2],[26,22,0.2],
    // Far left
    [27,18,0.2],[4,27,0.2],
    // Cross-region
    [3,7,0.2],[13,16,0.3],
  ];

  return (
    <svg
      viewBox="0 0 790 390"
      className="absolute inset-0 w-full h-full pointer-events-none text-cyan-400"
      aria-hidden="true"
      style={{ opacity: 0.45 }}
    >
      <defs>
        <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {edges.map(([a, b, opacity], i) => (
        <line
          key={i}
          x1={nodes[a].pos[0]} y1={nodes[a].pos[1]}
          x2={nodes[b].pos[0]} y2={nodes[b].pos[1]}
          stroke="currentColor"
          strokeWidth="0.8"
          opacity={opacity}
        />
      ))}

      {/* Small + medium nodes — no bloom filter */}
      {nodes.map((node, i) => {
        if (node.type === "hub" || node.type === "spike") return null;
        const baseOpacity = node.type === "medium" ? 0.22 : 0.10;
        const duration   = 2.8 + (i % 5) * 0.4;
        return (
          <circle
            key={i}
            cx={node.pos[0]}
            cy={node.pos[1]}
            r={node.r}
            fill="currentColor"
            style={{
              animation: `pulse-node ${duration}s ease-in-out infinite`,
              animationDelay: `${(i * 0.19).toFixed(2)}s`,
              opacity: baseOpacity,
            }}
          />
        );
      })}

      {/* Hub + spike nodes — bloom glow filter */}
      {nodes.map((node, i) => {
        if (node.type !== "hub" && node.type !== "spike") return null;
        const isSpike = node.type === "spike";
        return (
          <circle
            key={`h${i}`}
            cx={node.pos[0]}
            cy={node.pos[1]}
            r={node.r}
            fill="currentColor"
            filter="url(#glow)"
            style={{
              animation: `${isSpike ? "pulse-spike" : "pulse-node"} ${isSpike ? "1.9" : "2.6"}s ease-in-out infinite`,
              animationDelay: `${(i * 0.31).toFixed(2)}s`,
            }}
          />
        );
      })}
    </svg>
  );
}
