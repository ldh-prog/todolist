// src/app/error.tsx
"use client";

import { AlertCircle } from "lucide-react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-danger-soft text-danger">
        <AlertCircle className="h-6 w-6" aria-hidden="true" />
      </span>
      <h1 className="text-2xl font-semibold">화면을 불러오지 못했습니다</h1>
      <p className="text-sm text-muted">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="cursor-pointer rounded-lg bg-cta px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-cta-hover focus-visible:ring-2 focus-visible:ring-cta focus-visible:outline-none"
      >
        다시 시도
      </button>
    </main>
  );
}
