import { Button } from "@/components/ui/button";

interface ActionBarProps {
  sortBy: "newest" | "popular";
  setSortBy: (sort: "newest" | "popular") => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  isModerator: boolean;
  onModeratorClick: () => void;
}

export const ActionBar = ({
  sortBy,
  setSortBy,
  showForm,
  setShowForm,
  isModerator,
  onModeratorClick,
}: ActionBarProps) => (
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
        onClick={onModeratorClick}
      >
        {isModerator ? "Gebruikersweergave" : "Moderatorweergave"}
      </Button>
    </div>
  </div>
);