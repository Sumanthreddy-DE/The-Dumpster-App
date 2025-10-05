export interface Idea {
  id: string;
  category: "week" | "month";
  title: string;
  reminderTime: string;
  reminderFrequency: "daily" | "twice-daily" | "every-2-days" | "weekly";
  createdAt: Date;
}
