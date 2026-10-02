import { useState } from "react";
import { Input, Select } from "./CreateVacancyPage.styled";
import { Page } from "./VacancyDetailsPage.styled";

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
      <Input name="company" value={formData.company} onChange={handleChange} />
      <Input
        name="position"
        value={formData.position}
        onChange={handleChange}
      />
      <Input name="salary" value={formData.salary} onChange={handleChange} />
      <Select name="status" value={formData.status} onChange={handleChange} />
      <Input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
    </Page>
  );
}
