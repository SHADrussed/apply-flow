import {
  StatCardStyled,
  StatDetail,
  Title,
  Value,
} from "./StatCard.styled";

export default function StatCard({ title, value, detail }) {
  return (
    <StatCardStyled>
      <Title>{title}</Title>
      <Value>{value}</Value>
      {detail && <StatDetail>{detail}</StatDetail>}
    </StatCardStyled>
  );
}
