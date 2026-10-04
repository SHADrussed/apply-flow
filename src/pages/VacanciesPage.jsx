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
import { useContext } from "react";
import KanbanBoard from "../components/KanbanBoard/KanbanBoard";
import { VacanciesContext } from "../contexts/VacanciesContext";

export default function VacanciesPage() {
  const { search, changeSearch } = useContext(VacanciesContext);

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
            onChange={(event) => changeSearch(event.target.value)}
            placeholder="Search vacancies..."
          />
        </SearchBlock>
        <AddButton to="/vacancies/new">
          <Plus size={18} />
          Add vacancy
        </AddButton>
      </Toolbar>
      <KanbanBoard />
    </Page>
  );
}
