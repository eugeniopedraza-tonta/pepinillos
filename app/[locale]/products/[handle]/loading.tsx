import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <section className="rounded-[40px] border border-[#21402d]/10 bg-[var(--surface)] p-8 sm:p-10">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-12 w-3/4" />
          <Skeleton className="mt-4 h-6 w-28" />
          <div className="mt-6 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="mt-8 h-40 w-full rounded-2xl" />
          <Skeleton className="mt-8 h-11 w-44 rounded-full" />
        </section>

        <div className="lg:sticky lg:top-24">
          <Skeleton className="aspect-square w-full rounded-[40px]" />
        </div>
      </div>
    </div>
  );
}
