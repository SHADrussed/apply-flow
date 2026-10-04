import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Page } from "./VacancyDetailsPage.styled";
import VacancyForm from "../components/VacancyForm/VacancyForm";
import { VacanciesContext } from "../contexts/VacanciesContext";
import { BackLink } from "../styles/common";
import { ArrowLeft } from "lucide-react";

export default function EditVacancyPage() {
  const { updateVacancy, statuses, getVacancy } = useContext(VacanciesContext);
  const { id } = useParams();
  const vacancy = getVacancy(id);
  const navigate = useNavigate();

  if (!vacancy) {
    return (
      <Page>
        <BackLink to="/vacancies">
          <ArrowLeft />
          Back to vacancies
        </BackLink>
        <span>Vacancy not found</span>
      </Page>
    );
  }
  function onSubmit(formData) {
    updateVacancy(id, formData);
    navigate(`/vacancies/${vacancy.id}`);
  }

  return (
    <VacancyForm
      initialData={vacancy}
      onSubmit={onSubmit}
      statuses={statuses}
      title="Edit vacancy"
      submitLabel="Save changes"
    />
  );
}
