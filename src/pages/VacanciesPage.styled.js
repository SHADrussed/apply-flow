import styled from "styled-components";
import { theme } from "../styles/theme";
import { Search } from "lucide-react";

export const Page = styled.div`
  background-color: ${theme.colors.background};
  min-height: 100vh;
  padding: ${theme.spacing.md};
`;

export const Toolbar = styled.div`
  display: flex;
  max-width: 450px;
  justify-content: space-between;
  margin-top: ${theme.spacing.md};
`;

export const SearchInput = styled(Search)`
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.sm};
  padding: ${theme.spacing.md};
  color: ${theme.colors.text};
  min-width: 200px;
  &::placeholder {
    color: ${theme.colors.text};
  }
`;
export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.sm};

  &:hover {
    background-color: ${theme.colors.surfaceHover};
  }

  color: ${theme.colors.text};
  padding: ${theme.spacing.sm};
`;
