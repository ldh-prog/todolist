// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">페이지를 찾을 수 없습니다</h1>
      <p className="text-sm text-muted">주소가 바뀌었거나 삭제되었을 수 있습니다.</p>
      <Link
        href="/"
        className="cursor-pointer rounded-lg bg-cta px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-cta-hover focus-visible:ring-2 focus-visible:ring-cta focus-visible:outline-none"
      >
        할 일 목록으로
      </Link>
    </main>
  );
}
