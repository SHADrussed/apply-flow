import { useState } from "react";
import {
  Field,
  Form,
  Input,
  Label,
  Page,
  Select,
} from "./CreateVacancyPage.styled";
import { statuses } from "../data/vacancies";

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

  return (
    <Page>
      <Form onSubmit={""}>
        <Field>
          <Label>Company</Label>
          <Input
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Label>Position</Label>
          <Input
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Label>Salary</Label>
          <Input
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Label>Status</Label>
          <Select name="status" value={formData.status} onChange={handleChange}>
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
      </Form>
    </Page>
  );
}
