import { vacancies } from "../../data/vacancies";
import {
  UpcomingStyled,
  UpcomingTitle,
  UpcomingUpper,
  UpcomingList,
  UpcomingVacancy,
  VacancyImportant,
  VacancyText,
} from "./UpcomingInterviews.styled";

export default function UpcomingInterviews() {
  return (
    <UpcomingStyled>
      <UpcomingUpper>
        <UpcomingTitle>Upcoming interviews</UpcomingTitle>
      </UpcomingUpper>
      <UpcomingList>
        {vacancies.map((vacancy) => (
          <UpcomingVacancy key={vacancy.id}>
            <VacancyText>{vacancy.date}</VacancyText>
            <VacancyText>{vacancy.time}</VacancyText>

            <VacancyImportant>{vacancy.company}</VacancyImportant>
            <VacancyImportant>{vacancy.position}</VacancyImportant>
          </UpcomingVacancy>
        ))}
      </UpcomingList>
    </UpcomingStyled>
  );
}
