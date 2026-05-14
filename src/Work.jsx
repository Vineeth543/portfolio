// Work / Experience — Netcracker
function Work() {
  const p = window.PROFILE;
  const w = p.work[0];
  return (
    <section id="work" data-screen-label="01 Work">
      <div className="shell">
        <SectionLabel num="01 /" label="Work Experience" file="work.tsx" />
        <h2 className="section-title">Where I've shipped at scale.</h2>
        <p className="section-sub">
          Four years owning Angular + NgRx architecture on two large enterprise products at Netcracker —
          state design, RxJS pipelines, micro-frontend shells, and Playwright E2E suites.
        </p>

        <div className="work-grid">
          <aside className="work-side">
            <div className="company">{w.company}</div>
            <div className="role">{w.role}</div>
            <div className="when">{w.when}</div>
          </aside>
          <div className="work-projects">
            {w.projects.map((proj, i) => (
              <article className="work-card reveal" key={i}>
                <h3>{proj.title}</h3>
                <div className="tagline">{proj.tagline}</div>
                <ul className="bullets">
                  {proj.bullets.map((b, j) => <li key={j}>{parseBold(b)}</li>)}
                </ul>
                <div className="tag-row">
                  {proj.stack.map((s, j) => <Tag key={j}>{s}</Tag>)}
                </div>
                <div className="metrics-strip">
                  {proj.metrics.map((m, j) => (
                    <div className="m" key={j}>
                      <div className="n">{m.n}</div>
                      <div className="l">{m.l}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Work });
