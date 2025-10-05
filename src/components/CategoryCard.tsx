import { Calendar, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  description: string;
  count: number;
  variant: "primary" | "accent";
  onClick: () => void;
}

const CategoryCard = ({ title, description, count, variant, onClick }: CategoryCardProps) => {
  return (
    <Card
      className={cn(
        "p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-elevated group",
        variant === "primary" && "border-primary/20 hover:border-primary/40",
        variant === "accent" && "border-accent/20 hover:border-accent/40"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div
              className={cn(
                "p-2 rounded-lg",
                variant === "primary" && "bg-primary/10",
                variant === "accent" && "bg-accent/10"
              )}
            >
              <Calendar
                className={cn(
                  "w-5 h-5",
                  variant === "primary" && "text-primary",
                  variant === "accent" && "text-accent"
                )}
              />
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-3">{description}</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {count}
            </span>
            <span className="text-sm text-muted-foreground">
              {count === 1 ? "idea" : "ideas"}
            </span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
      </div>
    </Card>
  );
};

export default CategoryCard;
