import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { ModeratorControls } from "./ModeratorControls";
import { CommentsDialog } from "./CommentsDialog";

interface IdeaCardProps {
  id: string;
  title: string;
  description: string;
  upVotes: number;
  downVotes: number;
  status: "pending" | "approved" | "rejected";
  onUpVote: () => void;
  onDownVote: () => void;
  onModerate?: (approved: boolean) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isModeratorView?: boolean;
}

export const IdeaCard = ({ 
  id,
  title, 
  description, 
  upVotes, 
  downVotes,
  status,
  onUpVote, 
  onDownVote,
  onModerate,
  onEdit,
  onDelete,
  isModeratorView 
}: IdeaCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const totalVotes = upVotes - downVotes;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="card-hover flex flex-col h-full">
        <CardHeader className="flex-none space-y-3">
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="flex items-center justify-between gap-2">
            <Badge variant={
              status === "approved" ? "default" :
              status === "rejected" ? "destructive" :
              "secondary"
            }>
              {status === "approved" ? "Goedgekeurd" :
               status === "rejected" ? "Afgekeurd" :
               "In behandeling"}
            </Badge>
            {isModeratorView && (
              <ModeratorControls
                status={status}
                onModerate={(approved) => onModerate?.(approved)}
                onEdit={() => onEdit?.()}
                onDelete={() => onDelete?.()}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
          <p className="text-muted-foreground line-clamp-3 flex-grow">{description}</p>
          {!isModeratorView && (
            <div className="flex items-center justify-end gap-2 mt-4">
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
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowComments(true);
                }}
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <CommentsDialog
        ideaId={id}
        open={showComments}
        onOpenChange={setShowComments}
      />
    </motion.div>
  );
};