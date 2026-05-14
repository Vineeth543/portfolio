// AskResume — Claude-powered chat against the resume
const ASK_SYSTEM_BRIEF = `
You are an AI assistant embedded in Vineeth Serigar's portfolio site.
Answer questions about his experience, skills, and projects in his voice (first-person, conversational).
Keep replies short (under 90 words), specific, and grounded only in the FACTS below.
If asked something outside these facts, say you don't have that info and suggest emailing vineethserigar17@gmail.com.

FACTS:
- Name: Vineeth Serigar. Frontend-heavy full stack engineer. 4+ years.
- Based in Bengaluru, India. Open to remote; 1 week/month on-site possible. INR target: 16-20 LPA.
- Employer: Netcracker Technology (2022-present). Senior IC.

PROJECT A — SSP B2B Self-Service Portal (Netcracker)
Tech: Angular, TypeScript, NgRx, RxJS, Bootstrap, Playwright.
- Designed 10-slice NgRx global state (catalog, quote, tempQuote, user, customer, header, individuals, dictionaries, loading, notifications) with ngrx-store-localstorage meta-reducer for cross-session persistence.
- Architected QuoteEffect with switchMap, filter, withLatestFrom, catchError for deterministic anonymous-to-authenticated session init. Eliminated race conditions.
- Built smart product search via BehaviorSubject + switchMap with AI Digital Assistant intent detection.
- Playwright E2E suite, 22 spec files, 58 tests, across 12 API stubs.
- Modular customer portal: 41 lazy-loaded routes, 437 components in 146 modules, 106 service classes, 23 REST clients, 136 typed HTTP ops.

PROJECT B — Order Capture UI (Netcracker, B2B)
Tech: Angular, NgRx, RxJS, WebSockets (STOMP/SockJS), Playwright.
- Multi-session NgRx layer across 9+ feature stores with storageMetaReducer middleware for cross-tab persistence.
- InitConfigEffect: 8 chained RxJS effects for session init, quote-ID propagation, tax settings, de-anonymization.
- 39-module custom component ecosystem (306 components, 82 feature modules).
- Real-time WebSocket notifications via combineLatest + switchMap over STOMP-over-SockJS.
- OrderCaptureMFComponent micro-frontend shell embedded in CSRD workplace portal.

PROJECT C — Garuda (Personal solo project, 2025-present)
Real-time Indian stock market analytics platform.
Tech: Angular 21, TypeScript, Tailwind, RxJS, TradingView Charts, Electron, Bun, Fastify v5, TimescaleDB (Postgres 17), WebSockets, Argon2id, Ed25519 JWT, Docker, Caddy.
- Ingests live NSE & MCX tick data from DhanHQ via binary WebSocket streams (NSE depth 332B, NSE feed 163B, MCX feed 163B).
- Sub-second tick-to-screen latency. ~1,500 raw binary packets/sec, 50 symbols, 3 concurrent streams.
- Pure TypeScript DataView binary decoders. Custom Aggressive Demand/Supply metric. Float64Array(3600) circular ring buffer per symbol (~9 MB total).
- 5 rolling time resolutions (1s, 1m, 5m, 15m, 1h) without DB reads per frame.
- TimescaleDB hypertables, multi-row ON CONFLICT DO NOTHING batched inserts.
- Angular 21 + custom RxJS WebSocket datafeed for TradingView. Electron desktop client.
- Argon2id password hashing + Ed25519 JWT (15-min access + same-day-capped refresh) + OTP-to-admin + HttpOnly refresh cookies + in-memory refreshBlocklist for replay-attack detection.
- Caddy auto-TLS, 6-line reverse-proxy config.
- Runs on Hetzner CX22 (2 vCPU / 4 GB) under <20% CPU one core, <500 MB RAM. ~€4/month total infra.
- 3-strike WAL fallback to JSON for DB outages. Zero data loss.
- pg_trgm GIN index on global_symbols (100K rows) — symbol search <20ms.

PROJECT D — Eraya Interiors (Client). Frontend lead. Angular + SSR. erayainteriors.in.

EDUCATION: BE Computer Science, MITE (2018-2022).

VINEETH'S SIGNATURE MOVE: "I design the state architecture before writing a single component."

CONTACT: vineethserigar17@gmail.com / +91 9113937543 / github.com/Vineeth543 / linkedin.com/in/vineeth-serigar.
`;

const SUGGESTED = [
  "What's the Garuda project?",
  "Show me your NgRx work",
  "What's your strongest skill?",
  "Are you available for remote?",
  "Tell me a hard bug you fixed",
];

function AskResume() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi, I'm a small AI assistant trained on Vineeth's resume. Ask me about his projects, NgRx architecture, Garuda, or anything you'd want to know before a call. I'll answer in his voice.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy]);

  const ask = useCallback(async (q) => {
    if (!q.trim() || busy) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setBusy(true);
    try {
      const history = messages.map((m) => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.text,
      }));
      const reply = await window.claude.complete({
        messages: [
          { role: "user", content: ASK_SYSTEM_BRIEF + "\n\nThe following is a conversation. Reply as Vineeth in first person, short and specific.\n\n" +
            history.map((h) => `${h.role.toUpperCase()}: ${h.content}`).join("\n") +
            `\nUSER: ${q}\nASSISTANT:` },
        ],
      });
      setMessages((m) => [...m, { role: "ai", text: String(reply).trim() }]);
    } catch (e) {
      setMessages((m) => [...m, {
        role: "ai",
        text: "Hmm, the assistant glitched. Try again — or just drop me a line at vineethserigar17@gmail.com.",
      }]);
    }
    setBusy(false);
  }, [busy, messages]);

  return (
    <section id="ask" data-screen-label="05 Ask">
      <div className="shell">
        <SectionLabel num="05 /" label="Ask My Resume" file="ask.tsx" />
        <h2 className="section-title">Skip the recruiter call. Ask me anything.</h2>
        <p className="section-sub">
          A small AI assistant grounded in my resume. It speaks in my voice and stays within what I've actually shipped.
        </p>

        <div className="ask">
          <div className="ask-head">
            <span className="dot" />
            <span className="title">ask · vineeth.cli</span>
            <span style={{ marginLeft: "auto", color: "var(--text-faint)" }}>haiku · grounded</span>
          </div>
          <div className="ask-body" ref={scrollRef}>
            {messages.map((m, i) => (
              <div className={`ask-msg ${m.role}`} key={i}>
                <div className="who">{m.role === "ai" ? "vineeth" : "you"}</div>
                <div className="body">{m.text}</div>
              </div>
            ))}
            {busy && (
              <div className="ask-msg ai">
                <div className="who">vineeth</div>
                <div className="body thinking-dots"><span /><span /><span /></div>
              </div>
            )}
          </div>
          <div className="ask-suggestions">
            {SUGGESTED.map((s) => (
              <button key={s} onClick={() => ask(s)} disabled={busy}>{s}</button>
            ))}
          </div>
          <form
            className="ask-input-row"
            onSubmit={(e) => { e.preventDefault(); ask(input); }}
          >
            <span className="prompt">›</span>
            <input
              placeholder="ask about a project, a tech, a tradeoff…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={busy}
            />
            <button type="submit" className="send">send ↵</button>
          </form>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AskResume });
