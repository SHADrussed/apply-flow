import styled from "styled-components";
import { theme } from "../../styles/theme";

export const InterviewDialogWrapper = styled.dialog`
  margin: auto;
  background: transparent;
  border: none;
  padding: 0;
  &::backdrop {
    background-color: ${theme.colors.popUpBackground};
  }
`;
export const DialogContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  box-sizing: border-box;
  max-width: 400px;
  width: 100%;
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.surface};
  border-radius: ${theme.radius.md};
  color: ${theme.colors.text};
`;
