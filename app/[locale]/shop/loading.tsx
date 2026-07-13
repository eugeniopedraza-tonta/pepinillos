import { Skeleton } from "@/components/ui/skeleton";

export default function ShopLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Skeleton className="h-48 w-full rounded-[40px]" />

      <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[30px] border border-[#21402d]/10 bg-white/60 p-4"
          >
            <Skeleton className="aspect-square w-full rounded-[24px]" />
            <Skeleton className="mt-4 h-5 w-3/4" />
            <Skeleton className="mt-3 h-4 w-1/3" />
          </div>
        ))}
      </section>
    </div>
  );
}
