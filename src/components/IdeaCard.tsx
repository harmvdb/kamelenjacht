import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IdeaCardProps {
  title: string;
  description: string;
  votes: number;
  onVote: () => void;
}

export const IdeaCard = ({ title, description, votes, onVote }: IdeaCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="card-hover cursor-pointer">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{title}</CardTitle>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onVote();
              }}
              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <span>{votes}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};