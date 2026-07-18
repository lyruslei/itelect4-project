import type { Submission } from "../types/index";

interface SubmissionBadgeProps {
  submission: Submission;
  children?: React.ReactNode;
}

const SubmissionBadge: React.FC<SubmissionBadgeProps> = ({ submission, children }) => {
  return (
    <div className="card">
      <h3>Submission</h3>
      <p>Repo: {submission.repoUrl}</p>
      <p>Score: {submission.score ?? "Not graded yet"}</p>
      {children}
    </div>
  );
};

export default SubmissionBadge;
