import VacancyCard from "../VacancyCard/VacancyCard";
import {
  ColumnStyled,
  ColumnTitle,
  EmptyState,
  VacancyCards,
} from "./KanbanColumn.styled";

export default function KanbanColumn({ title, vacancies }) {
  return (
    <ColumnStyled>
      <ColumnTitle>
        {title} <span>{vacancies.length}</span>
      </ColumnTitle>
      <VacancyCards>
        {vacancies.length === 0 ? (
          <EmptyState>No vacancies</EmptyState>
        ) : (
          vacancies.map((vacancy) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))
        )}
      </VacancyCards>
    </ColumnStyled>
  );
}
