import { useNavigate, useParams } from "react-router-dom";
import {
  ButtonsContainer,
  CompanyInfo,
  CompanyName,
  DeleteButton,
  DetailItem,
  DetailLabel,
  DetailsCard,
  DetailsGrid,
  DetailsHeader,
  DetailValue,
  EditButton,
  InfoWrapper,
  Page,
  Position,
  StatusBadge,
  Text,
} from "./VacancyDetailsPage.styled";
import { ArrowLeft, Edit } from "lucide-react";
import { BackLink, CompanyBadge } from "../styles/common";
import { useContext } from "react";
import { VacanciesContext } from "../contexts/VacanciesContext";
import { formatDate } from "../utils/formatDate";

export default function VacancyDetailsPage() {
  const { id } = useParams();
  const { getVacancy, deleteVacancy } = useContext(VacanciesContext);
  const vacancy = getVacancy(id);
  const navigate = useNavigate();

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vacancy?",
    );

    if (!confirmed) {
      return;
    }

    deleteVacancy(vacancy.id);
    navigate("/vacancies");
  }

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
          <DetailItem>
            <DetailLabel>Salary</DetailLabel>
            <DetailValue>{vacancy.salary}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Applied date</DetailLabel>
            <DetailValue>{formatDate(vacancy.date)}</DetailValue>
          </DetailItem>
          {/* <DetailItem>
            <DetailLabel>Interview time</DetailLabel>
            <DetailValue>{vacancy.time}</DetailValue>
          </DetailItem> */}
        </DetailsGrid>
        <ButtonsContainer>
          <EditButton to={`/vacancies/${vacancy.id}/edit`}>
            <Edit />
            Edit
          </EditButton>
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        </ButtonsContainer>
      </DetailsCard>
    </Page>
  );
}
