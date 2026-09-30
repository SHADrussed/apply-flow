import styled from "styled-components";
import { theme } from "../../styles/theme";
import { NavLink } from "react-router-dom";

export const SidebarBlock = styled.div`
  width: 240px;
  min-height: 100vh;
  background-color: ${theme.colors.surface};
  border-right: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.lg};
  color: ${theme.colors.text};
`;
export const LogoBlock = styled.div`
  padding-bottom: ${theme.spacing.lg};
`;

export const NavigationBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;
export const NavigationLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.radius.md};

  color: ${theme.colors.textMuted};
  &:hover {
    background-color: ${theme.colors.surfaceHover};
    color: ${theme.colors.text};
  }
  &.active {
    background-color: ${theme.colors.surfaceHover};
    color: ${theme.colors.accent};
  }
`;
