import { Bell, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Idea } from "@/types/idea";

interface IdeasListProps {
  title: string;
  ideas: Idea[];
  onDelete: (id: string) => void;
}

const IdeasList = ({ title, ideas, onDelete }: IdeasListProps) => {
  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case "daily": return "Daily";
      case "twice-daily": return "Twice Daily";
      case "every-2-days": return "Every 2 Days";
      case "weekly": return "Weekly";
      default: return frequency;
    }
  };

  return (
    <div className="space-y-3 animate-fade-in">
      <h2 className="text-lg font-semibold text-foreground/80">{title}</h2>
      <div className="space-y-2">
        {ideas.map((idea) => (
          <Card key={idea.id} className="p-4 hover:shadow-card transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-2">
                <h3 className="font-medium">{idea.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Bell className="w-4 h-4" />
                    <span>{idea.reminderTime}</span>
                  </div>
                  <span>•</span>
                  <span>{getFrequencyLabel(idea.reminderFrequency)}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(idea.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IdeasList;
