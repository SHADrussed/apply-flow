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
        <AddButton>
          <Plus size={18} />
          Add vacancy
        </AddButton>
      </Toolbar>
      <KanbanBoard vacancies={vacancies} statuses={statuses} />
    </Page>
  );
}
