import { CompanyBadge } from "../../styles/common";
import { formatDate } from "../../utils/formatDate";
import {
  CardHeader,
  Text,
  TextMuted,
  Card,
  CompanyDescription,
  CardMeta,
} from "./VacancyCard.styled";
import { useSortable } from "@dnd-kit/react/sortable";

export default function VacancyCard({ vacancy, index, group }) {
  const { ref, isDragging } = useSortable({
    id: vacancy.id,
    index,
    group,
  });
  return (
    <Card ref={ref} data-dragging={isDragging} to={"/vacancies/" + vacancy.id}>
      <CardHeader>
        <CompanyBadge>{vacancy.company[0]}</CompanyBadge>
        <CompanyDescription>
          <Text>{vacancy.company}</Text>
          <TextMuted>{vacancy.position}</TextMuted>
        </CompanyDescription>
      </CardHeader>
      <CardMeta>
        <Text>{vacancy.salary}</Text>
        <TextMuted>{formatDate(vacancy.date)}</TextMuted>
      </CardMeta>
    </Card>
  );
}
