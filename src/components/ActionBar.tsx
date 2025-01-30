import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { exportIdeasToCsv } from "@/utils/csvExport";
import { parseCsvFile } from "@/utils/csvImport";
import { SearchBar } from "./SearchBar";
import { useToast } from "./ui/use-toast";

interface ActionBarProps {
  sortBy: "newest" | "popular";
  setSortBy: (value: "newest" | "popular") => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  isModerator: boolean;
  onModeratorClick: () => void;
  ideas: Array<{ title: string; description: string }>;
  onSearch: (query: string) => void;
  onImportIdeas?: (ideas: Array<{ title: string; description: string }>) => void;
}

export const ActionBar = ({
  sortBy,
  setSortBy,
  showForm,
  setShowForm,
  isModerator,
  onModeratorClick,
  ideas,
  onSearch,
  onImportIdeas
}: ActionBarProps) => {
  const { toast } = useToast();

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const ideas = await parseCsvFile(file);
      if (ideas.length === 0) {
        toast({
          title: "Geen ideeën gevonden",
          description: "Het CSV bestand bevat geen geldige ideeën",
          variant: "destructive",
        });
        return;
      }

      onImportIdeas?.(ideas);
      toast({
        title: "Import succesvol",
        description: `${ideas.length} ideeën zijn geïmporteerd`,
      });
    } catch (error) {
      toast({
        title: "Import mislukt",
        description: "Er is iets misgegaan bij het importeren van het CSV bestand",
        variant: "destructive",
      });
    }

    // Reset the input
    event.target.value = '';
  };

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
            <>
              <Button
                variant="outline"
                onClick={() => exportIdeasToCsv(ideas)}
              >
                Exporteer
              </Button>
              <div className="relative">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleImport}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  title="Importeer CSV"
                />
                <Button variant="outline">
                  Importeer
                </Button>
              </div>
            </>
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