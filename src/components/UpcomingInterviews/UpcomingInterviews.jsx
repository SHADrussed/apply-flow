import { vacancies } from "../../data/vacancies";
import {
  UpcomingStyled,
  UpcomingTitle,
  UpcomingUpper,
  UpcomingVacancy,
  VacancyImportant,
  VacancyText,
} from "./UpcomingInterviews.styled";

export default function UpcomingVacancies() {
  return (
    <UpcomingStyled>
      <UpcomingUpper>
        <UpcomingTitle>Upcoming interviews</UpcomingTitle>
      </UpcomingUpper>
      <UpcomingVacancies>
        {vacancies.map((vacancy) => (
          <UpcomingVacancy>
            <VacancyText>{vacancy.date}</VacancyText>
            <VacancyText>{vacancy.time}</VacancyText>

            <VacancyImportant>{vacancy.company}</VacancyImportant>
            <VacancyImportant>{vacancy.position}</VacancyImportant>
          </UpcomingVacancy>
        ))}
      </UpcomingVacancies>
    </UpcomingStyled>
  );
}
