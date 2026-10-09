import { useDraggable } from "@dnd-kit/react";
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

export default function VacancyCard({ vacancy }) {
  const { ref, isDragging } = useDraggable({
    id: vacancy.id,
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
