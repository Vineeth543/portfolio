// App — root composition + theme + Tweaks
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "split"
}/*EDITMODE-END*/;

function App() {
  const [theme, setThemeRaw] = useState(() => {
    try { return localStorage.getItem("vs.theme") || "dark"; } catch { return "dark"; }
  });
  const setTheme = (t) => {
    setThemeRaw(t);
    try { localStorage.setItem("vs.theme", t); } catch {}
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const tweaks = useTweaks(TWEAK_DEFAULTS);

  useReveal();

  return (
    <div className="page">
      <Topbar theme={theme} setTheme={setTheme} />
      <Hero heroVariant={tweaks.heroVariant} />
      <Work />
      <Projects />
      <Skills />
      <Now />
      <AskResume />
      <Contact />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Hero layout" subtitle="Try different opening moves.">
          <TweakRadio
            tweaks={tweaks}
            tweakKey="heroVariant"
            options={[
              { value: "split", label: "Split" },
              { value: "terminal-first", label: "Term first" },
            ]}
          />
          <TweakSelect
            tweaks={tweaks}
            tweakKey="heroVariant"
            label="All variants"
            options={[
              { value: "split", label: "Split — terminal + copy" },
              { value: "terminal-first", label: "Terminal first" },
              { value: "stacked", label: "Stacked — no terminal" },
              { value: "big-type", label: "Big type — manifesto" },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
