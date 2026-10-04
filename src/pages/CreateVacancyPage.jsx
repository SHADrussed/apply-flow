import { useContext } from "react";
import { VacanciesContext } from "../contexts/VacanciesContext";
import { useNavigate } from "react-router-dom";
import VacancyForm from "../components/VacancyForm/VacancyForm";

export default function CreateVacancyPage() {
  const { statuses } = useContext(VacanciesContext);
  const { addVacancy } = useContext(VacanciesContext);
  const navigate = useNavigate();

  const initialData = {
    company: "",
    position: "",
    salary: "",
    status: statuses[0],
    date: "",
  };

  function onSubmit(formData) {
    const newVacancy = {
      id: Date.now(),
      ...formData,
    };

    addVacancy(newVacancy);
    navigate("/vacancies");
  }

  return (
    <VacancyForm
      initialData={initialData}
      onSubmit={onSubmit}
      isEditing={false}
    />
  );
}
