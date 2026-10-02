import styled from "styled-components";
import { theme } from "./theme";

export const Wrapper = styled.div`
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
`;
export const Container = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;

  @media screen and (max-width: 495px) {
    padding: 0 16px;
  }
`;
export const Button = styled.button`
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

export const ErrorMessage = styled.p`
  color: darkred;
  padding-top: 12px;
  padding-bottom: 12px;
`;
export const AppShell = styled.div`
  display: flex;
  min-height: 100vh;
`;
export const MainContent = styled.main`
  flex: 1;
  min-width: 0;
`;
export const Text = styled.span`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
`;

export const TextMuted = styled.span`
  color: ${theme.colors.textMuted};
`;
