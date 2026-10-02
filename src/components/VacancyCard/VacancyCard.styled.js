import styled from "styled-components";
import { theme } from "../../styles/theme";
import { Link } from "react-router-dom";

export const Text = styled.span`
  color: ${theme.colors.text};
`;

export const TextMuted = styled.span`
  color: ${theme.colors.textMuted};
`;

export const Card = styled(Link)`
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;

  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};

  &:hover {
    background-color: ${theme.colors.surfaceHover};
    cursor: pointer;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

export const CompanyBadge = styled.div`
  width: 36px;
  height: 36px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${theme.colors.surfaceHover};
  border-radius: ${theme.radius.sm};
  color: ${theme.colors.text};
  font-weight: 600;
`;

export const CompanyDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

export const CardMeta = styled.div`
  margin-top: ${theme.spacing.lg};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
