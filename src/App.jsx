import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Vacancy from "./components/Vacancy";
import VacanciesPage from "./pages/VacanciesPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="/vacancies" element={<VacanciesPage />}></Route>
            <Route path="/vacancies/:id" element={<Vacancy />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
