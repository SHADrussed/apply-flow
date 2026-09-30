import styled from "styled-components";
import { theme } from "../../styles/theme";
import { NavLink } from "react-router-dom";

export const IconBlock = styled.img`
  display: flex;
  flex-wrap: wrap;
  height: 25px;
`;

export const SidebarBlock = styled.div`
  width: 240px;
  min-height: 100vh;
  background-color: ${theme.colors.surface};
  border-right: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.lg};
`;
export const LogoBlock = styled.div`
  padding: ${theme.spacing.sm};
`;

export const NavigationBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;
export const NavigationLink = styled(NavLink)`
  background-color: ${theme.colors.background};
  &:hover {
    background-color: ${theme.colors.surfaceHover};
    color: ${theme.colors.accent};
  }
`;
