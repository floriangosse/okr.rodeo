import { useEffect, useState } from "react";
import KRCard from "./components/KRCard";
import { decodeKR, encodeKR, generateKR } from "./lib/generator";

function randomKRNumber(): number {
  return Math.floor(1000 + Math.random() * 9000);
}

export default function App() {
  const [kr, setKR] = useState<string | null>(null);
  const [krNumber, setKRNumber] = useState<number>(randomKRNumber());
  const [copied, setCopied] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("kr");
    const decoded = decodeKR(encoded);
    if (decoded) {
      setKR(decoded);
      setKRNumber(randomKRNumber());
    }
  }, []);

  function handleGenerate() {
    const newKR = generateKR();
    setKR(newKR);
    setKRNumber(randomKRNumber());
    setCopied(false);
    setShareUrl(null);
    window.history.replaceState(null, "", window.location.pathname);
  }

  function handleCopy() {
    if (!kr) return;
    navigator.clipboard.writeText(kr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleShare() {
    if (!kr) return;
    const url = `${window.location.origin}${window.location.pathname}?kr=${encodeKR(kr)}`;
    setShareUrl(url);
    window.history.replaceState(null, "", `?kr=${encodeKR(kr)}`);
  }

  function handleCopyShareUrl() {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
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
        <KRCard kr={kr} krNumber={krNumber} />

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
                  Copy URL
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
