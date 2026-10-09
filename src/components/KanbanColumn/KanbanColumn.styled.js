import styled from "styled-components";
import { theme } from "../../styles/theme";

export const ColumnStyled = styled.div``;

export const ColumnTitle = styled.h2`
  margin-bottom: ${theme.spacing.md};
`;
export const EmptyState = styled.div`
  color: ${theme.colors.textMuted};
  border: 1px dashed ${theme.colors.border};
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.md};
  text-align: center;
`;

export const VacancyCards = styled.div`
  display: grid;
  gap: ${theme.spacing.md};

  background-color: ${({ $isOver }) =>
    $isOver ? theme.colors.surfaceHover : theme.colors.background};

  border: 1px solid
    ${({ $isOver }) => ($isOver ? theme.colors.accent : "transparent")};

  border-radius: ${theme.radius.md};
  transition:
    background-color 150ms ease,
    border-color 150ms ease;
`;
