import { type LucideIcon, FileWarning, Loader2, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

interface StateMessageProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ 
  title = "No data found", 
  description = "There are no records to display at the moment.", 
  icon = Inbox,
  action,
  className 
}: StateMessageProps) {
  const Icon = icon;
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg bg-muted/10 h-64", className)}>
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
        <Icon className="w-6 h-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mt-2 mb-4">{description}</p>
      {action}
    </div>
  );
}

export function ErrorState({ 
  title = "Something went wrong", 
  description = "We couldn't load the data. Please try again.", 
  icon = FileWarning,
  action,
  className 
}: StateMessageProps) {
  const Icon = icon;
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-red-50 dark:bg-red-900/10 h-64", className)}>
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
        <Icon className="w-6 h-6 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-red-900 dark:text-red-200">{title}</h3>
      <p className="text-sm text-red-700 dark:text-red-300 max-w-sm mt-2 mb-4">{description}</p>
      {action}
    </div>
  );
}

export function LoadingState({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center h-64", className)}>
       <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
