import { useState } from "react";
import { VacanciesContext } from "./VacanciesContext";

const initialVacancies = [
  {
    id: 1,
    company: "Vercel",
    position: "Frontend Developer",
    status: "Interview",
    salary: "$3000–4000",
    date: "Sep 28",
    time: "14:00",
  },
  {
    id: 2,
    company: "Linear",
    position: "Junior Frontend",
    status: "Applied",
    salary: "$2000",
    date: "Oct 14",
    time: "12:00",
  },
  {
    id: 3,
    company: "Sber",
    position: "Middle Frontend",
    status: "Rejected",
    salary: "$4000",
    date: "Nov 22",
    time: "12:00",
  },
  {
    id: 4,
    company: "OpenAi",
    position: "Senior Frontend",
    status: "Rejected",
    salary: "$5000",
    date: "Sep 22",
    time: "13:00",
  },
  {
    id: 5,
    company: "Microsoft",
    position: "Junior Frontend",
    status: "Interview",
    salary: "$2500-3000",
    date: "Jan 12",
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
    const columnVacancies = vacancies.filter(
      (vacancy) => vacancy.status === status,
    );

    return {
      status,
      columnVacancies,
    };
  });

  async function addVacancy(vacancyData) {
    setVacancies([...vacancies, vacancyData]);
  }
  async function changeSearch(search) {
    setSearch(search);
  }

  return (
    <VacanciesContext.Provider
      value={{
        filteredVacancies,
        statuses,
        statusesVacancies,
        addVacancy,
        changeSearch,
      }}
    >
      {children}
    </VacanciesContext.Provider>
  );
}
export default VacanciesProvider;
