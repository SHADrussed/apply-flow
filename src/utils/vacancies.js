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

export function moveVacancy(items, sourceId, targetId, visibleIds, statuses) {
  const source = items.find((item) => item.id === sourceId);
  const target = items.find((item) => item.id === targetId);
  const status = target?.status ?? (statuses.includes(targetId) ? targetId : null);
  if (!source || !status || sourceId === targetId ||
      !visibleIds.includes(sourceId) || (target && !visibleIds.includes(targetId))) return items;

  const column = items.filter((item) => item.status === status && visibleIds.includes(item.id));
  const from = column.findIndex((item) => item.id === sourceId);
  const to = target ? column.findIndex((item) => item.id === targetId) : column.length;
  const reordered = column.filter((item) => item.id !== sourceId);
  // Within a column, dropping on a card takes its index. Across columns,
  // insert before the target; dropping on column space appends.
  reordered.splice(to, 0, { ...source, status });
  if (source.status === status && (from === to || from === reordered.length - 1 && !target)) return items;

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
