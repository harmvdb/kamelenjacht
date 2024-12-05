import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Check, X } from "lucide-react";

interface IdeaCardProps {
  title: string;
  description: string;
  upVotes: number;
  downVotes: number;
  status: "pending" | "approved" | "rejected";
  onUpVote: () => void;
  onDownVote: () => void;
  onModerate?: (approved: boolean) => void;
  isModeratorView?: boolean;
}

export const IdeaCard = ({ 
  title, 
  description, 
  upVotes, 
  downVotes,
  status,
  onUpVote, 
  onDownVote,
  onModerate,
  isModeratorView 
}: IdeaCardProps) => {
  const totalVotes = upVotes - downVotes;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="card-hover">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">{title}</CardTitle>
              <Badge variant={
                status === "approved" ? "default" :
                status === "rejected" ? "destructive" :
                "secondary"
              }>
                {status === "approved" ? "Goedgekeurd" :
                 status === "rejected" ? "Afgekeurd" :
                 "In behandeling"}
              </Badge>
            </div>
            {isModeratorView && status === "pending" ? (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onModerate?.(true)}
                  className="text-green-500"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onModerate?.(false)}
                  className="text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpVote();
                  }}
                  className="text-green-500"
                  disabled={status !== "approved"}
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <span className="min-w-[2rem] text-center">{totalVotes}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownVote();
                  }}
                  className="text-red-500"
                  disabled={status !== "approved"}
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};