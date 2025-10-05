import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/CategoryCard";
import AddIdeaDialog from "@/components/AddIdeaDialog";
import IdeasList from "@/components/IdeasList";
import { Idea } from "@/types/idea";

const Index = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"week" | "month" | null>(null);

  const handleCategoryClick = (category: "week" | "month") => {
    setSelectedCategory(category);
    setIsDialogOpen(true);
  };

  const handleAddIdea = (idea: Idea) => {
    setIdeas([...ideas, idea]);
  };

  const handleDeleteIdea = (id: string) => {
    setIdeas(ideas.filter(idea => idea.id !== id));
  };

  const weekIdeas = ideas.filter(idea => idea.category === "week");
  const monthIdeas = ideas.filter(idea => idea.category === "month");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Idea Vault
          </h1>
          <p className="text-muted-foreground">Capture your ideas, never forget them</p>
        </div>

        {/* Category Cards */}
        <div className="grid gap-4 mb-8">
          <CategoryCard
            title="This Week"
            description="Ideas to accomplish this week"
            count={weekIdeas.length}
            variant="primary"
            onClick={() => handleCategoryClick("week")}
          />
          <CategoryCard
            title="This Month"
            description="Ideas to work on this month"
            count={monthIdeas.length}
            variant="accent"
            onClick={() => handleCategoryClick("month")}
          />
        </div>

        {/* Ideas Lists */}
        <div className="space-y-6">
          {weekIdeas.length > 0 && (
            <IdeasList
              title="This Week's Ideas"
              ideas={weekIdeas}
              onDelete={handleDeleteIdea}
            />
          )}
          {monthIdeas.length > 0 && (
            <IdeasList
              title="This Month's Ideas"
              ideas={monthIdeas}
              onDelete={handleDeleteIdea}
            />
          )}
        </div>

        {/* Add Idea Dialog */}
        <AddIdeaDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          category={selectedCategory}
          onAddIdea={handleAddIdea}
        />

        {/* Floating Action Button */}
        <Button
          size="lg"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-elevated bg-gradient-to-r from-primary to-accent hover:scale-110 transition-transform"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
