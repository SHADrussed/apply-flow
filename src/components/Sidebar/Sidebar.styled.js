import styled from "styled-components";
import { theme } from "../../styles/theme";

export const IconBlock = styled.img`
  display: flex;
  flex-wrap: wrap;
  height: 25px;
`;

export const SidebarBlock = styled.div`
  width: 240px;
  min-height: 100vh;
  background-color: ${theme.colors.surface};
  border-right: 1px ${theme.colors.border};
  padding: ${theme.spacing.lg};
`;
export const LogoBlock = styled.div`
  padding: ${theme.spacing.sm};
`;

export const NavigaionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;
export const Link = styled.a`
  background-color: ${theme.colors.background};
  color: ${({ $accent }) =>
    $accent ? theme.colors.accent : theme.colors.surface};
  :hover {
    color: ${theme.colors.surfaceHover};
  }
`;
