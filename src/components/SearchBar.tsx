import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <Input
      type="search"
      placeholder="Zoek in ideeën..."
      onChange={(e) => onSearch(e.target.value)}
      className="max-w-sm"
    />
  );
};