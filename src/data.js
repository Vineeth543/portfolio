// Profile data — read by App and AskResume
window.PROFILE = {
  name: "Vineeth Serigar",
  handle: "vineeth543",
  role: "Frontend-heavy Full Stack Engineer",
  location: "Bengaluru, India",
  email: "vineethserigar17@gmail.com",
  phone: "+91 9113937543",
  github: "https://github.com/Vineeth543",
  linkedin: "https://www.linkedin.com/in/vineeth-serigar",
  portfolio: "https://vineeth543.github.io/portfolio",
  twitter: "https://x.com/Vineeth28791942",

  oneLiner:
    "I design state architecture before writing a single component. 4+ years shipping enterprise Angular at Netcracker and one solo-built real-time market data platform on a €4/month VM.",

  ticker: [
    { k: "Garuda — tick latency", v: "<1", unit: "s", delta: "tick → screen", live: true },
    { k: "Packets / sec decoded", v: "1,500", unit: "/s", delta: "binary WS", live: true },
    { k: "Infra cost", v: "€4", unit: "/mo", delta: "Hetzner CX22" },
    { k: "Years shipping", v: "4+", unit: "yrs", delta: "Angular · NgRx · RxJS" },
  ],

  work: [
    {
      company: "Netcracker Technology",
      role: "Software Engineer",
      when: "2022 — Present",
      projects: [
        {
          title: "SSP B2B Self-Service Portal",
          tagline: "Customer + CSR-facing B2B telecom eCommerce & eCare portal.",
          stack: ["Angular", "TypeScript", "NgRx", "RxJS", "Bootstrap", "Playwright"],
          bullets: [
            "Engineered a **10-slice NgRx global state architecture** (catalog, quote, tempQuote, user, customer, header, individuals, dictionaries, loading, notifications) backed by `ngrx-store-localstorage` meta-reducers for cross-session persistence — eliminating redundant API re-fetches on reload.",
            "Architected the **quote lifecycle effect chain** in `QuoteEffect` using `switchMap`, `filter`, `withLatestFrom`, `catchError` — deterministically sequencing anonymous quote detection, customer session validation, in-progress resumption, and quote-list hydration. **Zero race conditions** across anonymous and authenticated flows.",
            "Implemented **smart product search** with `BehaviorSubject`-driven input streaming and a `switchMap`-based catalog traversal pipeline — including AI digital-assistant intent detection. **Sub-second** catalog search with full loading + suggestion-state feedback loops.",
            "Delivered a fully automated **Playwright E2E suite** covering end-to-end flows across 12 API stub integrations — catching DOM lifecycle regressions during billing account reassignment.",
          ],
          metrics: [
            { n: "437", l: "Angular Components" },
            { n: "146", l: "Modules" },
            { n: "41", l: "Lazy Routes" },
            { n: "22", l: "Playwright Specs" },
          ],
        },
        {
          title: "Order Capture UI (OC UI)",
          tagline: "Enterprise order management — quote creation, billing, multi-step checkout.",
          stack: ["Angular", "NgRx", "RxJS", "WebSockets", "STOMP", "Playwright"],
          bullets: [
            "Architected a **multi-session NgRx state layer** spanning 9+ feature stores with `storageMetaReducer` middleware for cross-tab session persistence — eliminating redundant init API calls and bringing session-recovery time near-zero.",
            "Engineered the `InitConfigEffect` orchestration pipeline processing session init, quote-ID propagation, tax settings, and customer de-anonymization through **8 chained RxJS effects** — deterministic transitions across anonymous-to-identified flows.",
            "Delivered a **39-module custom component ecosystem** (306 components, 82 feature modules) — quote tree views, drag-and-drop billing account assignment, profitability analysis, location management — each module with isolated state.",
            "Engineered a real-time **WebSocket notification system** using `combineLatest` + `switchMap` over STOMP-over-SockJS — concurrent multi-user collaboration on shared quotes without manual refresh.",
            "Built `OrderCaptureMFComponent` **micro-frontend shell** with dynamic property injection, STOMP-based tab lifecycle, and confirm-dialog flows for unsaved-change protection.",
          ],
          metrics: [
            { n: "306", l: "Components" },
            { n: "82", l: "Feature Modules" },
            { n: "50+", l: "API Endpoints" },
            { n: "0", l: "Race Conditions" },
          ],
        },
      ],
    },
  ],

  projects: [
    {
      id: "garuda",
      name: "Garuda",
      kind: "Personal · Solo build",
      sub: "Real-time Indian stock market analytics platform",
      blurb:
        "Ingests live NSE & MCX tick data from DhanHQ via binary WebSocket streams, computes proprietary demand/supply signals, persists into TimescaleDB hypertables, and streams rolling averages to a desktop-grade Angular + Electron app. Built solo, from binary protocol decoding to TradingView integration.",
      stack: ["Angular 21", "TypeScript", "Bun", "Fastify v5", "TimescaleDB", "WebSockets", "Electron", "Argon2id", "Ed25519", "Docker", "Caddy"],
      metrics: [
        { n: "<1s", l: "Tick latency" },
        { n: "1,500/s", l: "Binary packets" },
        { n: "€4/mo", l: "Total infra" },
      ],
      preview: "live",
      link: "garuda.html",
      featured: true,
    },
    {
      id: "eraya",
      name: "Project Eraya",
      kind: "Client · Frontend lead",
      sub: "High-traffic interior design platform",
      blurb:
        "Led frontend development for Eraya Interiors — a client-facing platform focused on visual polish, performance, and content-first storytelling.",
      stack: ["Angular", "TypeScript", "SCSS", "SSR"],
      metrics: [
        { n: "↑", l: "UI polish" },
        { n: "↓", l: "Page weight" },
        { n: "100%", l: "Mobile-first" },
      ],
      link: "https://erayainteriors.in",
      external: true,
    },
  ],

  skills: {
    Frontend: [
      { name: "Angular", years: "4+ yrs" },
      { name: "TypeScript", years: "4+ yrs" },
      { name: "NgRx", years: "Architect" },
      { name: "RxJS", years: "Daily" },
      { name: "React", years: "Comfort" },
      { name: "Tailwind CSS", years: "Garuda" },
      { name: "Bootstrap", years: "Enterprise" },
      { name: "TradingView", years: "Custom datafeed" },
    ],
    Backend: [
      { name: "Bun", years: "Production" },
      { name: "Fastify v5", years: "Garuda" },
      { name: "Node.js", years: "4+ yrs" },
      { name: "REST APIs", years: "Daily" },
      { name: "WebSockets", years: "STOMP · SockJS" },
      { name: "Binary protocols", years: "DataView decoders" },
      { name: "Argon2id", years: "Auth" },
      { name: "Ed25519 JWT", years: "Auth" },
    ],
    Data: [
      { name: "TimescaleDB", years: "Hypertables" },
      { name: "PostgreSQL 17", years: "GIN · pg_trgm" },
      { name: "Time-series", years: "Float64Array rings" },
      { name: "SQL", years: "Daily" },
    ],
    Infra: [
      { name: "Docker", years: "Compose" },
      { name: "Caddy", years: "Auto-TLS" },
      { name: "Hetzner", years: "CX22" },
      { name: "Electron", years: "Garuda desktop" },
      { name: "CI/CD", years: "GH Actions" },
      { name: "Playwright", years: "E2E" },
    ],
  },

  now: [
    {
      pre: "Currently",
      title: "Open to senior FE / full-stack roles",
      body: "Looking for a team where deep frontend architecture meets real product impact. Remote preferred; 1 week/month on-site possible.",
    },
    {
      pre: "Building",
      title: "Garuda v2 — alerting engine",
      body: "Adding pattern-match alerts on top of the rolling demand/supply ring buffer. Push to Electron + browser, with replay-attack-safe webhook delivery.",
    },
    {
      pre: "Reading",
      title: "Designing Data-Intensive Apps",
      body: "Revisiting Kleppmann while I rework Garuda's WAL fallback path. Also: anything that demystifies how Linear ships at their tempo.",
    },
  ],
};
