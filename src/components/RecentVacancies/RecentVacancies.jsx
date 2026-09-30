import { vacancies } from "../../data/vacancies";
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
  return (
    <RecentStyled>
      <RecentUpper>
        <RecentTitle>Recent vacancies</RecentTitle>
        <ViewAll to="/vacancies">View all</ViewAll>
      </RecentUpper>
      <VacanciesList>
        {vacancies.map((vacancy) => (
          <RecentVacancy key={vacancy.id}>
            <VacancyCompany>{vacancy.company}</VacancyCompany>
            <VacancyMoreInfo>
              <VacancyLowerText>{vacancy.position}</VacancyLowerText>
              <VacancyLowerText>{vacancy.status}</VacancyLowerText>
              <VacancyLowerText>{vacancy.date}</VacancyLowerText>
            </VacancyMoreInfo>
          </RecentVacancy>
        ))}
      </VacanciesList>
    </RecentStyled>
  );
}
