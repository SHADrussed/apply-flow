import styled from "styled-components";
import { theme } from "../styles/theme";

export const Page = styled.div`
  background-color: ${theme.colors.background};
  min-height: 100vh;
  padding: ${theme.spacing.md};
`;
export const Text = styled.span`
  color: ${theme.colors.text};
`;
