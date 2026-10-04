import { useState } from "react";
import { VacanciesContext } from "./VacanciesContext";

const initialVacancies = [
  {
    id: 1,
    company: "Vercel",
    position: "Frontend Developer",
    status: "Interview",
    salary: "$3000–4000",
    date: "2026-09-28",
    time: "14:00",
  },
  {
    id: 2,
    company: "Linear",
    position: "Junior Frontend",
    status: "Applied",
    salary: "$2000",
    date: "2026-09-26",
    time: "12:00",
  },
  {
    id: 3,
    company: "Sber",
    position: "Middle Frontend",
    status: "Rejected",
    salary: "$4000",
    date: "2026-09-30",
    time: "12:00",
  },
  {
    id: 4,
    company: "OpenAi",
    position: "Senior Frontend",
    status: "Rejected",
    salary: "$5000",
    date: "2026-09-28",
    time: "13:00",
  },
  {
    id: 5,
    company: "Microsoft",
    position: "Junior Frontend",
    status: "Interview",
    salary: "$2500-3000",
    date: "2026-10-31",
    time: "11:45",
  },
];
const statuses = ["Saved", "Applied", "Interview", "Offer", "Rejected"];

function VacanciesProvider({ children }) {
  const [vacancies, setVacancies] = useState(initialVacancies);

  const [search, setSearch] = useState("");

  const normalizedSearch = search.toLowerCase();

  const filteredVacancies = vacancies.filter(
    (vacancy) =>
      vacancy.company.toLowerCase().includes(normalizedSearch) ||
      vacancy.position.toLowerCase().includes(normalizedSearch),
  );

  const statusesVacancies = statuses.map((status) => {
    const columnVacancies = filteredVacancies.filter(
      (vacancy) => vacancy.status === status,
    );

    return {
      status,
      columnVacancies,
    };
  });

  function addVacancy(vacancyData) {
    setVacancies((prev) => [...prev, vacancyData]);
  }
  function changeSearch(search) {
    setSearch(search);
  }
  function getVacancy(id) {
    return vacancies.find((vacancy) => vacancy.id === Number(id));
  }
  function updateVacancy(id, updatedData) {
    setVacancies((prev) =>
      prev.map((vacancy) =>
        vacancy.id === Number(id) ? updatedData : vacancy,
      ),
    );
  }

  return (
    <VacanciesContext.Provider
      value={{
        filteredVacancies,
        statuses,
        statusesVacancies,
        addVacancy,
        search,
        changeSearch,
        getVacancy,
        updateVacancy,
      }}
    >
      {children}
    </VacanciesContext.Provider>
  );
}
export default VacanciesProvider;
