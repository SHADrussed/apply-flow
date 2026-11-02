import styled from "styled-components";
import { theme } from "../styles/theme";

export const DashboardStyled = styled.main`
  background-color: ${theme.colors.background};
  min-height: 100vh;
  padding: ${theme.spacing.lg};
  min-width: 0;

  @media (max-width: 600px) {
    padding: ${theme.spacing.md};
  }
`;

export const DemoNotice = styled.p`
  margin-top: ${theme.spacing.md};
  padding: 12px 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};
  color: ${theme.colors.textMuted};
  font-size: ${theme.fontSize.xs};
  line-height: 1.5;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: ${theme.spacing.md};
  gap: ${theme.spacing.md};

  @media (max-width: 1050px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  margin-top: ${theme.spacing.md};
  gap: ${theme.spacing.md};

  @media (max-width: 1050px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;
