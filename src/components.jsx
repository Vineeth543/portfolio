// Shared primitives + utilities exported to window
const { useEffect, useRef, useState, useMemo, useCallback } = React;

// Inline-bold parser: turn **x** into <strong>x</strong>
function parseBold(str) {
  const parts = String(str).split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>;
    if (p.startsWith("`") && p.endsWith("`")) return <code key={i} className="mono" style={{ background: "var(--bg-elev-2)", padding: "1px 5px", borderRadius: 3, fontSize: "0.92em" }}>{p.slice(1, -1)}</code>;
    return p;
  });
}

function SectionLabel({ num, label, file }) {
  return (
    <div className="section-label">
      <span className="num">{num}</span>
      <span>{label}</span>
      {file ? <span className="file mono">~/{file}</span> : null}
    </div>
  );
}

function Tag({ children }) { return <span className="tag">{children}</span>; }

function Btn({ primary, href, children, onClick, target }) {
  const Comp = href ? "a" : "button";
  return (
    <Comp className={`btn ${primary ? "primary" : ""}`} href={href} onClick={onClick} target={target} rel={target === "_blank" ? "noopener" : undefined}>
      {children}
    </Comp>
  );
}

// useReveal: add .in when scrolled into view
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Topbar({ theme, setTheme }) {
  return (
    <div className="topbar">
      <span className="dot" />
      <span className="path">
        ~<span className="sep">/</span>vineeth<span className="sep">/</span>portfolio<span className="sep">/</span>main.tsx
      </span>
      <nav className="nav">
        <a href="#work"><span className="hash">#</span>work</a>
        <a href="#projects"><span className="hash">#</span>projects</a>
        <a href="#skills"><span className="hash">#</span>skills</a>
        <a href="#now"><span className="hash">#</span>now</a>
        <a href="#contact"><span className="hash">#</span>contact</a>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === "dark" ? "☾" : "☀"}
        </button>
      </nav>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <div>
        <span className="pulse" />
        <span>system online · last deploy {new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
      </div>
      <div>
        <span className="faint">crafted with HTML + CSS · </span>
        <span>© {new Date().getFullYear()} Vineeth Serigar</span>
      </div>
    </footer>
  );
}

Object.assign(window, { parseBold, SectionLabel, Tag, Btn, Topbar, Footer, useReveal });
