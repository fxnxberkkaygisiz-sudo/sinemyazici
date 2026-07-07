import {
  GraduationCap,
  Users,
  LineChart,
  Newspaper,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  BookOpen,
  BarChart3,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  "graduation-cap": GraduationCap,
  users: Users,
  "line-chart": LineChart,
  newspaper: Newspaper,
  sparkles: Sparkles,
  "trending-up": TrendingUp,
  "shield-check": ShieldCheck,
  "book-open": BookOpen,
  "bar-chart": BarChart3,
  briefcase: Briefcase,
};

export function ServiceIcon({
  name,
  className = "h-6 w-6",
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? Sparkles;
  return <Icon className={className} />;
}
