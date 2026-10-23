import { useContext, useEffect, useRef, useState } from "react";
import { VacanciesContext } from "../../contexts/VacanciesContext";
import {
  DialogContent,
  InterviewDialogWrapper,
} from "./InterviewDialog.styled";
import {
  Button,
  ButtonSecondary,
  ErrorMessage,
  Input,
} from "../../styles/common";

export default function InterviewDialog() {
  const { confirmInterview, cancelInterview } = useContext(VacanciesContext);
  const [interviewAt, setInterviewAt] = useState("");
  const [error, setError] = useState("");
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogRef.current.showModal();
  }, []);

  const handleClose = () => {
    cancelInterview();
  };

  const handleConfirm = () => {
    if (!interviewAt) {
      setError("Please select a date and time for the interview.");
      return;
    }

    const formDateTime = new Date(interviewAt);
    const currentDateTime = new Date();

    if (Number.isNaN(formDateTime.getTime())) {
      setError("Invalid date and time format.");
      return;
    }

    if (formDateTime <= currentDateTime) {
      setError("Please select a future date and time for the interview.");
      return;
    }
    setError("");
    confirmInterview(interviewAt);
    return;
  };
  const handleChange = (e) => {
    setInterviewAt(e.target.value);
    setError(""); // Clear error when user changes the input
  };

  return (
    <InterviewDialogWrapper ref={dialogRef} onClose={handleClose}>
      <DialogContent>
        <h2>Schedule Interview</h2>

        <ErrorMessage>{error}</ErrorMessage>

        <Input
          $isError={error}
          type="datetime-local"
          min={"2026-01-01T00:00"}
          max={"2100-12-31T23:59"}
          placeholder="Select date and time"
          value={interviewAt}
          onChange={(e) => handleChange(e)}
        />
        <Button
          onClick={() => {
            handleConfirm();
          }}
        >
          Confirm
        </Button>
        <ButtonSecondary
          onClick={() => {
            dialogRef.current.close();
          }}
        >
          Cancel
        </ButtonSecondary>
      </DialogContent>
    </InterviewDialogWrapper>
  );
}
