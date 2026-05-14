// Currently — Now / Building / Reading
function Now() {
  const p = window.PROFILE;
  return (
    <section id="now" data-screen-label="04 Now">
      <div className="shell">
        <SectionLabel num="04 /" label="Currently" file="now.md" />
        <h2 className="section-title">What I'm thinking about right now.</h2>
        <p className="section-sub">A living section, updated whenever the world or the work shifts.</p>

        <div className="now-grid">
          {p.now.map((n, i) => (
            <div className="now-card reveal" key={i}>
              <div className="pre">{n.pre}</div>
              <h4>{n.title}</h4>
              <p>{n.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Now });
