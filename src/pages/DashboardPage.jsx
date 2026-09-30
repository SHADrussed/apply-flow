import Header from "../components/Header/Header";
import RecentVacancies from "../components/RecentVacancies/RecentVacancies";
import StatCard from "../components/StatCard/StatCard";
import UpcomingInterviews from "../components/UpcomingInterviews/UpcomingInterviews";
import {
  ContentGrid,
  DashboardStyled,
  StatsGrid,
} from "./DashboardPage.styled";

export default function DashboardPage() {
  const stats = [
    { title: "Total applications", value: 24, change: "+12%" },
    { title: "Interviews", value: 10, change: "+22%" },
    { title: "Offers", value: 8, change: "+10%" },
    { title: "Response rate", value: 6, change: "+20%" },
  ];
  return (
    <>
      <DashboardStyled>
        <Header
          title="Dashboard"
          description="Track your job search progress"
        />
        <StatsGrid>
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
            ></StatCard>
          ))}
        </StatsGrid>
        <ContentGrid>
          <RecentVacancies />
          <UpcomingInterviews />
        </ContentGrid>
      </DashboardStyled>
    </>
  );
}
