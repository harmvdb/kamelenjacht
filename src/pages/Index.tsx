import { useState } from "react";
import { motion } from "framer-motion";
import { IdeaCard } from "@/components/IdeaCard";
import { NewIdeaForm } from "@/components/NewIdeaForm";
import { Button } from "@/components/ui/button";

interface Idea {
  id: number;
  title: string;
  description: string;
  votes: number;
}

const Index = () => {
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: 1,
      title: "Duurzame stadstuinen",
      description: "Een netwerk van stadstuinen waar bewoners samen kunnen tuinieren en verse groenten kunnen kweken.",
      votes: 5,
    },
    {
      id: 2,
      title: "Digitale buurtbibliotheek",
      description: "Een platform waar buurtbewoners boeken kunnen delen en lenen van elkaar.",
      votes: 3,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "popular">("popular");

  const handleNewIdea = (title: string, description: string) => {
    const newIdea: Idea = {
      id: Date.now(),
      title,
      description,
      votes: 0,
    };
    setIdeas([newIdea, ...ideas]);
    setShowForm(false);
  };

  const handleVote = (id: number) => {
    setIdeas(
      ideas.map((idea) =>
        idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
      )
    );
  };

  const sortedIdeas = [...ideas].sort((a, b) =>
    sortBy === "popular" ? b.votes - a.votes : b.id - a.id
  );

  return (
    <div className="container py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold tracking-tight">Ideeën Platform</h1>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          Deel je ideeën met de community en stem op de beste voorstellen.
        </p>
      </motion.div>

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
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Annuleren" : "Nieuw idee"}
        </Button>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedIdeas.map((idea) => (
          <IdeaCard
            key={idea.id}
            title={idea.title}
            description={idea.description}
            votes={idea.votes}
            onVote={() => handleVote(idea.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;