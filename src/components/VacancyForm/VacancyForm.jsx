import { useState } from "react";
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
} from "./VacancyForm.styled";
import { BackLink } from "../../styles/common";
import { ArrowLeft } from "lucide-react";

export default function VacancyForm({
  initialData,
  onSubmit,
  statuses,
  title,
  submitLabel,
}) {
  const [formData, setFormData] = useState({
    company: initialData.company,
    position: initialData.position,
    salary: initialData.salary,
    status: initialData.status,
    date: initialData.date,
    interviewAt: initialData.interviewAt ?? "",
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    if (!formData.company.trim()) {
      errors.company = "Company is required";
    }

    if (!formData.position.trim()) {
      errors.position = "Position is required";
    }

    if (!formData.date.trim()) {
      errors.date = "Date is required";
    }

    if (formData.status === "Interview" && !formData.interviewAt.trim()) {
      errors.interviewAt = "Interview date and time are required";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <Page>
      <BackLink to="/vacancies">
        <ArrowLeft />
        Back to vacancies
      </BackLink>
      <Title>{title}</Title>
      <FormCard>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>Company</Label>
            <Input
              id="company"
              placeholder="Vercel"
              name="company"
              value={formData.company}
              onChange={handleChange}
              $isError={!!fieldErrors.company}
              aria-invalid={Boolean(fieldErrors.company)}
              aria-describedby={
                fieldErrors.company ? "company-error" : undefined
              }
            />
            {fieldErrors.company && (
              <ErrorText id="company-error">{fieldErrors.company}</ErrorText>
            )}
          </Field>
          <Field>
            <Label>Position</Label>
            <Input
              id="position"
              placeholder="Frontend Developer"
              name="position"
              value={formData.position}
              onChange={handleChange}
              $isError={!!fieldErrors.position}
              aria-invalid={Boolean(fieldErrors.position)}
              aria-describedby={
                fieldErrors.position ? "position-error" : undefined
              }
            />
            {fieldErrors.position && (
              <ErrorText id="position-error">{fieldErrors.position}</ErrorText>
            )}
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
          {/* Дата отклика — для всех вакансий */}
          <Field>
            <Label htmlFor="date">Application date</Label>
            <Input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              $isError={!!fieldErrors.date}
            />
            {fieldErrors.date && (
              <ErrorText id="date-error">{fieldErrors.date}</ErrorText>
            )}
          </Field>

          {/* Дата и время интервью — только для Interview */}
          {formData.status === "Interview" && (
            <Field>
              <Label htmlFor="interviewAt">Interview date and time</Label>
              <Input
                id="interviewAt"
                type="datetime-local"
                name="interviewAt"
                value={formData.interviewAt}
                onChange={handleChange}
                $isError={!!fieldErrors.interviewAt}
              />
              {fieldErrors.interviewAt && (
                <ErrorText id="interviewAt-error">
                  {fieldErrors.interviewAt}
                </ErrorText>
              )}
            </Field>
          )}
          <SubmitButton type="submit">{submitLabel}</SubmitButton>
        </Form>
      </FormCard>
    </Page>
  );
}
