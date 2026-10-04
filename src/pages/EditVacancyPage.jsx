import { useContext } from "react";
import { useParams } from "react-router-dom";
import { VacanciesContext } from "../contexts/VacanciesContext";
import EditVacancyForm from "../components/EditVacancyForm/EditVacancyForm";
import { Page } from "./VacancyDetailsPage.styled";

export default function EditVacancyPage() {
  const { getVacancy } = useContext(VacanciesContext);
  const { id } = useParams();
  const vacancy = getVacancy(id);

  if (!vacancy) {
    return <Page>Vacancy not found</Page>;
  }

  return <EditVacancyForm vacancy={vacancy} />;
}
