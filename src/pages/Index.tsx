import { useState } from "react";
import { motion } from "framer-motion";
import { IdeaCard } from "@/components/IdeaCard";
import { NewIdeaForm } from "@/components/NewIdeaForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { InfoSection } from "@/components/InfoSection";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Idea {
  id: number;
  title: string;
  description: string;
  upVotes: number;
  downVotes: number;
  status: "pending" | "approved" | "rejected";
}

const Index = () => {
  const { toast } = useToast();
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: 1,
      title: "Duurzame stadstuinen",
      description: "Een netwerk van stadstuinen waar bewoners samen kunnen tuinieren en verse groenten kunnen kweken.",
      upVotes: 5,
      downVotes: 0,
      status: "approved"
    },
    {
      id: 2,
      title: "Digitale buurtbibliotheek",
      description: "Een platform waar buurtbewoners boeken kunnen delen en lenen van elkaar.",
      upVotes: 3,
      downVotes: 1,
      status: "pending"
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "popular">("popular");
  const [isModerator, setIsModerator] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState("");

  const handleNewIdea = (title: string, description: string) => {
    const newIdea: Idea = {
      id: Date.now(),
      title,
      description,
      upVotes: 0,
      downVotes: 0,
      status: "pending"
    };
    setIdeas([newIdea, ...ideas]);
    setShowForm(false);
    toast({
      title: "Idee ingediend",
      description: "Je idee is succesvol ingediend en wacht op goedkeuring.",
    });
  };

  const handleUpVote = (id: number) => {
    setIdeas(
      ideas.map((idea) =>
        idea.id === id ? { ...idea, upVotes: idea.upVotes + 1 } : idea
      )
    );
  };

  const handleDownVote = (id: number) => {
    setIdeas(
      ideas.map((idea) =>
        idea.id === id ? { ...idea, downVotes: idea.downVotes + 1 } : idea
      )
    );
  };

  const handleModerate = (id: number, approved: boolean) => {
    setIdeas(
      ideas.map((idea) =>
        idea.id === id
          ? { ...idea, status: approved ? "approved" : "rejected" }
          : idea
      )
    );
    toast({
      title: approved ? "Idee goedgekeurd" : "Idee afgekeurd",
      description: `Het idee is succesvol ${approved ? "goedgekeurd" : "afgekeurd"}.`,
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Kameel") {
      setIsModerator(true);
      setShowPasswordDialog(false);
      toast({
        title: "Toegang verleend",
        description: "Je hebt nu toegang tot de moderator functies.",
      });
    } else {
      toast({
        title: "Incorrect wachtwoord",
        description: "Probeer het opnieuw.",
        variant: "destructive",
      });
    }
    setPassword("");
  };

  const handleModeratorClick = () => {
    if (!isModerator) {
      setShowPasswordDialog(true);
    } else {
      setIsModerator(false);
    }
  };

  const sortedIdeas = [...ideas].sort((a, b) => {
    if (sortBy === "popular") {
      return (b.upVotes - b.downVotes) - (a.upVotes - a.downVotes);
    }
    return b.id - a.id;
  });

  return (
    <div className="container py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold tracking-tight">Kamelenjacht</h1>
        <p className="text-xl text-muted-foreground">
          maak van de dal-dag een top-dag
        </p>
      </motion.div>

      <InfoSection />

      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <Button
            variant={sortBy === "popular" ? "default" : "outline"}
            onClick={() => setSortBy("popular")}
          >
            Populair
          </Button>
          <Button
            variant={sortBy === "newest" ? "default" : "outline"}
            onClick={() => setSortBy("newest")}
          >
            Nieuwste
          </Button>
        </div>
        <div className="space-x-2">
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Annuleren" : "Nieuw idee"}
          </Button>
          <Button
            variant="outline"
            onClick={handleModeratorClick}
          >
            {isModerator ? "Gebruikersweergave" : "Moderatorweergave"}
          </Button>
        </div>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <NewIdeaForm onSubmit={handleNewIdea} />
        </motion.div>
      )}

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Wachtwoord vereist</DialogTitle>
            <DialogDescription>
              Voer het wachtwoord in om toegang te krijgen tot de moderator functies.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Voer wachtwoord in"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">Bevestig</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedIdeas.map((idea) => (
          <IdeaCard
            key={idea.id}
            title={idea.title}
            description={idea.description}
            upVotes={idea.upVotes}
            downVotes={idea.downVotes}
            status={idea.status}
            onUpVote={() => handleUpVote(idea.id)}
            onDownVote={() => handleDownVote(idea.id)}
            onModerate={isModerator ? (approved) => handleModerate(idea.id, approved) : undefined}
            isModeratorView={isModerator}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;