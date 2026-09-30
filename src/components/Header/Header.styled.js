import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StyledHeader = styled.header`
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.surface};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${theme.spacing.md};
  height: 80px;
`;
export const TitleText = styled.h2`
  color: ${theme.colors.text};
`;
export const HeaderDescription = styled.p`
  color: ${theme.colors.text};
`;
