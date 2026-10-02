import { useParams } from "react-router-dom";
import { Page, Text } from "./VacancyDetailsPage.styled";
import { vacancies } from "../data/vacancies";

export default function VacancyDetailsPage() {
  const vacancyId = Number(useParams().id);

  const vacancy = vacancies.find((vacancy) => vacancy.id === vacancyId);

  if (!vacancy) {
    return (
      <Page>
        <Text>Vacancy not found</Text>
      </Page>
    );
  }
  return (
    <Page>
      <Text>{vacancy.company}</Text>
    </Page>
  );
}
