import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import AppRoutes from "./AppRoutes";
import { GlobalStyles } from "../styles/GlobalStyles";
import VacanciesProvider from "../contexts/VacanciesProvider";

function App() {
  return (
    <VacanciesProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppRoutes />
      </ThemeProvider>
    </VacanciesProvider>
  );
}

export default App;
