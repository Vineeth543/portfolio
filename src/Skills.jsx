// Filterable skills grid
function Skills() {
  const p = window.PROFILE;
  const groups = p.skills;
  const [active, setActive] = useState("All");

  const allCount = Object.values(groups).reduce((s, arr) => s + arr.length, 0);
  const filters = ["All", ...Object.keys(groups)];

  const visible = useMemo(() => {
    if (active === "All") {
      // flatten with group tag
      return Object.entries(groups).flatMap(([g, arr]) => arr.map((s) => ({ ...s, group: g })));
    }
    return groups[active].map((s) => ({ ...s, group: active }));
  }, [active, groups]);

  return (
    <section id="skills" data-screen-label="03 Skills">
      <div className="shell">
        <SectionLabel num="03 /" label="Skills" file="skills.json" />
        <h2 className="section-title">What's actually in my hands.</h2>
        <p className="section-sub">
          The stack I reach for daily, grouped by layer. Filter by what matters for your role.
        </p>

        <div className="skills-filters">
          {filters.map((f) => {
            const count = f === "All" ? allCount : groups[f].length;
            return (
              <button
                key={f}
                className={`filter-chip ${active === f ? "active" : ""}`}
                onClick={() => setActive(f)}
              >
                {f} <span className="count">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="skills-grid">
          {visible.map((s, i) => (
            <div className="skill" key={s.name + i}>
              <div className="name">{s.name}</div>
              <div className="meta">{s.group} · {s.years}</div>
              <div className="bar"><div style={{ width: "100%" }} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Skills });
