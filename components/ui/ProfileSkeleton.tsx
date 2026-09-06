// components/ui/ProfileSkeleton.tsx
export function ProfileSkeleton() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none border border-border bg-surface/30 animate-pulse flex flex-col justify-end p-6 space-y-4 shadow-xl">
      <div className="space-y-2">
        <div className="h-6 bg-surface/70 w-3/4 rounded-none" />
        <div className="h-4 bg-surface/50 w-1/2 rounded-none" />
      </div>
    </div>
  );
}
