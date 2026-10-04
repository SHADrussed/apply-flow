import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Page = styled.div`
  background-color: ${theme.colors.background};
  min-height: 100vh;
  padding: ${theme.spacing.md};
`;

export const Title = styled.h1`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
`;
export const FormCard = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  gap: ${theme.spacing.md};
  flex-direction: column;
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.sm};
  padding: ${theme.spacing.lg};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  color: ${theme.colors.textMuted};
  margin: ${theme.spacing.md} 0;
`;

export const Input = styled.input`
  color-scheme: dark;

  width: 100%;
  min-height: 42px;
  padding: ${theme.spacing.sm} ${theme.spacing.md};

  color: ${theme.colors.text};
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.sm};

  outline: none;

  &:focus {
    border-color: ${theme.colors.accent};
  }
  &::-webkit-calendar-picker-indicator {
    opacity: 0.6;
    cursor: pointer;
  }
`;

export const Select = styled.select`
  color: ${theme.colors.text};
  padding: ${theme.spacing.sm};

  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.sm};
`;

export const ErrorText = styled.span`
  color: ${theme.colors.errorMessage};
  padding: ${theme.spacing.xs};
`;

export const SubmitButton = styled.button`
  margin: ${theme.spacing.lg} ${theme.spacing.lg} 0 ${theme.spacing.lg};

  color: ${theme.colors.text};
  padding: ${theme.spacing.sm};

  background-color: ${theme.colors.accent};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.sm};
  &:hover {
    background-color: ${theme.colors.accentHover};
  }
`;
