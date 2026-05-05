import { useEffect, useState } from "react";
import KRCard from "./components/KRCard";
import { type GeneratedKR, generateKR, krFromId } from "./lib/generator";

export default function App() {
  const [kr, setKR] = useState<GeneratedKR | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [urlCopied, setUrlCopied] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loaded = krFromId(params.get("kr"));
    if (loaded) setKR(loaded);
  }, []);

  function handleGenerate() {
    const newKR = generateKR();
    setKR(newKR);
    setCopied(false);
    setUrlCopied(false);
    window.history.replaceState(null, "", `?kr=${newKR.krId}`);
  }

  function handleCopy() {
    if (!kr) return;
    navigator.clipboard.writeText(kr.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleCopyUrl() {
    if (!kr) return;
    const url = `${window.location.origin}${window.location.pathname}?kr=${kr.krId}`;
    navigator.clipboard.writeText(url).then(() => {
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2000);
    });
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="site-title">10x Key Results</h1>
        <p className="tagline">
          Enterprise-grade OKR generation, powered by synergy
        </p>
      </header>

      <main className="main">
        <KRCard
          kr={kr?.text ?? null}
          krId={kr?.krId ?? null}
          copied={copied}
          urlCopied={urlCopied}
          onCopy={handleCopy}
          onCopyUrl={handleCopyUrl}
        />

        <div className="actions">
          <button className="btn btn-primary" onClick={handleGenerate}>
            Generate
          </button>
        </div>
      </main>

      <footer className="footer">
        <p>
          Results guaranteed to impress in any all-hands meeting. Not
          responsible for actual OKR adoption.
        </p>
      </footer>
    </div>
  );
}
