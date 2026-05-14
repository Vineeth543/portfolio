// Contact + form
function Contact() {
  const p = window.PROFILE;
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get("name") || "";
    const subject = fd.get("subject") || "Hi from your portfolio";
    const msg = fd.get("msg") || "";
    const body = `From: ${name}\n\n${msg}`;
    window.location.href = `mailto:${p.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" data-screen-label="06 Contact">
      <div className="shell">
        <SectionLabel num="06 /" label="Contact" file="hi.tsx" />
        <h2 className="section-title">Let's talk.</h2>
        <p className="section-sub">
          I'm actively interviewing for senior frontend &amp; full-stack roles. Fastest way to reach me is email — I reply within a day.
        </p>

        <div className="contact-grid">
          <div className="contact-card">
            <h3>Reach out directly.</h3>
            <p>Email is best. I'm also on LinkedIn and GitHub.</p>
            <div className="contact-links">
              <a className="contact-link" href={`mailto:${p.email}`}>
                <span className="k">email</span>
                <span className="v">{p.email}<span className="arrow">→</span></span>
              </a>
              <a className="contact-link" href={p.linkedin} target="_blank" rel="noopener">
                <span className="k">linkedin</span>
                <span className="v">/in/vineeth-serigar<span className="arrow">↗</span></span>
              </a>
              <a className="contact-link" href={p.github} target="_blank" rel="noopener">
                <span className="k">github</span>
                <span className="v">@Vineeth543<span className="arrow">↗</span></span>
              </a>
              <a className="contact-link" href={p.twitter} target="_blank" rel="noopener">
                <span className="k">twitter</span>
                <span className="v">@Vineeth28791942<span className="arrow">↗</span></span>
              </a>
              <a className="contact-link" href={`tel:${p.phone.replace(/\s/g,'')}`}>
                <span className="k">phone</span>
                <span className="v">{p.phone}<span className="arrow">→</span></span>
              </a>
              <a className="contact-link" href="uploads/Vineeth_Serigar_Resume.pdf" target="_blank">
                <span className="k">resume.pdf</span>
                <span className="v">download<span className="arrow">↓</span></span>
              </a>
            </div>
          </div>

          <div className="contact-card">
            <h3>Or send a quick note.</h3>
            <p>This opens your mail client — no servers, no tracking.</p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div>
                <label>Your name</label>
                <input name="name" placeholder="Jane from Acme Co." required />
              </div>
              <div>
                <label>Subject</label>
                <input name="subject" placeholder="Senior Angular role at ___" />
              </div>
              <div>
                <label>Message</label>
                <textarea name="msg" placeholder="Tell me about the role, team, and tech…" required />
              </div>
              <Btn primary>
                <span>{sent ? "opening your mail client…" : "send →"}</span>
              </Btn>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Contact });
