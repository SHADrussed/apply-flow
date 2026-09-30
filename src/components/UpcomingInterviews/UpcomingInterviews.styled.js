import styled from "styled-components";
import { theme } from "../../styles/theme";

export const UpcomingStyled = styled.div`
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
`;
export const UpcomingUpper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UpcomingTitle = styled.span`
  color: ${theme.colors.text};
  padding: ${theme.spacing.xs};
`;
export const UpcomingVacancies = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;
export const UpcomingVacancy = styled.div`
  color: ${theme.colors.textMuted};
  margin-top: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  text-align: left;
`;
export const VacancyImportant = styled.span`
  color: ${theme.colors.text};
`;

export const VacancyText = styled.span`
  color: ${theme.colors.textMuted};
`;
