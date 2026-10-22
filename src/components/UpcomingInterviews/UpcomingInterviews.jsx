import { useContext } from "react";
import { VacanciesContext } from "../../contexts/VacanciesContext";
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
  const { vacancies } = useContext(VacanciesContext);
  const upcomingInterviews = vacancies
    .filter((vacancy) => vacancy.status === "Interview")
    .filter((vacancy) => {
      if (!vacancy.date || !vacancy.time) return false;

      const interviewDate = new Date(`${vacancy.date}T${vacancy.time}`);

      return (
        !Number.isNaN(interviewDate.getTime()) && interviewDate > new Date()
      );
    })
    .sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`),
    );

  return (
    <UpcomingStyled>
      <UpcomingUpper>
        <UpcomingTitle>Upcoming interviews</UpcomingTitle>
      </UpcomingUpper>
      <UpcomingList>
        {upcomingInterviews.length === 0 ? (
          <VacancyText>No upcoming interviews.</VacancyText>
        ) : (
          upcomingInterviews.map((vacancy) => (
            <UpcomingVacancy key={vacancy.id}>
              <VacancyText>{vacancy.date}</VacancyText>
              <VacancyText>{vacancy.time}</VacancyText>

              <VacancyImportant>{vacancy.company}</VacancyImportant>
              <VacancyImportant>{vacancy.position}</VacancyImportant>
            </UpcomingVacancy>
          ))
        )}
      </UpcomingList>
    </UpcomingStyled>
  );
}
