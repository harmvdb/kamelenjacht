import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface NewIdeaFormProps {
  onSubmit: (title: string, description: string) => void;
}

export const NewIdeaForm = ({ onSubmit }: NewIdeaFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() === "" || description.trim() === "") {
      toast({
        title: "Fout",
        description: "Vul alle velden in",
        variant: "destructive",
      });
      return;
    }

    if (description.length > 200) {
      toast({
        title: "Fout",
        description: "Beschrijving mag maximaal 200 woorden zijn",
        variant: "destructive",
      });
      return;
    }

    onSubmit(title, description);
    setTitle("");
    setDescription("");
    
    toast({
      title: "Succes!",
      description: "Je idee is toegevoegd",
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-card rounded-lg border shadow-sm"
    >
      <div className="space-y-2">
        <Input
          placeholder="Titel van je idee"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg"
        />
      </div>
      <div className="space-y-2">
        <Textarea
          placeholder="Beschrijf je idee (max 200 woorden)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px]"
        />
        <p className="text-sm text-muted-foreground text-right">
          {description.length}/200
        </p>
      </div>
      <Button type="submit" className="w-full">
        Deel je idee
      </Button>
    </motion.form>
  );
};