export default function AnimalAvatar({ photo, name, size = 48 }) {
  const initial = (name || "?").charAt(0).toUpperCase();

  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        style={{ width: size, height: size }}
        className="rounded-2xl object-cover"
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-2xl bg-farm-green/10 text-farm-green flex items-center justify-center font-bold text-lg"
    >
      {initial}
    </div>
  );
}
