import styled from "styled-components";
import { theme } from "../../styles/theme";
import { NavLink } from "react-router-dom";

export const RecentStyled = styled.div`
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
`;
export const RecentUpper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RecentTitle = styled.span`
  color: ${theme.colors.text};
`;
export const ViewAll = styled(NavLink)`
  padding: ${theme.spacing.sm};
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.sm};
  color: ${theme.colors.textMuted};
  &:hover {
    background-color: ${theme.colors.surfaceHover};
  }
`;

export const VacanciesList = styled.div``;
export const RecentVacancy = styled.div`
  color: ${theme.colors.textMuted};
  margin-top: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const VacancyCompany = styled.span``;

export const VacancyMoreInfo = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 1fr;
`;

export const VacancyLowerText = styled.span`
  color: ${theme.colors.text};
`;
