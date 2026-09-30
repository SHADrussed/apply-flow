import styled from "styled-components";
import { theme } from "../styles/theme";

export const DashboardStyled = styled.div`
  background-color: ${theme.colors.background};
  height: 100vh;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: ${theme.spacing.md};
  gap: ${theme.spacing.md};
`;
