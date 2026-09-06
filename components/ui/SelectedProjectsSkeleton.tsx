// components/ui/SelectedProjectsSkeleton.tsx
export function SelectedProjectsSkeleton() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="h-4 bg-surface/80 rounded-none w-24 mb-3 animate-pulse" />
            <div className="h-9 bg-surface/80 rounded-none w-48 animate-pulse" />
          </div>
          <div className="hidden md:block h-10 w-28 bg-surface/80 rounded-none animate-pulse" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-border rounded-none bg-surface/30 p-6 space-y-4 animate-pulse">
              <div className="h-48 bg-surface/60 rounded-none w-full" />
              <div className="h-6 bg-surface/70 rounded-none w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-surface/50 rounded-none w-full" />
                <div className="h-4 bg-surface/50 rounded-none w-5/6" />
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-16 bg-surface/60 rounded-none" />
                <div className="h-6 w-16 bg-surface/60 rounded-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
