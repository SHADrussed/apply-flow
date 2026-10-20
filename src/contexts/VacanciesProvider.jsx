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
    // Если пользователь отменил перетаскивание
    if (canceled || !operation) return;

    const { source, target } = operation;

    // Работаем только с сортируемыми карточками
    if (!isSortable(source)) return;

    const sourceId = Number(source.id);

    if (!Number.isFinite(sourceId)) return;

    setVacancies((prev) => {
      // Находим карточку, которую перетащили
      const draggedVacancy = prev.find((vacancy) => vacancy.id === sourceId);

      if (!draggedVacancy) return prev;

      // Определяем колонку, в которую перетащили карточку
      const targetVacancy = prev.find(
        (vacancy) => vacancy.id === Number(target?.id),
      );

      const targetStatus =
        source.group !== source.initialGroup && statuses.includes(source.group)
          ? source.group
          : statuses.includes(target?.id)
            ? target.id
            : (targetVacancy?.status ?? source.group);

      if (!statuses.includes(targetStatus)) return prev;

      // СЛУЧАЙ 1. Перенос в другую колонку.
      if (draggedVacancy.status !== targetStatus) {
        return prev.map((vacancy) =>
          vacancy.id === sourceId
            ? { ...vacancy, status: targetStatus }
            : vacancy,
        );
      }

      // СЛУЧАЙ 2. Перестановка внутри одной колонки.
      const fromIndex = source.initialIndex;
      const toIndex = source.index;

      if (fromIndex === toIndex) return prev;

      // Получаем только карточки нужной колонки.
      const columnVacancies = prev.filter(
        (vacancy) => vacancy.status === targetStatus,
      );

      // Проверяем, что индексы существуют.
      if (
        !Number.isInteger(fromIndex) ||
        !Number.isInteger(toIndex) ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= columnVacancies.length ||
        toIndex >= columnVacancies.length
      ) {
        return prev;
      }

      // Переставляем карточки внутри колонки.
      const reorderedColumn = reorder(columnVacancies, fromIndex, toIndex);

      let nextIndex = 0;

      // Возвращаем переставленные карточки в общий массив.
      return prev.map((vacancy) => {
        if (vacancy.status !== targetStatus) {
          return vacancy;
        }

        return reorderedColumn[nextIndex++];
      });
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
