import styled from "styled-components";
import { theme } from "../styles/theme";
import { Link } from "react-router-dom";

export const Page = styled.div`
  background-color: ${theme.colors.background};
  min-height: 100vh;
  padding: ${theme.spacing.md};

  color: ${theme.colors.text};
`;
export const Text = styled.span``;
export const BackLink = styled(Link)`
  color: ${theme.colors.accent};
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};
  width: 220px;
  /* Как правильно задать ширину? */
  padding: ${theme.spacing.md};
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};

  display: flex;
  align-items: center;
  &:hover {
    color: ${theme.colors.accentHover};
    background-color: ${theme.colors.surfaceHover};
  }
`;
export const DetailsCard = styled.div`
  /* Как правильно задать ширину? */
  width: 50vh;
  display: flex;
  gap: ${theme.spacing.md};
  flex-direction: column;
  color: ${theme.colors.text};
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};

  padding: ${theme.spacing.md};
`;
export const DetailsHeader = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

export const CompanyInfo = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-direction: column;
`;

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const CompanyName = styled.span``;
export const Position = styled.span``;
export const StatusBadge = styled.span``;
export const DetailsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing.xl};
`;
export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;
export const DetailLabel = styled.span`
  color: ${theme.colors.textMuted};
`;
export const DetailValue = styled.span`
  color: ${theme.colors.text};
`;
