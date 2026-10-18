type BadgeProps = { children: React.ReactNode; tone?: "green" | "yellow" | "red" | "gray" };

const tones = {
  green: "bg-green-100 text-green-800",
  yellow: "bg-amber-100 text-amber-800",
  red: "bg-red-100 text-red-800",
  gray: "bg-gray-100 text-gray-700",
};

export default function Badge({ children, tone = "gray" }: BadgeProps) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${tones[tone]}`}>{children}</span>;
}
