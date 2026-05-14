// Hero — typing terminal + live ticker
const HERO_TERMINAL_LINES = [
  { t: "prompt", text: "$ " },
  { t: "cmd", text: "whoami" },
  { t: "out", text: "vineeth_serigar — frontend-heavy full stack engineer" },
  { t: "out", text: "" },
  { t: "prompt", text: "$ " },
  { t: "cmd", text: "cat principles.md" },
  { t: "comment", text: "// the only signal that matters" },
  { t: "out", text: "1. design the state architecture before the first component" },
  { t: "out", text: "2. zero race conditions. zero stale state. zero data loss." },
  { t: "out", text: "3. measure latency, not lines of code" },
  { t: "out", text: "" },
  { t: "prompt", text: "$ " },
  { t: "cmd", text: "garuda --status" },
  { t: "ok",  text: "● garuda.live      streaming   1500 pkts/s   <1s latency" },
  { t: "ok",  text: "● ring buffer      9 MB         50 symbols    5 resolutions" },
  { t: "ok",  text: "● infra cost       €4 / month   <20% CPU      <500 MB RAM" },
  { t: "out", text: "" },
  { t: "prompt", text: "$ " },
  { t: "cmd", text: "echo \"let's build something fast.\"" },
];

function TypingTerminal() {
  const [shown, setShown] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (shown >= HERO_TERMINAL_LINES.length) return;
    const line = HERO_TERMINAL_LINES[shown];
    // Lines starting with $/comment/out type instantly; cmd lines type char-by-char
    if (line.t === "cmd") {
      if (charIdx < line.text.length) {
        const id = setTimeout(() => setCharIdx((c) => c + 1), 30 + Math.random() * 40);
        return () => clearTimeout(id);
      } else {
        const id = setTimeout(() => { setShown((s) => s + 1); setCharIdx(0); }, 220);
        return () => clearTimeout(id);
      }
    } else {
      const delay = line.text === "" ? 80 : 90;
      const id = setTimeout(() => setShown((s) => s + 1), delay);
      return () => clearTimeout(id);
    }
  }, [shown, charIdx]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [shown, charIdx]);

  const renderLine = (line, idx, isCurrent) => {
    if (line.t === "prompt") return null; // attached to next
    if (line.t === "cmd") {
      const text = isCurrent ? line.text.slice(0, charIdx) : line.text;
      return (
        <span className="line" key={idx}>
          <span className="prompt">$ </span><span className="cmd">{text}</span>
          {isCurrent && <span className="term-cursor" />}
        </span>
      );
    }
    if (line.t === "comment") return <span className="line comment" key={idx}>{line.text}</span>;
    if (line.t === "ok")      return <span className="line" key={idx}><span className="ok">{line.text}</span></span>;
    if (line.t === "out")     return <span className="line" key={idx}>{line.text}</span>;
    return null;
  };

  const items = [];
  for (let i = 0; i < shown && i < HERO_TERMINAL_LINES.length; i++) {
    items.push(renderLine(HERO_TERMINAL_LINES[i], i, false));
  }
  if (shown < HERO_TERMINAL_LINES.length) {
    items.push(renderLine(HERO_TERMINAL_LINES[shown], shown, true));
  }

  return (
    <div className="terminal">
      <div className="terminal-bar">
        <div className="traffic"><span /><span /><span /></div>
        <span className="title">~/vineeth — zsh — 80×24</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>{items}</div>
    </div>
  );
}

// Animated ticker numbers that gently drift
function LiveTicker({ items }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1100);
    return () => clearInterval(id);
  }, []);

  const drift = (base, idx) => {
    // Slight fluctuation around base for "live" feel — only first 2 cells
    if (idx > 1) return base;
    if (idx === 0) {
      // latency: between 0.4 and 0.9 s
      return (0.4 + ((Math.sin(tick * 0.7 + 1) + 1) / 2) * 0.5).toFixed(2);
    }
    if (idx === 1) {
      // packets/sec: 1480-1540
      const v = 1500 + Math.round(Math.sin(tick * 0.9) * 18 + Math.cos(tick * 1.3) * 12);
      return v.toLocaleString();
    }
    return base;
  };

  return (
    <div className="ticker">
      {items.map((c, i) => (
        <div className={`ticker-cell ${c.live ? "live-dot" : ""}`} key={i}>
          <div className="k">{c.k}</div>
          <div className="v">
            <span>{drift(c.v, i)}</span>
            <span className="unit">{c.unit}</span>
          </div>
          <div className="delta mono">{c.delta}</div>
        </div>
      ))}
    </div>
  );
}

function Hero({ heroVariant }) {
  const p = window.PROFILE;
  return (
    <section className="hero" data-hero={heroVariant} data-screen-label="00 Hero">
      <div className="shell">
        <div className="hero-grid">
          <div className="hero-text">
            <div className="hero-eyebrow">
              <span className="live" />
              <span>Open to senior frontend &amp; full-stack roles · Bengaluru / Remote</span>
            </div>
            <h1>
              I build <span className="accent">fast</span>, correct<br />
              software — from binary<br />
              protocols to pixels.
            </h1>
            <p className="lede">
              Hi, I'm <strong>Vineeth Serigar</strong>. I'm a frontend-heavy full-stack engineer.
              For 4+ years I've owned end-to-end Angular architecture at <strong>Netcracker</strong> — NgRx state layers,
              RxJS effect chains, micro-frontend shells. After hours I built <strong>Garuda</strong> from scratch:
              a real-time market-data platform on a <strong>€4/month</strong> VM.
            </p>
            <div className="hero-ctas">
              <Btn primary href="#contact">
                <span>get in touch</span>
                <span className="arrow">→</span>
              </Btn>
              <Btn href="uploads/Vineeth_Serigar_Resume.pdf" target="_blank">
                <span>download resume</span>
                <span style={{ opacity: 0.6 }}>↓</span>
              </Btn>
              <Btn href="garuda.html">
                <span>see garuda case study</span>
                <span className="arrow">→</span>
              </Btn>
            </div>
          </div>
          <div className="hero-side">
            <TypingTerminal />
          </div>
        </div>
        <LiveTicker items={p.ticker} />
      </div>
    </section>
  );
}

Object.assign(window, { Hero });
