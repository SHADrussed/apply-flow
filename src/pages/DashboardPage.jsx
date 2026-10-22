import { useContext } from "react";
import Header from "../components/Header/Header";
import RecentVacancies from "../components/RecentVacancies/RecentVacancies";
import StatCard from "../components/StatCard/StatCard";
import UpcomingInterviews from "../components/UpcomingInterviews/UpcomingInterviews";
import {
  ContentGrid,
  DashboardStyled,
  StatsGrid,
} from "./DashboardPage.styled";
import { VacanciesContext } from "../contexts/VacanciesContext";

export default function DashboardPage() {
  const { vacancies } = useContext(VacanciesContext);

  const respondedCount = vacancies.filter((vacancy) =>
    ["Interview", "Offer"].includes(vacancy.status),
  ).length;

  const responseRate =
    vacancies.length === 0
      ? 0
      : Math.round((respondedCount / vacancies.length) * 100);

  const stats = [
    { title: "Total applications", value: vacancies.length, change: "—" },
    {
      title: "Interviews",
      value: vacancies.filter((vacancy) => vacancy.status === "Interview")
        .length,
      change: "—",
    },
    {
      title: "Offers",
      value: vacancies.filter((vacancy) => vacancy.status === "Offer").length,
      change: "—",
    },
    {
      title: "Response rate",
      value: `${responseRate}%`,
      change: "—",
    },
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
