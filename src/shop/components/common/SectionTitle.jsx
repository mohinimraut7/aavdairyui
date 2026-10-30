export default function SectionTitle({ title, subtitle, eyebrow, action, center = false }) {
  return (
    <div className={`mb-6 flex gap-3 ${center ? "flex-col items-center text-center" : "flex-wrap items-end justify-between"}`}>
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="mt-1 text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
