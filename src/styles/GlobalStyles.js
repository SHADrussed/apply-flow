import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body {
    width: 100%;
    min-height: 100%;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: ${theme.colors.text};
    background: ${theme.colors.background};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font: inherit;
    cursor: pointer;
  }

  :is(a, button, input, select, textarea):focus-visible {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 3px;
  }

  ul {
    list-style: none;
  }
`;
