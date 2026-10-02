import { useState } from "react";
import {
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
import { statuses } from "../data/vacancies";
import { BackLink } from "../styles/common";
import { ArrowLeft } from "lucide-react";

export default function CreateVacancyPage() {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    salary: "",
    status: "Saved",
    date: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
          <SubmitButton>Create</SubmitButton>
        </Form>
      </FormCard>
    </Page>
  );
}
