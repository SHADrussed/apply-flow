import { BrowserRouter, Routes, Route } from "react-router-dom";
import VacanciesPage from "../pages/VacanciesPage";
import AppLayout from "../layout/AppLayout";
import VacancyDetailsPage from "../pages/VacancyDetailsPage";
import DashboardPage from "../pages/DashboardPage";
import CreateVacancyPage from "../pages/CreateVacancyPage";
import EditVacancyPage from "../pages/EditVacancyPage";

function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="vacancies" element={<VacanciesPage />} />
            <Route path="vacancies/:id" element={<VacancyDetailsPage />} />
            <Route path="vacancies/new" element={<CreateVacancyPage />} />
            <Route path="vacancies/:id/edit" element={<EditVacancyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
