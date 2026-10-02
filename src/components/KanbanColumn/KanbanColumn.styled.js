import styled from "styled-components";
import { theme } from "../../styles/theme";
import { Text } from "../../styles/common";

export const ColumnStyled = styled.div``;

export const ColumnTitle = styled.h2`
  margin-bottom: ${theme.spacing.md};
`;
export const EmptyState = styled(Text)``;

export const VacancyCards = styled.div`
  display: grid;
  gap: ${theme.spacing.md};
`;
