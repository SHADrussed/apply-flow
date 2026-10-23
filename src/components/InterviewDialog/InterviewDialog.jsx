import { useContext, useState } from "react";
import { VacanciesContext } from "../../contexts/VacanciesContext";

export default function InterviewDialog() {
  const { confirmInterview, cancelInterview } = useContext(VacanciesContext);
  const [interviewAt, setInterviewAt] = useState("");
  return (
    <>
      <input
        type="datetime-local"
        placeholder="Select date and time"
        value={interviewAt}
        onChange={(e) => setInterviewAt(e.target.value)}
      />
      <button
        onClick={() => {
          confirmInterview(interviewAt);
        }}
      >
        Confirm
      </button>
      <button
        onClick={() => {
          cancelInterview();
        }}
      >
        Cancel
      </button>
    </>
  );
}
