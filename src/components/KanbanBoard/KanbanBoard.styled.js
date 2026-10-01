import styled from "styled-components";
import { theme } from "../../styles/theme";

export const KanbanStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(220px, 1fr));
  gap: ${theme.spacing.md};

  margin-top: ${theme.spacing.md};
  padding: ${theme.spacing.lg};

  color: ${theme.colors.text};
`;
