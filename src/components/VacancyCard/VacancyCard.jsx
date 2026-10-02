import {
  CardHeader,
  Text,
  TextMuted,
  Card,
  CompanyBadge,
  CompanyDescription,
  CardMeta,
} from "./VacancyCard.styled";

export default function VacancyCard({ vacancy }) {
  return (
    <Card to={"/vacancies/" + vacancy.id}>
      <CardHeader>
        <CompanyBadge>{vacancy.company[0]}</CompanyBadge>
        <CompanyDescription>
          <Text>{vacancy.company}</Text>
          <TextMuted>{vacancy.position}</TextMuted>
        </CompanyDescription>
      </CardHeader>
      <CardMeta>
        <Text>{vacancy.salary}</Text>
        <TextMuted>{vacancy.date}</TextMuted>
      </CardMeta>
    </Card>
  );
}
