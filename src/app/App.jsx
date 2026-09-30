import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import AppRoutes from "./AppRoutes";
import { GlobalStyles } from "../styles/GlobalStyles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
