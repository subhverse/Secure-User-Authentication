export default function Input({ label, className = '', ...props }) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm text-white/80">{label}</label>}
      <input className={`input-field ${className}`} {...props} />
    </div>
  );
}
