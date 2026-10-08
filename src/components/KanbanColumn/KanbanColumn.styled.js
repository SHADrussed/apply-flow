import styled from "styled-components";
import { theme } from "../../styles/theme";

export const ColumnStyled = styled.div`
  background-color: ${(props) =>
    props.isOver ? props.theme.colors.surface : props.theme.colors.backgound};
`;

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
`;
