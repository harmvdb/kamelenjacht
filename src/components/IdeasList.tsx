import { motion } from "framer-motion";
import { IdeaCard } from "./IdeaCard";

interface Idea {
  id: number;
  title: string;
  description: string;
  upVotes: number;
  downVotes: number;
  status: "pending" | "approved" | "rejected";
}

interface IdeasListProps {
  ideas: Idea[];
  isModerator: boolean;
  onUpVote: (id: number) => void;
  onDownVote: (id: number) => void;
  onModerate: (id: number, approved: boolean) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const IdeasList = ({
  ideas,
  isModerator,
  onUpVote,
  onDownVote,
  onModerate,
  onEdit,
  onDelete,
}: IdeasListProps) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {ideas.map((idea) => (
      <IdeaCard
        key={idea.id}
        title={idea.title}
        description={idea.description}
        upVotes={idea.upVotes}
        downVotes={idea.downVotes}
        status={idea.status}
        onUpVote={() => onUpVote(idea.id)}
        onDownVote={() => onDownVote(idea.id)}
        onModerate={isModerator ? (approved) => onModerate(idea.id, approved) : undefined}
        onEdit={isModerator ? () => onEdit(idea.id) : undefined}
        onDelete={isModerator ? () => onDelete(idea.id) : undefined}
        isModeratorView={isModerator}
      />
    ))}
  </div>
);