interface KRCardProps {
  kr: string | null;
  krId: string | null;
}

export default function KRCard({ kr, krId }: KRCardProps) {
  return (
    <div className="kr-card">
      <span className="kr-number">{krId ?? "—"}</span>
      <p className="kr-text">
        {kr ?? "Click Generate to unlock your next breakthrough"}
      </p>
    </div>
  );
}
