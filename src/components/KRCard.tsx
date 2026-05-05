interface KRCardProps {
  kr: string | null;
  krId: string | null;
  copied: boolean;
  urlCopied: boolean;
  onCopy: () => void;
  onCopyUrl: () => void;
}

export default function KRCard({
  kr,
  krId,
  copied,
  urlCopied,
  onCopy,
  onCopyUrl,
}: KRCardProps) {
  return (
    <div className="kr-card">
      <span className="kr-number">{krId ?? "—"}</span>
      <p className="kr-text">
        {kr ?? "Click Generate to unlock your next breakthrough"}
      </p>
      {kr && (
        <div className="kr-actions">
          {(copied || urlCopied) && (
            <span className="kr-copy-confirm">
              {copied ? "Copied!" : "Link copied!"}
            </span>
          )}
          <button
            className="kr-icon-btn"
            onClick={onCopy}
            title="Copy key result"
            aria-label="Copy key result"
          >
            {copied ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
          <button
            className="kr-icon-btn"
            onClick={onCopyUrl}
            title="Copy link"
            aria-label="Copy link"
          >
            {urlCopied ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
