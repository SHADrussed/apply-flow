import { HeaderDescription, StyledHeader, TitleText } from "./Header.styled";

export default function Header({ page }) {
  if (page === "Dashboard") {
    return (
      <StyledHeader>
        <TitleText>Dashboard</TitleText>
        <HeaderDescription>Track your job search progress</HeaderDescription>
      </StyledHeader>
    );
  }
  return;
}
