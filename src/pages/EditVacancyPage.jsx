import { useContext, useState } from "react";
import {
  ErrorText,
  Field,
  Form,
  FormCard,
  Input,
  Label,
  Page,
  Select,
  SubmitButton,
  Title,
} from "./CreateVacancyPage.styled";
import { BackLink } from "../styles/common";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { VacanciesContext } from "../contexts/VacanciesContext";

export default function EditVacancyPage() {
  const { statuses, getVacancy, updateVacancy } = useContext(VacanciesContext);
  const { id } = useParams();
  const vacancy = getVacancy(id);

  const [formData, setFormData] = useState({
    company: vacancy.company,
    position: vacancy.position,
    salary: vacancy.salary,
    status: vacancy.status,
    date: vacancy.date,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.company.trim() ||
      !formData.position.trim() ||
      !formData.date.trim()
    ) {
      setError("Company, position and date are required");
      return;
    }

    const updatedVacancy = {
      ...vacancy,
      ...formData,
    };

    updateVacancy(vacancy.id, updatedVacancy);
    navigate(`/vacancies/${vacancy.id}`);

    setError("");
  };

  return (
    <Page>
      <BackLink to="/vacancies">
        <ArrowLeft />
        Back to vacancies
      </BackLink>
      <Title>Add vacancy</Title>
      <FormCard>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>Company</Label>
            <Input
              placeholder="Vercel"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <Label>Position</Label>
            <Input
              placeholder="Frontend Developer"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <Label>Salary</Label>
            <Input
              placeholder="$3000–4000"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <Label>Status</Label>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
          </Field>
          <Field>
            <Label>Date</Label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Field>
          {error && <ErrorText>{error}</ErrorText>}
          <SubmitButton type="submit">Create</SubmitButton>
        </Form>
      </FormCard>
    </Page>
  );
}
