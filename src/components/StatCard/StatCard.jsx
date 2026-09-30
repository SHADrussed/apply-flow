import {
  ChangeIndicator,
  StatCardStyled,
  Title,
  Value,
} from "./StatCard.styled";

export default function StatCard({ title, value, change }) {
  return (
    <StatCardStyled>
      <Title>{title} - s</Title>
      <Value>{value}</Value>
      <ChangeIndicator>change: {change}</ChangeIndicator>
    </StatCardStyled>
  );
}
