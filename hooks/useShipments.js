"use client";

import { useSelector } from "react-redux";
import { useMemo } from "react";
import { PAGE_SIZE } from "@/utils/constants";

export default function useShipments() {
  const { shipments, filters, currentPage } = useSelector(
    (state) => state.shipments
  );

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      const matchesStatus =
        filters.status === "All" || s.status === filters.status;
      const matchesCarrier =
        filters.carrier === "All" || s.carrier === filters.carrier;
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        s.id.toLowerCase().includes(query) ||
        s.destination.toLowerCase().includes(query) ||
        s.origin.toLowerCase().includes(query);
      return matchesStatus && matchesCarrier && matchesSearch;
    });
  }, [shipments, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const stats = useMemo(() => {
    return {
      total: shipments.length,
      inTransit: shipments.filter((s) => s.status === "In Transit").length,
      delayed: shipments.filter((s) => s.status === "Delayed").length,
      delivered: shipments.filter((s) => s.status === "Delivered").length,
      pending: shipments.filter((s) => s.status === "Pending").length,
    };
  }, [shipments]);

  return { filtered, paginated, stats, totalPages, currentPage };
}
