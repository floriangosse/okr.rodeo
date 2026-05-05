import { useEffect, useState } from "react";
import KRCard from "./components/KRCard";
import { type GeneratedKR, generateKR, krFromId } from "./lib/generator";

export default function App() {
  const [kr, setKR] = useState<GeneratedKR | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [shareUrlCopied, setShareUrlCopied] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("kr");
    const loaded = krFromId(id);
    if (loaded) {
      setKR(loaded);
    }
  }, []);

  function handleGenerate() {
    setKR(generateKR());
    setCopied(false);
    setShareUrl(null);
    window.history.replaceState(null, "", window.location.pathname);
  }

  function handleCopy() {
    if (!kr) return;
    navigator.clipboard.writeText(kr.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleShare() {
    if (!kr) return;
    const url = `${window.location.origin}${window.location.pathname}?kr=${kr.krId}`;
    setShareUrl(url);
    window.history.replaceState(null, "", `?kr=${kr.krId}`);
  }

  function handleCopyShareUrl() {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShareUrlCopied(true);
      setTimeout(() => setShareUrlCopied(false), 2000);
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
        <KRCard kr={kr?.text ?? null} krId={kr?.krId ?? null} />

        <div className="actions">
          <button className="btn btn-primary" onClick={handleGenerate}>
            Generate
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleCopy}
            disabled={!kr}
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>

        {kr && (
          <div className="share">
            {!shareUrl ? (
              <button className="share-link" onClick={handleShare}>
                Share this KR →
              </button>
            ) : (
              <div className="share-url-row">
                <input
                  className="share-url-input"
                  readOnly
                  value={shareUrl}
                />
                <button
                  className="btn btn-secondary"
                  onClick={handleCopyShareUrl}
                >
                  {shareUrlCopied ? "✓ Copied" : "Copy URL"}
                </button>
              </div>
            )}
          </div>
        )}
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
