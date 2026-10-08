import { useContext } from "react";
import KanbanColumn from "../KanbanColumn/KanbanColumn";
import { KanbanStyled } from "./KanbanBoard.styled";
import { VacanciesContext } from "../../contexts/VacanciesContext";
import { DndContext } from "@dnd-kit/core";

export default function KanbanBoard() {
  const { statusesVacancies } = useContext(VacanciesContext);

  function handleDragEnd(event) {
    console.log(event.active.id);
    console.log(event.over?.id);
  }
  function handleDragStart(event) {
    console.log(event.active.id);
    console.log(event.over?.id);
  }

  return (
    <DndContext>
      <KanbanStyled onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {statusesVacancies.map((column) => (
          <KanbanColumn
            key={column.status}
            title={column.status}
            vacancies={column.columnVacancies}
          />
        ))}
      </KanbanStyled>
    </DndContext>
  );
}
