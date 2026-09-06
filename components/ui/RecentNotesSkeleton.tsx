// components/ui/RecentNotesSkeleton.tsx
export function RecentNotesSkeleton() {
  return (
    <section className="section-padding border-t border-border">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="h-4 bg-surface/80 rounded-none w-24 mb-3 animate-pulse" />
            <div className="h-9 bg-surface/80 rounded-none w-48 animate-pulse" />
          </div>
          <div className="hidden md:block h-10 w-28 bg-surface/80 rounded-none animate-pulse" />
        </div>

        <div className="divide-y divide-border border-t border-border">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="py-6 space-y-3 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="h-3 bg-surface/50 rounded-none w-24" />
                <div className="h-3 bg-surface/50 rounded-none w-16" />
              </div>
              <div className="h-6 bg-surface/75 rounded-none w-3/4" />
              <div className="h-4 bg-surface/50 rounded-none w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
