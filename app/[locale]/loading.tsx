import { Skeleton } from "@/components/ui/skeleton";

export default function LocaleLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Skeleton className="h-56 w-full rounded-[40px]" />
      <div className="mt-8 space-y-4">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    </div>
  );
}
