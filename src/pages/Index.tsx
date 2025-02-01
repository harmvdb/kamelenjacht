import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Header } from "@/components/Header";
import { ActionBar } from "@/components/ActionBar";
import { PasswordDialog } from "@/components/PasswordDialog";
import { IdeasList } from "@/components/IdeasList";
import { NewIdeaForm } from "@/components/NewIdeaForm";
import { InfoSection } from "@/components/InfoSection";
import { EditIdeaDialog } from "@/components/EditIdeaDialog";
import { supabase } from "@/integrations/supabase/client";

interface Idea {
  id: string;
  title: string;
  description: string;
  upVotes: number;
  downVotes: number;
  status: "pending" | "approved" | "rejected";
}

const Index = () => {
  const { toast } = useToast();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "popular">("popular");
  const [isModerator, setIsModerator] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    const { data, error } = await supabase
      .from('ideas')
      .select('*');

    if (error) {
      console.error('Error fetching ideas:', error);
      toast({
        title: "Error fetching ideas",
        description: "There was an error fetching the ideas. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const formattedIdeas = data.map(idea => ({
      id: idea.id,
      title: idea.title,
      description: idea.description,
      upVotes: idea.votes_count || 0,
      downVotes: 0,
      status: idea.approved ? "approved" : "pending" as "pending" | "approved" | "rejected"
    }));

    setIdeas(formattedIdeas);
  };

  const handleNewIdea = async (title: string, description: string) => {
    const { data, error } = await supabase
      .from('ideas')
      .insert([
        { title, description }
      ])
      .select()
      .single();

    if (error) {
      toast({
        title: "Error submitting idea",
        description: "There was an error submitting your idea. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const newIdea: Idea = {
      id: data.id,
      title: data.title,
      description: data.description,
      upVotes: 0,
      downVotes: 0,
      status: "pending"
    };

    setIdeas([newIdea, ...ideas]);
    setShowForm(false);
    toast({
      title: "Idea submitted",
      description: "Your idea has been successfully submitted and is awaiting approval.",
    });
  };

  const handleUpVote = async (id: string) => {
    const { error } = await supabase
      .from('ideas')
      .update({ votes_count: ideas.find(i => i.id === id)?.upVotes! + 1 })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error updating vote",
        description: "There was an error updating your vote. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIdeas(
      ideas.map((idea) =>
        idea.id === id ? { ...idea, upVotes: idea.upVotes + 1 } : idea
      )
    );
  };

  const handleDownVote = async (id: string) => {
    const { error } = await supabase
      .from('ideas')
      .update({ votes_count: ideas.find(i => i.id === id)?.upVotes! - 1 })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error updating vote",
        description: "There was an error updating your vote. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIdeas(
      ideas.map((idea) =>
        idea.id === id ? { ...idea, downVotes: idea.downVotes + 1 } : idea
      )
    );
  };

  const handleModerate = (id: string, approved: boolean) => { // Changed from number to string
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

  const handleEdit = (id: string) => { // Changed from number to string
    const idea = ideas.find((i) => i.id === id);
    if (idea) {
      setEditingIdea(idea);
    }
  };

  const handleDelete = (id: string) => { // Changed from number to string
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

  const handleImportIdeas = async (importedIdeas: Array<{ title: string; description: string }>) => {
    const newIdeas = importedIdeas.map((idea) => ({
      id: crypto.randomUUID(), // Using UUID instead of Date.now()
      title: idea.title,
      description: idea.description,
      upVotes: 0,
      downVotes: 0,
      status: "pending" as const
    }));

    setIdeas([...newIdeas, ...ideas]);
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
      return b.id.localeCompare(a.id);
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
        onSearch={setSearchQuery}
        onImportIdeas={handleImportIdeas}
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