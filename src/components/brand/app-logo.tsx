// src/components/brand/app-logo.tsx
import { ListTodo } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/cn";

type AppLogoProps = {
  className?: string;
};

export function AppLogo({ className }: AppLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
        <ListTodo className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="text-lg font-semibold tracking-tight">{APP_NAME}</span>
    </div>
  );
}
