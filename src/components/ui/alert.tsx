// src/components/ui/alert.tsx
import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";

type AlertProps = {
  tone: "error" | "success";
  children: ReactNode;
};

export function Alert({ tone, children }: AlertProps) {
  const isError = tone === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      className={cn(
        "flex items-start gap-2 rounded-lg border px-3 py-2 text-sm",
        isError
          ? "border-danger/20 bg-danger-soft text-danger"
          : "border-primary/20 bg-primary/5 text-primary-hover",
      )}
    >
      {isError ? (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      ) : (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      )}
      <p className="break-keep">{children}</p>
    </div>
  );
}
