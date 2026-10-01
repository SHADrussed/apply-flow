import KanbanColumn from "../KanbanColumn/KanbanColumn";
import { KanbanStyled } from "./KanbanBoard.styled";

export default function KanbanBoard({ vacancies, statuses }) {
  const statusesVacancies = statuses.map((status) => ({
    status,
    columnVacancies: vacancies.filter((vacancy) => vacancy.status === status),
  }));
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
