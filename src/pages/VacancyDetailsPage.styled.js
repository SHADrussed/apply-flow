import styled from "styled-components";
import { theme } from "../styles/theme";
import { BackLink } from "../styles/common";

export const Page = styled.div`
  background-color: ${theme.colors.background};
  min-height: 100vh;
  padding: ${theme.spacing.md};

  color: ${theme.colors.text};
`;
export const Text = styled.span``;
export const DetailsCard = styled.div`
  width: 100%;
  max-width: 760px;
  display: flex;
  gap: ${theme.spacing.md};
  flex-direction: column;
  color: ${theme.colors.text};
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};

  padding: ${theme.spacing.md};
  margin: ${theme.spacing.md} 0;
`;
export const DetailsHeader = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

export const CompanyInfo = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  flex-direction: column;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: flex-start;
`;
export const CompanyName = styled.span``;
export const Position = styled.span``;
export const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.surfaceHover};
  color: ${theme.colors.accent};
  font-size: ${theme.fontSize.md};
`;
export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.md};
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

export const ButtonsContainer = styled.div`
  margin-top: ${theme.spacing.md};

  display: flex;
  justify-content: space-between;
`;
export const EditButton = styled(BackLink)``;

export const DeleteButton = styled.button`
  color: ${theme.colors.accent};
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};
  width: fit-content;
  padding: ${theme.spacing.md};
  gap: ${theme.spacing.sm};

  &:hover {
    color: ${theme.colors.accentHover};
    background-color: ${theme.colors.surfaceHover};
  }
`;
