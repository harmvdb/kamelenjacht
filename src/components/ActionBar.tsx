import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { exportIdeasToCsv } from "@/utils/csvExport";

interface ActionBarProps {
  sortBy: "newest" | "popular";
  setSortBy: (value: "newest" | "popular") => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  isModerator: boolean;
  onModeratorClick: () => void;
  ideas: Array<{ title: string; description: string }>;
}

export const ActionBar = ({
  sortBy,
  setSortBy,
  showForm,
  setShowForm,
  isModerator,
  onModeratorClick,
  ideas
}: ActionBarProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant={showForm ? "secondary" : "default"}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Annuleer" : "Nieuw idee"}
        </Button>
        <Button
          variant="outline"
          onClick={onModeratorClick}
        >
          {isModerator ? "Gebruikersweergave" : "Moderatorweergave"}
        </Button>
        {isModerator && (
          <Button
            variant="outline"
            onClick={() => exportIdeasToCsv(ideas)}
          >
            Exporteer
          </Button>
        )}
      </div>
      <Select
        value={sortBy}
        onValueChange={(value) => setSortBy(value as "newest" | "popular")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sorteer op..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Nieuwste eerst</SelectItem>
          <SelectItem value="popular">Populairste eerst</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};