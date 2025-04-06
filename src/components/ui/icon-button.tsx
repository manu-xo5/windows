import { Icons } from "@/components/icons";

type Props = React.ComponentProps<"button"> & {
  title: string;
  iconName: keyof typeof Icons;
  iconClassName?: string;
  children?: undefined;
};

const BUTTON_SIZE = 18;

export const IconButton = ({ iconName, iconClassName, ...props }: Props) => {
  const Icon = Icons[iconName];

  return (
    <button className="hover:bg-hover p-2 rounded" {...props}>
      <Icon className={iconClassName} size={BUTTON_SIZE} />
    </button>
  );
};
