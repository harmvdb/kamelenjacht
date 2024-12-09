import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { exportIdeasToCsv } from "@/utils/csvExport";
import { SearchBar } from "./SearchBar";

interface ActionBarProps {
  sortBy: "newest" | "popular";
  setSortBy: (value: "newest" | "popular") => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  isModerator: boolean;
  onModeratorClick: () => void;
  ideas: Array<{ title: string; description: string }>;
  onSearch: (query: string) => void;
}

export const ActionBar = ({
  sortBy,
  setSortBy,
  showForm,
  setShowForm,
  isModerator,
  onModeratorClick,
  ideas,
  onSearch
}: ActionBarProps) => {
  return (
    <div className="space-y-4">
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
      <SearchBar onSearch={onSearch} />
    </div>
  );
};