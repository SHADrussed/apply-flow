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
      if (!vacancy.interviewAt) return false;

      const interviewDate = new Date(vacancy.interviewAt);

      return (
        !Number.isNaN(interviewDate.getTime()) && interviewDate > new Date()
      );
    })
    .sort((a, b) => new Date(a.interviewAt) - new Date(b.interviewAt));

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
              <VacancyText>
                {new Date(vacancy.interviewAt).toLocaleDateString("ru-RU")}
              </VacancyText>
              <VacancyText>
                {new Date(vacancy.interviewAt).toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </VacancyText>

              <VacancyImportant>{vacancy.company}</VacancyImportant>
              <VacancyImportant>{vacancy.position}</VacancyImportant>
            </UpcomingVacancy>
          ))
        )}
      </UpcomingList>
    </UpcomingStyled>
  );
}
