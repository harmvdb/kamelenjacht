import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  password: string;
  setPassword: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const PasswordDialog = ({
  open,
  onOpenChange,
  password,
  setPassword,
  onSubmit,
}: PasswordDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Wachtwoord vereist</DialogTitle>
        <DialogDescription>
          Voer het wachtwoord in om toegang te krijgen tot de moderator functies.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          type="password"
          placeholder="Voer wachtwoord in"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full">Bevestig</Button>
      </form>
    </DialogContent>
  </Dialog>
);