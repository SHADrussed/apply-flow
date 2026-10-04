import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Page } from "./VacancyDetailsPage.styled";
import VacancyForm from "../components/VacancyForm/VacancyForm";
import { VacanciesContext } from "../contexts/VacanciesContext";

export default function EditVacancyPage() {
  const { getVacancy } = useContext(VacanciesContext);
  const { id } = useParams();
  const vacancy = getVacancy(id);
  const { updateVacancy } = useContext(VacanciesContext);
  const navigate = useNavigate();

  function onSubmit(formData) {
    updateVacancy(id, formData);
    navigate(`/vacancies/${vacancy.id}`);
  }

  if (!vacancy) {
    return <Page>Vacancy not found</Page>;
  }

  return <VacancyForm initialData={vacancy} onSubmit={onSubmit} />;
}
