import { useContext } from "react";
import { VacanciesContext } from "../../contexts/VacanciesContext";
import {
  RecentStyled,
  RecentTitle,
  RecentUpper,
  RecentVacancy,
  VacanciesList,
  VacancyCompany,
  VacancyLowerText,
  VacancyMoreInfo,
  ViewAll,
} from "./RecentVacancies.styled";

export default function RecentVacancies() {
  const { vacancies } = useContext(VacanciesContext);
  const recentVacancies = [...vacancies]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <RecentStyled>
      <RecentUpper>
        <RecentTitle>Recent vacancies</RecentTitle>
        <ViewAll to="/vacancies">View all</ViewAll>
      </RecentUpper>
      <VacanciesList>
        {recentVacancies.length > 0 ? (
          recentVacancies.map((vacancy) => (
            <RecentVacancy key={vacancy.id}>
              <VacancyCompany>{vacancy.company}</VacancyCompany>
              <VacancyMoreInfo>
                <VacancyLowerText>{vacancy.position}</VacancyLowerText>
                <VacancyLowerText>{vacancy.status}</VacancyLowerText>
                <VacancyLowerText>{vacancy.date}</VacancyLowerText>
              </VacancyMoreInfo>
            </RecentVacancy>
          ))
        ) : (
          <p>No vacancies yet. Add your first vacancy!</p>
        )}
      </VacanciesList>
    </RecentStyled>
  );
}
