import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  HomeIcon,
  LucideProps,
  RotateCwIcon,
} from "lucide-react";

export const Icons = {
  refresh: (props: LucideProps) => <RotateCwIcon size={32} {...props} />,

  back: (props: LucideProps) => <ArrowLeftIcon size={32} {...props} />,
  forward: (props: LucideProps) => <ArrowRightIcon size={32} {...props} />,
  up: (props: LucideProps) => <ArrowUpIcon size={32} {...props} />,

  home: (props: LucideProps) => <HomeIcon size={32} {...props} />,
} as const;
