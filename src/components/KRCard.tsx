interface KRCardProps {
  kr: string | null;
  krNumber: number;
}

export default function KRCard({ kr, krNumber }: KRCardProps) {
  return (
    <div className="kr-card">
      <span className="kr-number">KR #{krNumber}</span>
      <p className="kr-text">
        {kr ?? "Click Generate to unlock your next breakthrough"}
      </p>
    </div>
  );
}
