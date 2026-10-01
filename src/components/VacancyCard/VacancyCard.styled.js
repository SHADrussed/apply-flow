import styled from "styled-components";
import { theme } from "../../styles/theme";
import { Link } from "react-router-dom";

export const Text = styled.span`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
`;

export const TextMuted = styled.span`
  color: ${theme.colors.textMuted};
`;

export const Card = styled(Link)`
  padding: ${theme.spacing.md};
  display: flex;
  flex-wrap: wrap;
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

export const CompanyBadge = styled.img`
  flex: 1;
`;

export const CompanyDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardMeta = styled.div`
  margin-top: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;
