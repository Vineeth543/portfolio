import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FlowStageComponent, FlowStageData } from '../../../components/flow-stage/flow-stage';
import { HeroStat, HeroStatComponent } from '../../../components/hero-stat/hero-stat';
import {
  HighlightCardComponent,
  HighlightCardData,
} from '../../../components/highlight-card/highlight-card';
import { MetricCardComponent, MetricCardData } from '../../../components/metric-card/metric-card';
import { SkillBadge, SkillBadgeComponent } from '../../../components/skill-badge/skill-badge';
import { ScrollReveal } from '../../../shared/scroll-reveal.directive';

interface Capability {
  title: string;
  desc: string;
}

interface Particle {
  left: string;
  size: string;
  duration: string;
  delay: string;
}

interface Candle {
  x: number;
  bodyY: number;
  bodyHeight: number;
  wickY1: number;
  wickY2: number;
  up: boolean;
}

// Hand-authored coherent OHLC series (each open equals the previous close):
// an ascending staircase with three red pullbacks. Fixed pattern, never
// recalculated in the template.
const CANDLES: Candle[] = [
  { x: 0, bodyY: 330, bodyHeight: 30, wickY1: 322, wickY2: 368, up: true },
  { x: 40, bodyY: 330, bodyHeight: 14, wickY1: 324, wickY2: 352, up: false },
  { x: 80, bodyY: 300, bodyHeight: 44, wickY1: 290, wickY2: 350, up: true },
  { x: 120, bodyY: 272, bodyHeight: 28, wickY1: 262, wickY2: 306, up: true },
  { x: 160, bodyY: 272, bodyHeight: 16, wickY1: 264, wickY2: 296, up: false },
  { x: 200, bodyY: 238, bodyHeight: 50, wickY1: 228, wickY2: 294, up: true },
  { x: 240, bodyY: 218, bodyHeight: 20, wickY1: 206, wickY2: 244, up: true },
  { x: 280, bodyY: 218, bodyHeight: 18, wickY1: 210, wickY2: 244, up: false },
  { x: 320, bodyY: 186, bodyHeight: 50, wickY1: 176, wickY2: 242, up: true },
  { x: 360, bodyY: 162, bodyHeight: 24, wickY1: 150, wickY2: 192, up: true },
  { x: 400, bodyY: 162, bodyHeight: 14, wickY1: 154, wickY2: 184, up: false },
  { x: 440, bodyY: 122, bodyHeight: 54, wickY1: 112, wickY2: 182, up: true },
  { x: 480, bodyY: 96, bodyHeight: 26, wickY1: 84, wickY2: 128, up: true },
  { x: 520, bodyY: 60, bodyHeight: 36, wickY1: 46, wickY2: 104, up: true },
];

