// Keep usable records from older storage, including numeric IDs saved as strings.
export function sanitizeVacancies(records, statuses) {
  const seen = new Set();
  return records.flatMap((record) => {
    if (!record || typeof record !== "object") return [];
    const id = typeof record.id === "string" && record.id.trim()
      ? Number(record.id) : record.id;
    if (!Number.isSafeInteger(id) || id <= 0 || seen.has(id) ||
        typeof record.company !== "string" || !record.company.trim() ||
        typeof record.position !== "string" || !record.position.trim() ||
        typeof record.date !== "string" || !Number.isFinite(Date.parse(record.date))) {
      return [];
    }
    seen.add(id);
    return [{
      ...record,
      id,
      status: statuses.includes(record.status) ? record.status : "Saved",
      salary: typeof record.salary === "string" ? record.salary : "",
      time: typeof record.time === "string" ? record.time : "",
    }];
  });
}

export function moveVacancy(items, sourceId, status, beforeId, visibleIds, statuses) {
  const source = items.find((item) => item.id === sourceId);
  if (!source || !statuses.includes(status) || !visibleIds.includes(sourceId)) return items;

  const column = items.filter((item) => item.status === status && visibleIds.includes(item.id));
  // Remove the source FIRST: insertion indices must refer to the remaining
  // cards, otherwise moving down is off by one.
  const reordered = column.filter((item) => item.id !== sourceId);
  const to = beforeId === null ? reordered.length : reordered.findIndex((item) => item.id === beforeId);
  if (to < 0) return items;
  reordered.splice(to, 0, { ...source, status });
  if (source.status === status && column.every((item, index) => item.id === reordered[index].id)) return items;

  let index = 0;
  const next = [];
  for (const item of items) {
    if (item.id === sourceId && source.status !== status) continue;
    if (item.status === status && visibleIds.includes(item.id)) {
      next.push(reordered[index++]);
    } else {
      next.push(item);
    }
  }
  // One extra item on a cross-column move (or an empty destination).
  if (index < reordered.length) next.push(...reordered.slice(index));
  return next;
}
