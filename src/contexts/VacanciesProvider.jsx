import { useEffect, useState } from "react";
import { VacanciesContext } from "./VacanciesContext";
import { isSortable } from "@dnd-kit/react/sortable";

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
        return parsed;
      }
      return initialVacancies;
    } catch (error) {
      console.warn("Ошибка загрузки вакансий", error);
      return initialVacancies;
    }
  });

  useEffect(() => {
    localStorage.setItem("vacancies", JSON.stringify(vacancies));
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
    const { source } = operation;

    if (isSortable(source)) {
      console.log({
        initialIndex: source.initialIndex,
        index: source.index,
        initialGroup: source.initialGroup,
        group: source.group,
      });
    }

    if (canceled) return;

    const sourceId = Number(operation?.source?.id);
    const targetStatus = operation?.target?.id;

    if (!Number.isFinite(sourceId) || !statuses.includes(targetStatus)) {
      return;
    }

    setVacancies((prev) => {
      const currentVacancy = prev.find((vacancy) => vacancy.id === sourceId);

      if (!currentVacancy || currentVacancy.status === targetStatus) {
        return prev;
      }

      return prev.map((vacancy) =>
        vacancy.id === sourceId
          ? { ...vacancy, status: targetStatus }
          : vacancy,
      );
    });
  }

  function reorder(items, fromIndex, toIndex) {
    const columnItems = [...items];
    const [removed] = columnItems.splice(fromIndex, 1);

    columnItems.splice(toIndex, 0, removed);
    return columnItems;
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
        reorder,
      }}
    >
      {children}
    </VacanciesContext.Provider>
  );
}
export default VacanciesProvider;
