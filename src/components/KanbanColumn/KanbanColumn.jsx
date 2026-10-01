import { ColumnStyled, ColumnTitle } from "./KanbanColumn.styled";

export default function KanbanColumn({ title, vacancies }) {
  return (
    <ColumnStyled>
      <ColumnTitle>{title}</ColumnTitle>
      {vacancies.map((vacancy) => (
        <span>{vacancy.company}</span>
      ))}
    </ColumnStyled>
  );
}
