import type { CSSProperties } from "react";

/**
 * One bespoke motif per service — PROJECT_BRIEF.md §4 calls for a micro-animation
 * tied to what each service actually does, explicitly "no shared generic icon set".
 *
 * All of these are static at rest and animate only while their card is hovered
 * or keyboard-focused (see the `.service-card:hover` rules in globals.css), so
 * ten of them on screen cost nothing until the user engages with one.
 */

const VIEW_BOX = "0 0 72 72";

type StaggerStyle = CSSProperties & Record<"--i", string>;
const stagger = (i: number): StaggerStyle => ({ "--i": `${i}` });

/** Racks filling up: units stacked, status LEDs cascading down the stack. */
function InfrastructureVisual() {
  return (
    <svg viewBox={VIEW_BOX} className="service-visual" fill="none" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={13} y={17 + i * 14} width={46} height={11} rx={2.5} className="svc-structure" />
          <circle cx={19} cy={22.5 + i * 14} r={1.7} className="svc-fill svc-infra__led" style={stagger(i * 2)} />
          <circle cx={25} cy={22.5 + i * 14} r={1.7} className="svc-fill svc-infra__led" style={stagger(i * 2 + 1)} />
          <line x1={32} y1={22.5 + i * 14} x2={53} y2={22.5 + i * 14} className="svc-structure-soft" />
        </g>
      ))}
    </svg>
  );
}

/** Workloads lifting off-premise into the cloud. */
function CloudVisual() {
  return (
    <svg viewBox={VIEW_BOX} className="service-visual" fill="none" aria-hidden="true">
      <path
        d="M22 32a9 9 0 0 1 17.4-3.2A7.5 7.5 0 0 1 51 33.4 6.3 6.3 0 0 1 49.5 46H24a7 7 0 0 1-2-13.7Z"
        className="svc-stroke"
      />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={24 + i * 12}
          y={54}
          width={8}
          height={8}
          rx={1.5}
          className="svc-fill svc-cloud__block"
          style={stagger(i)}
        />
      ))}
    </svg>
  );
}

/** Packets arriving from the left and being turned away at the shield. */
function CyberSecurityVisual() {
  return (
    <svg viewBox={VIEW_BOX} className="service-visual" fill="none" aria-hidden="true">
      <path
        d="M46 17 60 22v13c0 9.4-6 16.6-14 19.6-8-3-14-10.2-14-19.6V22Z"
        className="svc-stroke svc-cyber__shield"
      />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={6}
          y={26 + i * 9}
          width={9}
          height={3}
          rx={1.5}
          className="svc-fill svc-cyber__packet"
          style={stagger(i)}
        />
      ))}
    </svg>
  );
}

/** Two endpoints trading a call across a link. */
function UnifiedCommunicationsVisual() {
  return (
    <svg viewBox={VIEW_BOX} className="service-visual" fill="none" aria-hidden="true">
      <rect x={9} y={26} width={16} height={20} rx={3} className="svc-structure" />
      <rect x={47} y={26} width={16} height={20} rx={3} className="svc-structure" />
      <path d="M25 36q11-13 22 0" className="svc-structure-soft" />
      <circle r={2.6} className="svc-fill svc-uc__pulse">
        <animateMotion dur="1.6s" repeatCount="indefinite" path="M25 36q11-13 22 0" />
      </circle>
    </svg>
  );
}

/** Scattered panes snapping into an organised workspace. */
function ModernWorkspaceVisual() {
  const panes = [
    { x: 12, y: 14, dx: -4, dy: -3 },
    { x: 40, y: 14, dx: 5, dy: -4 },
    { x: 12, y: 42, dx: -5, dy: 4 },
    { x: 40, y: 42, dx: 4, dy: 5 },
  ];
  return (
    <svg viewBox={VIEW_BOX} className="service-visual" fill="none" aria-hidden="true">
      {panes.map((pane, i) => {
        const style: CSSProperties & Record<"--dx" | "--dy" | "--i", string> = {
          "--dx": `${pane.dx}`,
          "--dy": `${pane.dy}`,
          "--i": `${i}`,
        };
        return (
          <rect
            key={i}
            x={pane.x}
            y={pane.y}
            width={20}
            height={16}
            rx={2.5}
            className="svc-stroke svc-workspace__pane"
            style={style}
          />
        );
      })}
    </svg>
  );
}

