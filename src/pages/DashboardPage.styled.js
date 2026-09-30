import styled from "styled-components";
import { theme } from "../styles/theme";

export const DashboardStyled = styled.div`
  background-color: ${theme.colors.background};
  min-height: 100vh;
  padding: ${theme.spacing.md};
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: ${theme.spacing.md};
  gap: ${theme.spacing.md};
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 2fr 1fr;
  margin-top: ${theme.spacing.md};
  gap: ${theme.spacing.md};
`;
