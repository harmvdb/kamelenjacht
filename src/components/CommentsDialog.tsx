import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Comment {
  id: string;
  content: string;
  created_at: string;
}

interface CommentsDialogProps {
  ideaId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CommentsDialog = ({ ideaId, open, onOpenChange }: CommentsDialogProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("idea_id", ideaId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
      return;
    }

    setComments(data || []);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const { error } = await supabase
      .from("comments")
      .insert([
        {
          idea_id: ideaId,
          content: newComment.trim(),
        },
      ]);

    if (error) {
      toast({
        title: "Fout bij toevoegen commentaar",
        description: "Er is iets misgegaan bij het toevoegen van je commentaar.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Commentaar toegevoegd",
      description: "Je commentaar is succesvol toegevoegd.",
    });

    setNewComment("");
    fetchComments();
  };

  // Fetch comments when dialog opens
  useState(() => {
    if (open) {
      fetchComments();
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Commentaar</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-lg bg-muted"
              >
                <p className="text-sm">{comment.content}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Voeg een commentaar toe..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button onClick={handleAddComment}>
              Plaats commentaar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};