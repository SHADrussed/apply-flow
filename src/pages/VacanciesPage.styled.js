import styled from "styled-components";
import { theme } from "../styles/theme";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export const Page = styled.div`
  background-color: ${theme.colors.background};
  min-height: 100vh;
  padding: ${theme.spacing.md};
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;
export const SearchBlock = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  flex: 1;

  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.sm};
  padding: 0 ${theme.spacing.md};

  &:focus-within {
    border-color: ${theme.colors.accent};
  }
`;

export const SearchIcon = styled(Search)`
  flex-shrink: 0;
  color: ${theme.colors.textMuted};
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 0;

  padding: ${theme.spacing.md} 0;

  background: transparent;
  border: none;
  outline: none;

  color: ${theme.colors.text};

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

export const AddButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background-color: ${theme.colors.accent};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.sm};

  &:hover {
    background-color: ${theme.colors.accentHover};
  }

  color: ${theme.colors.text};
  padding: ${theme.spacing.sm};
`;
