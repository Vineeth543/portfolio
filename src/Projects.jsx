// Featured projects — Garuda hero + Eraya
function GarudaPreview() {
  // A fake live order book / depth feed
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 900);
    return () => clearInterval(id);
  }, []);

  const seedSymbols = ["RELIANCE", "TCS", "HDFCBANK", "INFY", "ITC", "NIFTY", "BANKNIFTY", "TATAMOTORS"];
  const rows = seedSymbols.slice(0, 6).map((sym, i) => {
    const base = 1000 + i * 380;
    const p = base + Math.sin((tick + i) * 0.6) * 8 + (i % 2 === 0 ? -0.3 : 0.5);
    const buy = 38 + Math.round((Math.sin((tick + i) * 0.8) + 1) * 18);
    const sell = 100 - buy - 4;
    const up = (Math.sin((tick + i) * 0.5) > 0);
    return { sym, p: p.toFixed(2), buy, sell, up };
  });

  return (
    <div className="preview">
      <div className="row" style={{ marginBottom: 8 }}>
        <span style={{ color: "var(--text-faint)" }}>SYMBOL</span>
        <span style={{ color: "var(--text-faint)" }}>LTP / DEMAND%</span>
      </div>
      {rows.map((r, i) => (
        <div className={`row ${r.up ? "" : "down"}`} key={r.sym} style={{ marginTop: 6 }}>
          <span style={{ color: "var(--text)" }}>{r.sym}</span>
          <span>
            <span className="val">{r.p}</span>
            <span style={{ color: "var(--text-faint)", margin: "0 6px" }}>·</span>
            <span style={{ color: "var(--accent)" }}>{r.buy}%</span>
            <span style={{ color: "var(--text-faint)" }}>/</span>
            <span style={{ color: "var(--rose)" }}>{r.sell}%</span>
          </span>
        </div>
      ))}
      <div style={{ marginTop: 10, borderTop: "1px dashed var(--border)", paddingTop: 8, color: "var(--text-faint)", fontSize: 10 }}>
        ws://garuda.live · 1,{500 + Math.round(Math.sin(tick * 0.7) * 15)} pkts/s · {(0.4 + ((Math.sin(tick * 0.4) + 1) / 2) * 0.4).toFixed(2)}s
      </div>
    </div>
  );
}

function ProjectCard({ p, featured }) {
  const Comp = "a";
  return (
    <Comp
      className={`project-card ${featured ? "featured" : ""} reveal`}
      href={p.link}
      target={p.external ? "_blank" : undefined}
      rel={p.external ? "noopener" : undefined}
    >
      <div className="badge">{featured ? "live · case study" : (p.external ? "external ↗" : "case study")}</div>
      <h3>{p.name}</h3>
      <div className="sub">{p.kind} · {p.sub}</div>
      <p>{p.blurb}</p>
      <div className="stack">
        {p.stack.map((s, i) => <Tag key={i}>{s}</Tag>)}
      </div>
      {featured && p.preview === "live" && <GarudaPreview />}
      <span className="cta">
        <span>{p.external ? "visit live site" : "read the case study"}</span>
        <span className="arrow">→</span>
      </span>
      <div className="hover-metrics">
        {p.metrics.map((m, i) => (
          <div className="m" key={i}>
            <div className="n">{m.n}</div>
            <div className="l">{m.l}</div>
          </div>
        ))}
      </div>
    </Comp>
  );
}

function Projects() {
  const p = window.PROFILE;
  return (
    <section id="projects" data-screen-label="02 Projects">
      <div className="shell">
        <SectionLabel num="02 /" label="Featured Projects" file="projects.tsx" />
        <h2 className="section-title">What I build when nobody tells me what to build.</h2>
        <p className="section-sub">
          Solo proof points. The one I'm most proud of is Garuda — binary WebSocket decoders to TradingView charts,
          end to end, on €4/month of infrastructure.
        </p>
        <div className="projects-grid">
          {p.projects.map((proj, i) => (
            <ProjectCard key={proj.id} p={proj} featured={proj.featured} />
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Projects });
