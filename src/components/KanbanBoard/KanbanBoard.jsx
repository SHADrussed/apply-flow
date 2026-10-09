import { useContext } from "react";
import KanbanColumn from "../KanbanColumn/KanbanColumn";
import { KanbanStyled } from "./KanbanBoard.styled";
import { VacanciesContext } from "../../contexts/VacanciesContext";
import { DragDropProvider } from "@dnd-kit/react";

export default function KanbanBoard() {
  const { statusesVacancies, handleDragEnd } = useContext(VacanciesContext);

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <KanbanStyled>
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
