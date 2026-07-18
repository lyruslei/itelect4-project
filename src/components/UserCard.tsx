import type { User } from "../types/index";

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onSelect(user);
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("Note:", event.currentTarget.value);
  };

  return (
    <div className="card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={handleClick}>Select Member</button>
      <input onChange={handleNoteChange} placeholder="Quick note" />
    </div>
  );
}

export default UserCard;
