import { useState } from "react";
import { motion } from "framer-motion";
import { IdeaCard } from "@/components/IdeaCard";
import { NewIdeaForm } from "@/components/NewIdeaForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

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
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          Deel je ideeën met de community en stem op de beste voorstellen.
        </p>
      </motion.div>

      <Card className="p-6 bg-white shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Over de Di-Do-Economie</h2>
        <div className="prose max-w-none text-left space-y-4">
          <p>
            De kantoren in Nederland hebben een hoge bezetting op dinsdag en donderdag, en zijn juist rustig op de woensdag en vrijdag. 
            Dat patroon lijkt op twee kamelen bulten. Het wordt ook wel de di-do-economie genoemd. Dat is niet duurzaam.
          </p>
          <p>
            Als we ons meer spreiden over de week kunnen we met minder kantoren af, en het meest duurzame kantoor is het kantoor dat je niet hebt. 
            We verwachten dat we dat kunnen bereiken door de daldagen weer aantrekkelijk te maken.
          </p>
          <p>
            We komen vooral naar kantoor om collega's te ontmoeten. Dus als er collega's zijn komen er meer. 
            Je hoeft hiervoor niet meer per se op een piekdag naar kantoor. Laten we beginnen met 10% minder. 
            Dan kunnen we 1 piekdag per maand minder op kantoor werken.
          </p>
        </div>
      </Card>

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
            onClick={() => setIsModerator(!isModerator)}
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