/** Sound radiating from a room display. */
function AudioVisualVisual() {
  return (
    <svg viewBox={VIEW_BOX} className="service-visual" fill="none" aria-hidden="true">
      <rect x={8} y={22} width={22} height={28} rx={3} className="svc-structure" />
      <line x1={19} y1={50} x2={19} y2={57} className="svc-structure" />
      <line x1={12} y1={57} x2={26} y2={57} className="svc-structure" />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M36 ${28 - i * 5}a${10 + i * 8} ${10 + i * 8} 0 0 1 0 ${16 + i * 16}`}
          className="svc-stroke svc-av__wave"
          style={stagger(i)}
        />
      ))}
    </svg>
  );
}

/**
 * Deliberately not a neural network. This module is a roadmap entry with no
 * audited capabilities, so the motif is an empty dashed frame with a waiting
 * caret — a space reserved rather than a capability implied. It also keeps AI
 * visually distinct from the Enterprise Networking constellation.
 */
function AiVisual() {
  return (
    <svg viewBox={VIEW_BOX} className="service-visual" fill="none" aria-hidden="true">
      <rect x={9} y={15} width={54} height={42} rx={5} className="svc-stroke svc-ai__frame" />
      <line x1={21} y1={29} x2={44} y2={29} className="svc-structure-soft" />
      <line x1={21} y1={37} x2={37} y2={37} className="svc-structure-soft" />
      <rect x={21} y={43} width={2.6} height={9} rx={1.3} className="svc-fill svc-ai__caret" />
    </svg>
  );
}

/** A monitored heartbeat sweeping across the estate. */
function ManagedServicesVisual() {
  return (
    <svg viewBox={VIEW_BOX} className="service-visual" fill="none" aria-hidden="true">
      <rect x={7} y={18} width={58} height={36} rx={4} className="svc-structure" />
      <path
        d="M13 36h9l4-9 6 18 5-11 4 5h18"
        className="svc-stroke svc-managed__trace"
      />
    </svg>
  );
}

/** The genuine four-step methodology from the audit, lighting in sequence. */
function ConsultingVisual() {
  return (
    <svg viewBox={VIEW_BOX} className="service-visual" fill="none" aria-hidden="true">
      <line x1={12} y1={36} x2={60} y2={36} className="svc-structure-soft" />
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={12 + i * 16}
          cy={36}
          r={5}
          className="svc-stroke svc-consulting__step"
          style={stagger(i)}
        />
      ))}
    </svg>
  );
}

/** Nodes discovering each other and the links drawing themselves in. */
function EnterpriseNetworkingVisual() {
  const nodes = [
    { cx: 36, cy: 36, r: 4.5 },
    { cx: 14, cy: 20, r: 3 },
    { cx: 58, cy: 22, r: 3 },
    { cx: 16, cy: 54, r: 3 },
    { cx: 56, cy: 52, r: 3 },
  ];
  return (
    <svg viewBox={VIEW_BOX} className="service-visual" fill="none" aria-hidden="true">
      <g className="svc-net__links">
        {nodes.slice(1).map((node, i) => (
          <line
            key={i}
            x1={36}
            y1={36}
            x2={node.cx}
            y2={node.cy}
            style={stagger(i)}
          />
        ))}
      </g>
      {nodes.map((node, i) => (
        <circle
          key={i}
          cx={node.cx}
          cy={node.cy}
          r={node.r}
          className="svc-fill svc-net__node"
          style={stagger(i)}
        />
      ))}
    </svg>
  );
}

const VISUALS: Record<string, () => React.ReactElement> = {
  infrastructure: InfrastructureVisual,
  "cloud-computing": CloudVisual,
  "cyber-security": CyberSecurityVisual,
  "unified-communications": UnifiedCommunicationsVisual,
  "modern-workspace": ModernWorkspaceVisual,
  "audio-video": AudioVisualVisual,
  ai: AiVisual,
  "managed-services": ManagedServicesVisual,
  consulting: ConsultingVisual,
  "enterprise-networking": EnterpriseNetworkingVisual,
};

export function ServiceVisual({ slug }: { slug: string }) {
  const Visual = VISUALS[slug];
  return Visual ? <Visual /> : null;
}
