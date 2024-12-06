import { Button } from "@/components/ui/button";
import { Check, X, Pencil, Trash } from "lucide-react";

interface ModeratorControlsProps {
  status: "pending" | "approved" | "rejected";
  onModerate: (approved: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ModeratorControls = ({
  status,
  onModerate,
  onEdit,
  onDelete,
}: ModeratorControlsProps) => {
  if (status !== "pending") {
    return (
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit}
          className="text-blue-500"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="text-red-500"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onModerate(true)}
        className="text-green-500"
      >
        <Check className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onModerate(false)}
        className="text-red-500"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};