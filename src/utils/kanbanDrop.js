// Read layout only at drop time. Never reparent nodes or change React state
// while hovering: the DOM stays in the same order until the drop is committed.
export function getKanbanDrop(board, { operation, nativeEvent }) {
  const sourceId = operation.source.id;
  // In 0.5.0 PointerSensor schedules movement on a frame. pointerup contains
  // the final client coordinates even if the last dragmove has not run yet.
  const point = Number.isFinite(nativeEvent?.clientX)
    ? { x: nativeEvent.clientX, y: nativeEvent.clientY }
    : operation.position.current;
  if (!board || !Number.isFinite(point?.x) || !Number.isFinite(point?.y)) return null;

  const column = [...board.querySelectorAll("[data-kanban-column]")].find((element) => {
    const rect = element.getBoundingClientRect();
    return point.x >= rect.left && point.x < rect.right && point.y >= rect.top && point.y < rect.bottom;
  });
  if (!column) return null;

  const cards = [...column.querySelectorAll("[data-vacancy-id]")]
    .filter((element) => Number(element.dataset.vacancyId) !== sourceId);
  // The first midpoint below the cursor is the insertion anchor. This also
  // handles the heading, gaps, an empty column, and space after the last card.
  const anchor = cards.find((element) => {
    const rect = element.getBoundingClientRect();
    return point.y < rect.top + rect.height / 2;
  });
  return {
    sourceId,
    status: column.dataset.kanbanColumn,
    beforeId: anchor ? Number(anchor.dataset.vacancyId) : null,
  };
}
