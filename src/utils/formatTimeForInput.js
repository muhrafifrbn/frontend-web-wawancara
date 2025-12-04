export default function formatTimeForInput(time) {
  if (!time) return "";

  // timeString biasanya "14:30:00"
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}`; // hasil: "14:30"
}
