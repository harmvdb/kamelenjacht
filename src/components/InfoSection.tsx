import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export const InfoSection = () => {
  const { toast } = useToast();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Kameel") {
      setIsAuthorized(true);
      setShowPasswordDialog(false);
      setIsInfoOpen(true);
      toast({
        title: "Toegang verleend",
        description: "Je hebt nu toegang tot de informatie sectie.",
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

  const handleInfoClick = () => {
    if (!isAuthorized) {
      setShowPasswordDialog(true);
    } else {
      setIsInfoOpen(!isInfoOpen);
    }
  };

  return (
    <>
      <Collapsible open={isInfoOpen} onOpenChange={setIsInfoOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 mx-auto" onClick={handleInfoClick}>
            {isInfoOpen ? (
              <>
                Verberg informatie <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Toon meer informatie <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
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
        </CollapsibleContent>
      </Collapsible>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Wachtwoord vereist</DialogTitle>
            <DialogDescription>
              Voer het wachtwoord in om toegang te krijgen tot de informatie sectie.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
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
    </>
  );
};