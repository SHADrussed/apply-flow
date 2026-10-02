import { useParams } from "react-router-dom";
import {
  BackLink,
  CompanyInfo,
  CompanyName,
  DetailItem,
  DetailLabel,
  DetailsCard,
  DetailsGrid,
  DetailsHeader,
  DetailsWrapper,
  DetailValue,
  InfoWrapper,
  Page,
  Position,
  StatusBadge,
  Text,
} from "./VacancyDetailsPage.styled";
import { vacancies } from "../data/vacancies";
import { ArrowLeft } from "lucide-react";
import { CompanyBadge } from "../styles/common";

export default function VacancyDetailsPage() {
  const { id } = useParams();

  const vacancy = vacancies.find((vacancy) => vacancy.id === Number(id));

  if (!vacancy) {
    return (
      <Page>
        <BackLink to="/vacancies">
          <ArrowLeft />
          Back to vacancies
        </BackLink>
        <Text>Vacancy not found</Text>
      </Page>
    );
  }
  return (
    <Page>
      <BackLink to="/vacancies">
        <ArrowLeft />
        Back to vacancies
      </BackLink>
      <DetailsCard>
        <DetailsHeader>
          <CompanyBadge>{vacancy.company[0]}</CompanyBadge>
          <InfoWrapper>
            <CompanyInfo>
              <CompanyName>{vacancy.company}</CompanyName>
              <Position>{vacancy.position}</Position>
            </CompanyInfo>
            <StatusBadge>{vacancy.status}</StatusBadge>
          </InfoWrapper>
        </DetailsHeader>
        <DetailsGrid>
          <DetailsWrapper>
            <DetailItem>
              <DetailLabel>Salary</DetailLabel>
              <DetailValue>{vacancy.salary}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Applied date</DetailLabel>
              <DetailValue>{vacancy.date}</DetailValue>
            </DetailItem>
          </DetailsWrapper>
          <DetailItem>
            <DetailLabel>Interview time</DetailLabel>
            <DetailValue>{vacancy.time}</DetailValue>
          </DetailItem>
        </DetailsGrid>
      </DetailsCard>
    </Page>
  );
}
