import Header from "../components/Header/Header";
import StatCard from "../components/StatCard/StatCard";
import {
  DashboardStyled,
  StatsGrid,
  StatsGridElement,
} from "./DashboardPage.styled";

export default function DashboardPage() {
  return (
    <>
      <DashboardStyled>
        <Header page={"Dashboard"} />
        <StatsGrid>
          <StatCard title="Applications" value={24} change="+12%" />
        </StatsGrid>
      </DashboardStyled>
    </>
  );
}
