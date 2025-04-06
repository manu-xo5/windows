import { Icons } from "@/components/icons";

type P = {
  iconName: keyof typeof Icons;
  title: string;
} & React.ComponentProps<"button">;
export function FileButton({ iconName, title, ...props }: P) {
  const Icon = Icons[iconName];

  return (
    <button
      className="flex flex-col gap-1 items-center max-w-14"
      title={title}
      {...props}
    >
      <Icon size={28} />
      <p className="text-xs w-full h-12 truncate">{title}</p>
    </button>
  );
}
