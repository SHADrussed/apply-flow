import { useEffect, useState } from "react";
import { VacanciesContext } from "./VacanciesContext";
import { isSortable } from "@dnd-kit/react/sortable";
import { sanitizeVacancies, moveVacancy } from "../utils/vacancies";

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
  const [vacancies, setVacancies] = useState(() => {
    try {
      const saved = localStorage.getItem("vacancies");

      if (!saved) {
        return initialVacancies;
      }

      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return sanitizeVacancies(parsed, statuses);
      }
      return initialVacancies;
    } catch (error) {
      console.warn("Ошибка загрузки вакансий", error);
      return initialVacancies;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("vacancies", JSON.stringify(vacancies));
    } catch (error) {
      console.warn("Ошибка сохранения вакансий", error);
    }
  }, [vacancies]);

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
    const numericId = Number(id);
    return vacancies.find((vacancy) => vacancy.id === numericId);
  }
  function updateVacancy(id, updatedData) {
    const numericId = Number(id);

    setVacancies((prev) =>
      prev.map((vacancy) =>
        vacancy.id === numericId
          ? {
              ...vacancy,
              ...updatedData,
              id: numericId,
            }
          : vacancy,
      ),
    );
  }
  function deleteVacancy(id) {
    const numericId = Number(id);

    setVacancies((prev) => prev.filter((vacancy) => vacancy.id !== numericId));
  }

  function handleDragEnd({ canceled, operation }) {
    if (canceled || !operation?.target || !isSortable(operation.source)) return;

    // Optimistic DOM sorting is prevented by KanbanBoard. Snapshot IDs, not
    // mutable DnD instances, before React runs the state updater.
    const sourceId = operation.source.id;
    const targetId = operation.target.id;
    const visibleIds = filteredVacancies.map((vacancy) => vacancy.id);
    setVacancies((prev) => moveVacancy(prev, sourceId, targetId, visibleIds, statuses));
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
        deleteVacancy,
        handleDragEnd,
      }}
    >
      {children}
    </VacanciesContext.Provider>
  );
}
export default VacanciesProvider;
