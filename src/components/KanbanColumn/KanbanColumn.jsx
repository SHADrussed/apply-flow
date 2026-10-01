import VacancyCard from "../VacancyCard/VacancyCard";
import { ColumnStyled, ColumnTitle, VacancyCards } from "./KanbanColumn.styled";

export default function KanbanColumn({ title, vacancies }) {
  return (
    <ColumnStyled>
      <ColumnTitle>{title}</ColumnTitle>
      <VacancyCards>
        {vacancies.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        ))}
      </VacancyCards>
    </ColumnStyled>
  );
}
