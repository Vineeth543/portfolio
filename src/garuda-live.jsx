// Live demo for Garuda case study — order book + tick log streaming
const { useEffect, useState, useRef } = React;

function rand(min, max) { return min + Math.random() * (max - min); }

function OrderBook() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 700);
    return () => clearInterval(id);
  }, []);

  // Build top-5 buy/sell from a sine + noise
  const mid = 2843.50 + Math.sin(tick * 0.3) * 1.5;
  const buys = Array.from({ length: 5 }).map((_, i) => {
    const px = (mid - 0.25 - i * 0.25);
    const qty = Math.round(800 + Math.sin((tick + i) * 1.1) * 400 + i * 120);
    return { px: px.toFixed(2), qty };
  });
  const sells = Array.from({ length: 5 }).map((_, i) => {
    const px = (mid + 0.25 + i * 0.25);
    const qty = Math.round(750 + Math.cos((tick + i) * 1.0) * 380 + i * 100);
    return { px: px.toFixed(2), qty };
  });

  const maxBuy = Math.max(...buys.map((b) => b.qty));
  const maxSell = Math.max(...sells.map((s) => s.qty));

  return (
    <div className="live-demo-col">
      <div className="col-title">Order book · NSE depth ⓘ</div>
      {sells.slice().reverse().map((s, i) => (
        <div className="depth-row" key={"s" + i}>
          <span className="qty">{s.qty.toLocaleString()}</span>
          <div className="depth-bar sell"><div style={{ width: `${(s.qty / maxSell) * 100}%`, right: 0 }} /></div>
          <span className="px sell">{s.px}</span>
        </div>
      ))}
      <div style={{ borderTop: "1px dashed var(--border)", margin: "6px 0" }}></div>
      {buys.map((b, i) => (
        <div className="depth-row" key={"b" + i}>
          <span className="qty">{b.qty.toLocaleString()}</span>
          <div className="depth-bar"><div style={{ width: `${(b.qty / maxBuy) * 100}%`, left: 0 }} /></div>
          <span className="px buy">{b.px}</span>
        </div>
      ))}
    </div>
  );
}

const SYMBOLS = ["RELIANCE", "TCS", "INFY", "ITC", "HDFCBANK", "TATAMOTORS", "NIFTY", "BANKNIFTY", "WIPRO", "ADANIENT"];

function TickLog() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const id = setInterval(() => {
      const sym = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      const px = (1000 + Math.random() * 3000).toFixed(2);
      const qty = Math.floor(50 + Math.random() * 950);
      const side = Math.random() > 0.5 ? "up" : "down";
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`;
      setRows((r) => [{ sym, px, qty, side, time }, ...r].slice(0, 14));
    }, 240);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="live-demo-col">
      <div className="col-title">Tick log · 240ms sample window</div>
      <div className="tick-log">
        {rows.map((r, i) => (
          <div className="row" key={`${r.time}-${i}`}>
            <span className="time">{r.time}</span>
            <span className="sym">{r.sym.slice(0,5)}</span>
            <span className={`px ${r.side}`}>{r.px}</span>
            <span className="info">{r.qty} · {r.side === "up" ? "BUY×" : "SELL×"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseLiveDemo() {
  const [pps, setPps] = useState(1500);
  const [latency, setLatency] = useState(0.62);
  useEffect(() => {
    const id = setInterval(() => {
      setPps(1500 + Math.round(Math.sin(Date.now() * 0.002) * 20 + Math.cos(Date.now() * 0.003) * 12));
      setLatency(+(0.4 + Math.abs(Math.sin(Date.now() * 0.001)) * 0.5).toFixed(2));
    }, 700);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="live-demo">
      <div className="live-demo-bar">
        <span className="live-dot" />
        <span style={{ color: "var(--text)" }}>garuda.live</span>
        <span style={{ marginLeft: 12 }}>ws://stream · NSE+MCX</span>
        <span style={{ marginLeft: "auto", color: "var(--text)" }}>
          <span style={{ color: "var(--accent)" }}>{pps.toLocaleString()}</span> pkts/s
          <span style={{ margin: "0 10px", color: "var(--text-faint)" }}>·</span>
          <span style={{ color: "var(--accent)" }}>{latency}s</span> latency
        </span>
      </div>
      <div className="live-demo-body">
        <OrderBook />
        <TickLog />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("live-demo-root")).render(<CaseLiveDemo />);
