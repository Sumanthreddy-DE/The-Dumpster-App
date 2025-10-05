import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Idea } from "@/types/idea";
import { toast } from "sonner";
import { LocalNotifications } from "@capacitor/local-notifications";

interface AddIdeaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: "week" | "month" | null;
  onAddIdea: (idea: Idea) => void;
}

const AddIdeaDialog = ({
  open,
  onOpenChange,
  category: initialCategory,
  onAddIdea,
}: AddIdeaDialogProps) => {
  const [category, setCategory] = useState<"week" | "month">("week");
  const [title, setTitle] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [reminderFrequency, setReminderFrequency] = useState<"daily" | "twice-daily" | "every-2-days" | "weekly">("daily");

  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  const requestNotificationPermission = async () => {
    const permission = await LocalNotifications.requestPermissions();
    return permission.display === 'granted';
  };

  const scheduleNotification = async (idea: Idea) => {
    const hasPermission = await requestNotificationPermission();
    
    if (!hasPermission) {
      toast.error("Notification permission denied");
      return;
    }

    const [hours, minutes] = idea.reminderTime.split(':').map(Number);
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);

    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const getIntervalInMs = () => {
      switch (idea.reminderFrequency) {
        case "daily": return 24 * 60 * 60 * 1000;
        case "twice-daily": return 12 * 60 * 60 * 1000;
        case "every-2-days": return 48 * 60 * 60 * 1000;
        case "weekly": return 7 * 24 * 60 * 60 * 1000;
        default: return 24 * 60 * 60 * 1000;
      }
    };

    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Idea Reminder",
          body: idea.title,
          id: parseInt(idea.id),
          schedule: {
            at: scheduledTime,
            every: idea.reminderFrequency === "daily" ? "day" : undefined,
          },
          sound: undefined,
          attachments: undefined,
          actionTypeId: "",
          extra: null,
        },
      ],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !reminderTime) {
      toast.error("Please fill in all fields");
      return;
    }

    const newIdea: Idea = {
      id: Date.now().toString(),
      category,
      title,
      reminderTime,
      reminderFrequency,
      createdAt: new Date(),
    };

    await scheduleNotification(newIdea);
    onAddIdea(newIdea);
    
    toast.success("Idea added with reminder!");
    
    // Reset form
    setTitle("");
    setReminderTime("");
    setReminderFrequency("daily");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Add New Idea
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value: "week" | "month") => setCategory(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">What do you want to be reminded of?</Label>
            <Input
              id="title"
              placeholder="Enter your idea..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminderTime">Reminder Time</Label>
            <Input
              id="reminderTime"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">How often?</Label>
            <Select
              value={reminderFrequency}
              onValueChange={(value: "daily" | "twice-daily" | "every-2-days" | "weekly") =>
                setReminderFrequency(value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="twice-daily">Twice Daily</SelectItem>
                <SelectItem value="every-2-days">Every 2 Days</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            Add Idea
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddIdeaDialog;
