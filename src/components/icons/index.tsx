import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  FileImageIcon,
  FileTextIcon,
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
  imageFile: (props: LucideProps) => <FileImageIcon size={32} {...props} />,

  textFile: (props: LucideProps) => <FileTextIcon size={32} {...props} />,
} as const;