@Component({
  selector: 'app-garuda',
  imports: [
    RouterLink,
    ScrollReveal,
    HeroStatComponent,
    MetricCardComponent,
    HighlightCardComponent,
    FlowStageComponent,
    SkillBadgeComponent,
  ],
  templateUrl: './garuda.html',
  styleUrl: './garuda.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Garuda {
  protected readonly candles: Candle[] = CANDLES;

  protected readonly particles: Particle[] = Array.from({ length: 14 }, (_, i) => ({
    left: `${i * 7.2 + 3}%`,
    size: `${3 + (i % 3) * 2}px`,
    duration: `${8 + (i % 5) * 2}s`,
    delay: `${i * 0.6}s`,
  }));

  protected readonly heroStats: HeroStat[] = [
    { value: '~1,500/sec', label: 'Binary packets decoded' },
    { value: '<20ms', label: 'Fuzzy symbol search' },
    { value: '<€4/mo', label: 'Total hosting cost' },
    { value: '<20%', label: 'CPU under full load' },
  ];

  protected readonly metrics: MetricCardData[] = [
    {
      display: '~1,500',
      label: 'Packets / second',
      sub: 'Live NSE & MCX binary ticks decoded in pure TypeScript via DataView',
    },
    {
      display: '<20ms',
      label: 'Symbol search latency',
      sub: 'Across a 100,000-row database using pg_trgm trigram indexing',
    },
    {
      display: '<€4',
      label: 'Monthly hosting cost',
      sub: 'Self-hosted on a single small Hetzner CX22 VM',
    },
    {
      display: '<500MB',
      label: 'RAM under full load',
      sub: 'Alongside under 20% CPU utilization',
    },
  ];

  protected readonly highlights: HighlightCardData[] = [
    {
      tag: 'Client',
      title: 'Real-Time Desktop App',
      desc: 'Built with Angular 21 + Electron for a native, always-on analytics experience across platforms.',
    },
    {
      tag: 'Ingestion',
      title: 'High-Throughput Market Data',
      desc: 'Ingests live NSE & MCX tick data via WebSocket streams, decoding ~1,500 binary packets/sec in pure TypeScript with DataView — no external parsing libraries.',
    },
    {
      tag: 'Backend',
      title: 'Custom High-Performance Backend',
      desc: 'A lightweight monolith on Bun + Fastify v5, chosen for throughput and low overhead.',
    },
    {
      tag: 'Storage',
      title: 'Time-Series Storage',
      desc: 'TimescaleDB (built on PostgreSQL 17) with efficient batch-flush writes for high-volume tick data.',
    },
    {
      tag: 'Visualization',
      title: 'Seamless Charting',
      desc: 'Custom TradingView Charting Library integration, merging historical and live data with no visible gaps on reconnect or refresh.',
    },
    {
      tag: 'Search',
      title: 'Sub-20ms Fuzzy Search',
      desc: 'Fast fuzzy symbol search across 100,000 rows, combining PostgreSQL pg_trgm trigram indexing with prefix ILIKE ranking.',
    },
    {
      tag: 'Security',
      title: 'Zero-Trust-Inspired Auth',
      desc: 'Argon2id password hashing, short-lived Ed25519-signed JWTs, HttpOnly refresh cookies, OTP-gated actions, and replay-based session invalidation.',
    },
    {
      tag: 'Resilience',
      title: 'Graceful Degradation',
      desc: 'A write-ahead-log-style fallback prevents data loss during database outages; stateless reconnection eliminates chart gaps after network drops.',
    },
    {
      tag: 'Cost',
      title: 'Extreme Cost Efficiency',
      desc: 'Self-hosted for under €4/month on a single small Hetzner VM (2 vCPU / 4GB RAM), under 20% CPU and 500MB RAM at full load.',
    },
  ];

  protected readonly flowStages: FlowStageData[] = [
    { title: 'Market Data Source', sub: 'NSE & MCX', kind: 'edge' },
    { title: 'WebSocket Ingestion', sub: 'Live tick stream', kind: 'normal' },
    { title: 'Binary Decoder', sub: 'TypeScript DataView', kind: 'normal' },
    { title: 'TimescaleDB', sub: 'Hot + durable storage', kind: 'normal' },
    { title: 'Angular + Electron Client', sub: 'TradingView charts', kind: 'edge' },
  ];

  protected readonly capabilities: Capability[] = [
    {
      title: 'System design thinking',
      desc: 'Every component — ingestion, storage, API, client — was chosen and composed deliberately, not defaulted into.',
    },
    {
      title: 'Scalability',
      desc: 'A time-series storage split keeps hot reads fast while durably persisting everything, without re-architecting as data grows.',
    },
    {
      title: 'Data visualization',
      desc: 'Merging historical and live streams into one gap-free chart is a genuinely hard rendering and state problem, solved end to end.',
    },
    {
      title: 'Innovation under constraint',
      desc: 'Sub-20ms search and sub-millisecond reads, delivered on a €4/month VM — efficiency as a design goal, not an afterthought.',
    },
    {
      title: 'Product vision',
      desc: 'Garuda exists because I wanted to see market structure clearly in real time — the platform is built around that single, clear purpose.',
    },
  ];

  protected readonly techBadges: SkillBadge[] = [
    'Angular 21',
    'Electron',
    'TypeScript',
    'RxJS',
    'Tailwind CSS',
    'Bun',
    'Fastify v5',
    'TimescaleDB (PostgreSQL 17)',
    'WebSockets',
    'TradingView Charting Library',
    'pg_trgm',
    'Caddy',
    'Hetzner',
    'Argon2id',
    'Ed25519 JWT',
  ].map((label) => ({ label, size: 'lg' }));
}
