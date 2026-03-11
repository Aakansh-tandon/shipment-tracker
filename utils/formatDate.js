export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function daysRemaining(etaStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eta = new Date(etaStr);
  eta.setHours(0, 0, 0, 0);
  const diff = Math.ceil((eta - today) / (1000 * 60 * 60 * 24));
  return diff;
}
