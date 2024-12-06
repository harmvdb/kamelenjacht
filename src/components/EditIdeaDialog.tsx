import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface EditIdeaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  idea: {
    title: string;
    description: string;
  };
  onSave: (title: string, description: string) => void;
}

export const EditIdeaDialog = ({
  open,
  onOpenChange,
  idea,
  onSave,
}: EditIdeaDialogProps) => {
  const [title, setTitle] = useState(idea.title);
  const [description, setDescription] = useState(idea.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(title, description);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Idee bewerken</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Titel"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Beschrijving"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">Opslaan</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};