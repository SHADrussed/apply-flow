import { useContext } from "react";
import { VacanciesContext } from "../../сontexts/VacanciesContext";
import KanbanColumn from "../KanbanColumn/KanbanColumn";
import { KanbanStyled } from "./KanbanBoard.styled";

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
