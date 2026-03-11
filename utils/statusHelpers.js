import { STATUSES } from "./constants";

export function getStatusColor(status) {
  switch (status) {
    case STATUSES.IN_TRANSIT:
      return "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20";
    case STATUSES.DELAYED:
      return "bg-red-500/10 text-red-400 border border-red-500/20";
    case STATUSES.DELIVERED:
      return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    case STATUSES.PENDING:
      return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    default:
      return "bg-gray-500/10 text-gray-400 border border-gray-500/20";
  }
}

export function getStatusDot(status) {
  switch (status) {
    case STATUSES.IN_TRANSIT:
      return "bg-cyan-400";
    case STATUSES.DELAYED:
      return "bg-red-400";
    case STATUSES.DELIVERED:
      return "bg-emerald-400";
    case STATUSES.PENDING:
      return "bg-amber-400";
    default:
      return "bg-gray-400";
  }
}

export function getStatusGlow(status) {
  switch (status) {
    case STATUSES.IN_TRANSIT:
      return "glow-cyan";
    case STATUSES.DELAYED:
      return "glow-red";
    case STATUSES.DELIVERED:
      return "glow-green";
    case STATUSES.PENDING:
      return "glow-amber";
    default:
      return "";
  }
}
