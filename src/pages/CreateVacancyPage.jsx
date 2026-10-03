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
import { VacanciesContext } from "../сontexts/VacanciesContext";

export default function CreateVacancyPage() {
  const { statuses, addVacancy } = useContext(VacanciesContext);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    salary: "",
    status: statuses[0],
    date: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.company.trim() || !formData.position.trim()) {
      setError("Company and position are required");
      return;
    }

    const newVacancy = {
      id: Date.now(),
      ...formData,
    };

    addVacancy(newVacancy);

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
          <SubmitButton onClick={handleSubmit}>Create</SubmitButton>
        </Form>
      </FormCard>
    </Page>
  );
}
