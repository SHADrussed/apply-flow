import { Plus } from "lucide-react";
import Header from "../components/Header/Header";
import {
  AddButton,
  Page,
  SearchBlock,
  SearchIcon,
  SearchInput,
  Toolbar,
} from "./VacanciesPage.styled";
import { useState } from "react";
import KanbanBoard from "../components/KanbanBoard/KanbanBoard";
import { statuses, vacancies } from "../data/vacancies";

export default function VacanciesPage() {
  const [search, setSearch] = useState("");

  const normalizedSearch = search.toLowerCase();

  const filteredVacancies = vacancies.filter(
    (vacancy) =>
      vacancy.company.toLowerCase().includes(normalizedSearch) ||
      vacancy.position.toLowerCase().includes(normalizedSearch),
  );
  return (
    <Page>
      <Header
        title="Vacancies"
        description="Track and manage your applications"
      />
      <Toolbar>
        <SearchBlock>
          <SearchIcon />
          <SearchInput
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search vacancies..."
          />
        </SearchBlock>
        <AddButton to="/vacancies/new">
          <Plus size={18} />
          Add vacancy
        </AddButton>
      </Toolbar>
      <KanbanBoard vacancies={filteredVacancies} statuses={statuses} />
    </Page>
  );
}
