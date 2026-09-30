import { HeaderDescription, StyledHeader, TitleText } from "./Header.styled";

export default function Header({ title, description }) {
  return (
    <StyledHeader>
      <TitleText>{title}</TitleText>
      <HeaderDescription>{description}</HeaderDescription>
    </StyledHeader>
  );
}
