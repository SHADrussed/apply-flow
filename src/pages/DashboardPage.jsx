import Header from "../components/Header/Header";
import RecentVacancies from "../components/RecentVacancies/RecentVacancies";
import StatCard from "../components/StatCard/StatCard";
import UpcomingInterviews from "../components/UpcomingInterviews/UpcomingInterviews";
import { vacancies } from "../data/vacancies";
import {
  ContentGrid,
  DashboardStyled,
  DemoNotice,
  StatsGrid,
} from "./DashboardPage.styled";

export default function DashboardPage() {
  const applied = vacancies.filter(({ status }) =>
    ["Applied", "Interview", "Offer"].includes(status),
  ).length;
  const interviews = vacancies.filter(({ status }) => status === "Interview").length;
  const offers = vacancies.filter(({ status }) => status === "Offer").length;

  const stats = [
    { title: "Tracked roles", value: vacancies.length, detail: "Example records" },
    { title: "Applications", value: applied, detail: "Applied or interviewing" },
    { title: "Interviews", value: interviews, detail: "Marked as interview" },
    { title: "Offers", value: offers, detail: "Marked as offer" },
  ];

  return (
    <DashboardStyled>
      <Header
        title="Job search overview"
        description="Applications, interviews and next steps in one place"
      />
      <DemoNotice role="note">
        Demo workspace: companies, application statuses and interview dates are
        examples, not real applications.
      </DemoNotice>
      <StatsGrid>
        {stats.map(({ title, value, detail }) => (
          <StatCard key={title} title={title} value={value} detail={detail} />
        ))}
      </StatsGrid>
      <ContentGrid>
        <RecentVacancies />
        <UpcomingInterviews />
      </ContentGrid>
    </DashboardStyled>
  );
}
