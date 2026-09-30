import styled from "styled-components";
import { theme } from "../styles/theme";

export const DashboardStyled = styled.div`
  background-color: ${theme.colors.background};
  height: 100vh;
`;

export const StatsGrid = styled.div`
  display: flex;
`;
export const StatsGridElement = styled.span`
  color: ${theme.colors.text};
`;
