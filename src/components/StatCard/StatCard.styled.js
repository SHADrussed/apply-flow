import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StatCardStyled = styled.div`
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${theme.colors.surfaceHover};
  }
`;
export const Title = styled.div`
  color: ${theme.colors.textMuted};
`;
export const Value = styled.div`
  color: ${theme.colors.textMuted};
  font-size: ${theme.size.lg};
`;
export const ChangeIndicator = styled.div`
  color: ${theme.colors.textMuted};
  font-size: ${theme.size.sm};
`;
