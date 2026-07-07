import { cn } from "@/lib/cn";

export function GlassCard({
  children,
  className,
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "card p-6",
        hover && "transition-all duration-300 hover:border-ink hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
