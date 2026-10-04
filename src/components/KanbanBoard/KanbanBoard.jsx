import { useContext } from "react";
import KanbanColumn from "../KanbanColumn/KanbanColumn";
import { KanbanStyled } from "./KanbanBoard.styled";
import { VacanciesContext } from "../../contexts/VacanciesContext";

export default function KanbanBoard() {
  const { statusesVacancies } = useContext(VacanciesContext);

  return (
    <KanbanStyled>
      {statusesVacancies.map((column) => (
        <KanbanColumn
          key={column.status}
          title={column.status}
          vacancies={column.columnVacancies}
        />
      ))}
    </KanbanStyled>
  );
}
