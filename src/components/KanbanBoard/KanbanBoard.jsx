import { useContext, useRef } from "react";
import KanbanColumn from "../KanbanColumn/KanbanColumn";
import { KanbanStyled } from "./KanbanBoard.styled";
import { VacanciesContext } from "../../contexts/VacanciesContext";
import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { getKanbanDrop } from "../../utils/kanbanDrop";

export default function KanbanBoard() {
  const { statusesVacancies, handleDragEnd } = useContext(VacanciesContext);
  const boardRef = useRef(null);

  function onDragEnd(event) {
    if (event.canceled || !isSortable(event.operation.source)) return;
    const drop = getKanbanDrop(boardRef.current, event);
    if (drop) handleDragEnd(drop);
  }

  return (
    <DragDropProvider
      // React owns column children; optimistic sorting reparents them outside React.
      onDragOver={(event) => event.preventDefault()}
      onDragEnd={onDragEnd}
    >
      <KanbanStyled ref={boardRef}>
        {statusesVacancies.map((column) => (
          <KanbanColumn
            key={column.status}
            title={column.status}
            vacancies={column.columnVacancies}
          />
        ))}
      </KanbanStyled>
    </DragDropProvider>
  );
}
