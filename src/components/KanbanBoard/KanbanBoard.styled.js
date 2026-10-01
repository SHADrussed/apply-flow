import styled from "styled-components";
import { theme } from "../../styles/theme";

export const KanbanStyled = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: ${theme.spacing.md};
  padding: ${theme.spacing.lg};

  color: ${theme.colors.text};
`;
