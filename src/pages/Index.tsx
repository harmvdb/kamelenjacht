import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Header } from "@/components/Header";
import { ActionBar } from "@/components/ActionBar";
import { PasswordDialog } from "@/components/PasswordDialog";
import { IdeasList } from "@/components/IdeasList";
import { NewIdeaForm } from "@/components/NewIdeaForm";
import { InfoSection } from "@/components/InfoSection";
import { EditIdeaDialog } from "@/components/EditIdeaDialog";

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
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleEdit = (id: number) => {
    const idea = ideas.find((i) => i.id === id);
    if (idea) {
      setEditingIdea(idea);
    }
  };

  const handleDelete = (id: number) => {
    setIdeas(ideas.filter((idea) => idea.id !== id));
    toast({
      title: "Idee verwijderd",
      description: "Het idee is succesvol verwijderd.",
    });
  };

  const handleSaveEdit = (title: string, description: string) => {
    if (editingIdea) {
      setIdeas(
        ideas.map((idea) =>
          idea.id === editingIdea.id
            ? { ...idea, title, description }
            : idea
        )
      );
      toast({
        title: "Idee bijgewerkt",
        description: "Het idee is succesvol bijgewerkt.",
      });
    }
    setEditingIdea(null);
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredAndSortedIdeas = [...ideas]
    .filter(idea => {
      const query = searchQuery.toLowerCase();
      return (
        idea.title.toLowerCase().includes(query) ||
        idea.description.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === "popular") {
        return (b.upVotes - b.downVotes) - (a.upVotes - a.downVotes);
      }
      return b.id - a.id;
    });

  return (
    <div className="container py-8 space-y-8">
      <Header />
      <InfoSection />
      <ActionBar
        sortBy={sortBy}
        setSortBy={setSortBy}
        showForm={showForm}
        setShowForm={setShowForm}
        isModerator={isModerator}
        onModeratorClick={handleModeratorClick}
        ideas={ideas}
        onSearch={handleSearch}
      />

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

      <PasswordDialog
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
        password={password}
        setPassword={setPassword}
        onSubmit={handlePasswordSubmit}
      />

      {editingIdea && (
        <EditIdeaDialog
          open={!!editingIdea}
          onOpenChange={(open) => !open && setEditingIdea(null)}
          idea={editingIdea}
          onSave={handleSaveEdit}
        />
      )}

      <IdeasList
        ideas={filteredAndSortedIdeas}
        isModerator={isModerator}
        onUpVote={handleUpVote}
        onDownVote={handleDownVote}
        onModerate={handleModerate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Index;
